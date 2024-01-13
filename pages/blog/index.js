import fs from 'fs';
import path from "path";
import Head from 'next/head';
import Link from 'next/link';
import matter from "gray-matter";

// The Blog Page Content
export default function Blog({posts}){
    return <>
        <Head>
            <title>Broken Clock Blog</title>
        </Head>

        <Link href={"/"} className='bg-main-orange w-full h-full'></Link>

        <div className="w-full h-screen -mt-20 py-20">
            <div className="bg-white w-10/12 mx-auto py-24">
                <div className="pb-10">
                    <h1 className="uppercase text-secundary font-black text-5xl pb-2">Last news</h1>
                    <h2 className="text-gray font-bold text-2xl">Find out what's going on!</h2>
                </div>

                <div className="w-full h-fit">
                    <div className="w-full h-fit flex-wrap sm:min-h-0">
                        {posts.sort((a, b) => b.frontmatter.order - a.frontmatter.order)
                            .map(post => {
                            // Extract slug and frontmatter
                            const {slug, frontmatter} = post;
                            // Extract frontmatter properties
                            const {title, author, category, date, banner, description, tags} = frontmatter;

                            // JSX for individual blog listing
                            return (
                                <article key={slug} className="w-1/3 h-80 px-3 py-3">
                                    <div className='bg-secundary-white w-full h-full rounded-xl overflow-hidden shadow-games'>
                                        <Link href={`/blog/${slug}`} className=' w-1/3 h-80 bg-main-blue'>
                                            <div className='w-full h-full'>
                                                <div className="block relative w-full h-2/3 bg-secundary-white overflow-hidden">
                                                    {/* Date */}
                                                    <div className='absolute right-0 bottom-0 duration-200 bg-gray w-fit mr-6 mb-4 rounded-full flex items-center z-10 pointer-events-none'>
                                                        <p className='uppercase mx-auto text-sm text-white text-center font-bold px-4 py-1'>{date}</p>
                                                    </div>

                                                    {/* Game cover */}
                                                    <div className='bg-cover bg-no-repeat bg-center duration-300 h-full hover:duration-300 hover:scale-110' style={{ backgroundImage: `url(${banner})` }}>
                                                        <div className='relative bg-game-shadow h-full w-full items-end sm:h-full'></div>
                                                    </div>
                                                </div>

                                                <div className="w-full h-1/3">
                                                    <p className="text-secundary text-center text-2xl font-bold py-2 w-full px-2 overflow-hidden whitespace-nowrap text-ellipsis">{title}</p>
                                                    <p className="h-full w-11/12 mx-auto text-secundary text-center text-sm px-2">{description}</p>
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
export async function getStaticProps(){
   // Caminho para a pasta 'pages/blog'
   const postsDirectory = path.join(process.cwd(), 'pages', 'blog');

   // Lendo os nomes dos arquivos na pasta 'pages/blog'
   const allFiles = fs.readdirSync(postsDirectory);

   // Filtrar para incluir apenas arquivos '.mdx' que não sejam '[slug].js'
   const mdxFiles = allFiles.filter(fileName => 
       fileName.endsWith('.mdx') && fileName !== '[slug].js'
   );

   // Obtendo o frontmatter e slug de cada post
   const posts = mdxFiles.map((fileName) => {
       const slug = fileName.replace('.mdx', '');
       const fullPath = path.join(postsDirectory, fileName);
       const fileContents = fs.readFileSync(fullPath, 'utf-8');
       const { data: frontmatter } = matter(fileContents);

       return {
           slug,
           frontmatter,
       };
   });

   return {
       props: {
           posts,
       },
   };
}