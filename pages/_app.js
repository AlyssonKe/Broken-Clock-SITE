import Head from "next/head"
import Layout from '/components/layout'
import '/styles/global.css'

export default function MyApp({ Component, pageProps}) {
    return (
        <div className="w-full">
            <Head>
                <title>Broken Clock</title>

                <meta charSet="utf-8" />
                <meta name="robots" content="index, follow" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <meta name="keywords" content="roblox, video game, broken clock, john and mark, the adventures of john and mark, treacherous tower, games" />
            
                <meta property="og:site_name" content="Broken Clock" />

                <meta name="twitter:site_name" content="Broken Clock" />
            </Head>

            <Layout>
                <Component {...pageProps} />
            </Layout>
        </div>
      );
}