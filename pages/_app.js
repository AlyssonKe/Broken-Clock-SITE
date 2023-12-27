import Head from "next/head"
import Layout from '../components/layout'
import '../styles/global.css'

export default function MyApp({ Component, pageProps}) {
    return (
        <div className="w-full">
            <Head>
                <meta charSet="utf-8" />
                <meta name="robots" content="index, follow" />
                <meta name="description" content="Broken Clock official website" />
                <meta name="author" content="Duelan_BR" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />

                <title>Broken Clock</title>

            </Head>

            <Layout>
                <Component {...pageProps} />
            </Layout>
        </div>
      );
}