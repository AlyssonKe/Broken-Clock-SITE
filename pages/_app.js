import Head from "next/head"
import Layout from '../components/layout'
import '../styles/global.css'

export default function MyApp({ Component, pageProps}) {
    return (
        <div className="w-full">
            <Head>
                <title>Broken Clock</title>

                <meta charSet="utf-8" />
                <meta name="robots" content="index, follow" />
                <meta name="description" content="Official website of Broken Clock, an indie game development studio on the Roblox platform." />
                <meta name="author" content="Duelan_BR" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <meta name="keywords" content="roblox, video game, broken clock, john and mark, the adventures of john and mark, treacherous tower, games" />


                <meta property="og:type" content="website" />
                <meta property="og:url" content="https://brokenclock.fun" />
                <meta property="og:title" content="Broken Clock" />
                <meta property="og:description" content="Official website of Broken Clock, an indie game development studio on the Roblox platform." />
                <meta property="og:image" content="public/images/broken-clock-logo-name.png" />
                <meta property="og:site_name" content="Broken Clock" />
                
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="Broken Clock" />
                <meta name="twitter:description" content="Official website of Broken Clock, an indie game development studio on the Roblox platform." />
                <meta name="twitter:image" content="public/images/broken-clock-logo-name.png" />
            </Head>

            <Layout>
                <Component {...pageProps} />
            </Layout>
        </div>
      );
}