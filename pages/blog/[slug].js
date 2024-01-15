import fs from 'fs'
import path from 'path'
import matter from "gray-matter"
import { marked } from 'marked'
import React, { useEffect } from 'react';

export default function PostPage({
    frontmatter: {title, date, cover, description, author, category, tags},
    slug,
    content
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
            <div className='prose text-center mx-auto w-10/12 max-w-full py-16 text-secundary sm:w-10/12 sm:py-20 lg:py-24'>
                <div className='w-full secundaryColor lg:w-3/5'>
                    <div dangerouslySetInnerHTML={{__html: marked(content) }}></div>
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

    return {
        props: {
            frontmatter,
            slug,
            content,
        }
    }
}