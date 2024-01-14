// pages/api/posts.js
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export default function handler(req, res) {
    const postsDirectory = path.join(process.cwd(), 'posts');
    const fileNames = fs.readdirSync(postsDirectory);

    const allPostsData = fileNames.map(fileName => {
        const id = fileName.replace(/\.md$/, '');
        const fullPath = path.join(postsDirectory, fileName);
        const fileContents = fs.readFileSync(fullPath, 'utf8');
        const matterResult = matter(fileContents);

        return {
            id,
            ...matterResult.data
        };
    });

    const sortedPosts = allPostsData.sort((a, b) => {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
        return dateB - dateA;
    }).slice(0, 3);

    res.status(200).json(sortedPosts);
}
