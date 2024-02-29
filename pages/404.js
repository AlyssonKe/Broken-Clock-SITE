import Link from 'next/link'
import Head from "next/head"

export default function Custom404 () {
    return (
    <>
        <Head>
           <title>404: This page could not be found</title>
        </Head>

        <div className="w-full h-screen -mt-20">
            <div className="absolute right-0 left-0 mx-auto top-1/2 -translate-y-1/2">
                <img src="/images/404-bg.png" className="mx-auto h-64 mb-8"></img>
                <h1 className="uppercase text-secundary font-black text-5xl pb-2 text-center">404</h1>
                <h2 className="text-gray font-bold text-2xl text-center">OOPS! Page Not Found!</h2>

                <div className='w-5/6 mx-auto max-h-84 mt-12 sm:mt-14'>			
                    <Link href='/' className='group duration-200 bg-main-blue h-16 w-fit min-w-[180px] mx-auto rounded-full flex items-center hover:duration-200 hover:transition-all'>
                        <p className='uppercase text-xl text-white text-center font-black mx-auto px-10 min-[400px]:text-2xl'>Return Home</p>
                    </Link>
                </div>
            </div>
        </div>
    </>
    );
}