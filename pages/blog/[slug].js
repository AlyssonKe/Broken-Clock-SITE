import fs from 'fs'
import path from 'path'
import matter from "gray-matter"
import { marked } from 'marked'
import Link from 'next/link'

export default function PostPage({
    frontmatter: {title, date, cover, description, author, category, tags},
    slug,
    content
}) {
    return (
        <>
            <div className='prose text-center mx-auto w-10/12 max-w-full'>
                <div dangerouslySetInnerHTML={{__html: marked(content) }}></div>
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