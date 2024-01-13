import fs from "fs";
import path from 'path';
import matter from "gray-matter";
import MarkdownIt from 'markdown-it';

// The page for each post
export default function Post({frontmatter, content}) {

    const {title, author, category, date, bannerImage, tags} = frontmatter

    const md = new MarkdownIt();
    const htmlContent = md.render(content);

    return <main>
        <img src={bannerImage}/>
        <h1>{title}</h1>
        <h2>{author} || {date}</h2>
        {/* <h3>{category} || {tags.join()}</h3> */}
        <div className="markdown" dangerouslySetInnerHTML={{ __html: htmlContent }} />
    </main>
}

// Generating the paths for each post
export async function getStaticPaths() {
  // Get list of all files from our posts directory
  const files = fs.readdirSync("pages/blog");
  // Generate a path for each one
  const paths = files.map((fileName) => ({
    params: {
      slug: fileName.replace(".mdx", ""),
    },
  }));
  // return list of paths
  return {
    paths,
    fallback: false,
  };
}


// Generate the static props for the page
export async function getStaticProps({ params: { slug } }) {
    const filePath = path.join(process.cwd(), 'pages/blog', `${slug}.mdx`);
    const fileName = fs.readFileSync(filePath, 'utf-8');
    const { data: frontmatter, content } = matter(fileName);
    return {
      props: {
        frontmatter,
        content,
      },
    };
  }