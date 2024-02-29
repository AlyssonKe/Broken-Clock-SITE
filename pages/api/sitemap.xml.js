import fs from 'fs';
import path from 'path';
import { SitemapStream, streamToPromise } from 'sitemap';
import { Readable } from 'stream';

const postsDirectory = path.join(process.cwd(), 'posts');

function extractDateFromFile(content) {
    const dateLine = content.split('\n').find(line => line.startsWith('date:'));
    if (!dateLine) return null;
    const dateMatch = dateLine.match(/date:\s*(.*)/);
    return dateMatch ? new Date(dateMatch[1]) : null;
  }

async function getBlogPostsSlugs() {
    const filenames = fs.readdirSync(postsDirectory);
    return filenames.map(file => {
        const filePath = path.join(postsDirectory, file);
        const content = fs.readFileSync(filePath, 'utf8');
        const date = extractDateFromFile(content);

        const slug = file.replace(/\.md$/, '');
        return { url: `/blog/${slug}`, changefreq: 'weekly', priority: 0.7, lastmod: date ? date.toISOString() : null };
    });
}

export default async (req, res) => {
  const links = [
    { url: '/', changefreq: 'weekly', priority: 1.0, lastmod: '2024-01-20' },
    { url: '/sobre', changefreq: 'monthly', priority: 0.8, lastmod: '2024-01-20' },
    { url: '/contato', changefreq: 'monthly', priority: 0.8, lastmod: '2024-01-20' },
    { url: '/blog', changefreq: 'weekly', priority: 0.8, lastmod: '2024-01-20' },
  ];

  // Adiciona URLs das postagens do blog
  const blogUrls = await getBlogPostsSlugs();
  links.push(...blogUrls);

  const stream = new SitemapStream({ hostname: 'https://www.brokenclock.fun/' });

  res.writeHead(200, {
    'Content-Type': 'application/xml',
    'Cache-Control': 'no-cache',
  });

  const xmlString = await streamToPromise(
    Readable.from(links).pipe(stream)
  ).then((data) => data.toString());

  res.end(xmlString);
};
