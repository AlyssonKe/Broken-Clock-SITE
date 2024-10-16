import CustomHead from '/components/CustomHead';

import fs from 'fs';
import path from "path";
import Link from 'next/link';
import matter from "gray-matter";

// The Blog Page Content
export default function Blog({posts}){
    return <>
        <CustomHead 
            title="Blogs"
            description="Check out the blogs posted by the developers and find out what's going on inside Broken Clock."
            author="Duelan"
            cover="/images/broken-clock-logo-name.png"
        />

        <Link href={"/"} className='bg-main-orange w-full h-full'></Link>

        <div className="w-full h-fit -mt-20">
            <div className="w-10/12 mx-auto pt-36 pb-8 md:py-48">
                <div className="pb-10">
                    <h1 className="uppercase text-secundary font-black text-5xl pb-2">Last news</h1>
                    <h2 className="text-gray font-bold text-2xl">Find out what's going on!</h2>
                </div>

                <div className="w-full h-fit sm:w-10/12 sm:mx-auto md:w-full">
                    <div className="w-full h-fit flex flex-wrap">
                        {posts.sort((a, b) => b.frontmatter.order - a.frontmatter.order)
                            .map(post => {
                            // Extract slug and frontmatter
                            const {slug, frontmatter} = post;
                            // Extract frontmatter properties
                            const {title, date, cover, description, author, category, tags} = frontmatter;

                            // JSX for individual blog listing
                            return (
                                <article key={slug} className="w-full h-fit px-3 py-3 md:w-1/2 lg:w-1/3 md:h-96">
                                    <div className='bg-primary-white w-full h-full rounded-xl overflow-hidden shadow-games'>
                                        <Link href={`/blog/${slug}`} className=' w-1/3 h-80 bg-main-blue'>
                                            <div className='w-full h-full'>
                                                <div className="block relative w-full h-56 bg-secundary-white overflow-hidden md:h-2/3">
                                                    {/* Date */}
                                                    <div className='absolute right-0 bottom-0 duration-200 bg-gray w-fit mr-6 mb-4 rounded-full flex items-center z-10 pointer-events-none'>
                                                        <p className='uppercase mx-auto text-sm text-white text-center font-bold px-4 py-1'>{date}</p>
                                                    </div>

                                                    {/* Game cover */}
                                                    <div className='bg-cover bg-no-repeat bg-center duration-300 h-full hover:duration-300 hover:scale-110' style={{ backgroundImage: `url(${cover})` }}>
                                                        <div className='relative bg-game-shadow h-full w-full items-end sm:h-full'></div>
                                                    </div>
                                                </div>

                                                <div className="w-full h-1/3">
                                                    <p className="w-11/12 text-2xl font-bold mx-auto text-secundary text-center px-2 my-1">
                                                        {title}
                                                    </p>
                                                    <p className="multi-line-ellipsis w-11/12 mx-auto text-secundary text-center text-sm px-2 mb-2">
                                                        {description}
                                                    </p>
                                                </div>
                                            </div>
                                        </Link>
                                    </div>
                                </article>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    </>
}


//Generating the Static Props for the Blog Page
export async function getStaticProps() {
    const files = fs.readdirSync(path.join('posts'))
   
    const posts = files.map(fileName => {
        const slug = fileName.replace('.md', '')

        const markdownWithMeta = fs.readFileSync(path.join('posts', fileName), 'utf-8')

        const {data: frontmatter} = matter(markdownWithMeta)

        return {
            slug,
            frontmatter
        }
    })

    posts.sort((a, b) => {
        return new Date(b.frontmatter.date) - new Date(a.frontmatter.date);
    });

    return {
        props: {
            posts: posts,
        },
    };
}