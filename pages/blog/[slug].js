import CustomHead from '/components/CustomHead';

import fs from 'fs'
import path from 'path'
import Link from 'next/link';
import matter from "gray-matter"
import { marked } from 'marked'
import React, { useEffect } from 'react';


export default function PostPage({
    frontmatter: {title, headerTitle, date, cover, description, author, category, tags},
    slug,
    content,
    posts
}) {
    useEffect(() => {
        // Seleciona todos os links dentro do conteúdo do blog e adiciona target="_blank" e rel="noopener noreferrer"
        const links = document.querySelectorAll('.prose a');
        links.forEach(link => {
          link.setAttribute('target', '_blank');
          link.setAttribute('rel', 'noopener noreferrer');
          link.style.color = '#0085FF';
        });
      }, []);
      
    return (
        <>
            <CustomHead 
                title={headerTitle} 
                description={description} 
                author={author} 
                cover={cover}
            />

            <div className='text-center mx-auto w-10/12 py-16 text-secundary flex sm:w-4/5 sm:py-20 lg:py-24'>
                <div className='prose w-full max-w-full secundaryColor lg:w-3/5'>
                    <h4 className='text-right text-gray'>{date}</h4>
                    <div className='flex flex-col items-center' dangerouslySetInnerHTML={{__html: marked(content) }}></div>
                </div>

                <div className='hidden relative w-2/5 h-96 lg:block'>
                    <div className="absolute w-3/4 right-0 pb-8">
                        <div className="pb-10">
                            <h1 className="uppercase text-secundary font-black text-3xl pb-2 text-left">Recent Posts</h1>

                            <div className="w-full h-fit sm:w-10/12 sm:mx-auto md:w-full">
                                <div className="w-full h-fit flex flex-wrap">
                                {
                                    posts
                                        .filter(post => post.slug !== slug) // Filtrar o post atual
                                        .sort((a, b) => b.frontmatter.order - a.frontmatter.order)
                                        .slice(0, 4)
                                        .map(post => {

                                        // Extract slug and frontmatter
                                        const {slug, frontmatter} = post;
                                        // Extract frontmatter properties
                                        const {title, date, cover, description, author, category, tags} = frontmatter;

                                        // JSX for individual blog listing
                                        return (
                                            <article key={slug} className="w-full h-fit px-3 py-3">
                                                <div className='bg-primary-white w-full h-full rounded-xl overflow-hidden shadow-games'>
                                                    <Link href={`/blog/${slug}`} className=' w-1/3 h-80 bg-main-blue'>
                                                        <div className='w-full h-full'>
                                                            <div className="block relative w-full h-44 bg-white overflow-hidden 2lg:h-56">
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
                </div>
            </div>
        </>
    )
}

export async function getStaticPaths() {
    const files = fs.readdirSync(path.join('posts'))

    const paths = files.map(fileName => ({
        params: {
            slug: fileName.replace('.md', '')
        }
    }))

    return {
        paths,
        fallback: false
    }
}

export async function getStaticProps({params: {slug}}) {
    const markdownWithMeta = fs.readFileSync(path.join('posts', slug + '.md'), 'utf-8')

    const {data:frontmatter, content} = matter(markdownWithMeta)

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
            frontmatter,
            slug,
            content,
            posts: posts,
        }
    }
}