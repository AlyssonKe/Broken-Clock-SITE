import Head from 'next/head';

const CustomHead = ({ title, description, author, cover, keywords }) => (
  <Head>
    <title>{title ? `Broken Clock ${title}` : 'Broken Clock'}</title>

    <meta name="description" content={description} />
    <meta name="author" content={author} />

    {/* Open Graph tags */}
    <meta property="og:title" content={title ? `Broken Clock | ${title}` : 'Broken Clock'} />
    <meta property="og:description" content={description} />
    <meta property="og:image" content={cover} />
    
    {/* Twitter Card tags */}
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content={title ? `Broken Clock | ${title}` : 'Broken Clock'} />
    <meta name="twitter:description" content={description} />
    <meta name="twitter:image" content={cover} />
  </Head>
);

export default CustomHead;