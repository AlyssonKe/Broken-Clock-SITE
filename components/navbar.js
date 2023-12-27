import Link from 'next/link'

export default function Navbar() {
    return (
        <header className='h-fit w-full bg-secundary sticky top-0 z-50 items-center md:h-20'>
            <nav>

                {/* <div className='bg-white h-20 w-20'>
                    Ata
                </div> */}

                <Link href='/' className='absolute bg-bc-logo-name bg-center bg-contain bg-no-repeat w-24 h-16 ml-4 min-[350px]:right-0 min-[350px]:left-0 min-[350px]:mx-auto md:h-20 md:w-32 sm:ml-8 sm:right-auto sm:left-auto lg:ml-16'></Link>
                {/* <Link href='/' className='bg-menu-button right-0 bg-contain bg-no-repeat w-10 h-10 absolute mr-3 top-1/2 -translate-y-1/2 inline lg:hidden min-[200px]:mr-10'></Link> */}

                <ul className='absolute w-fit hidden items-end right-0 space-x-1 gap-6 uppercase text-white font-bold mr-8 text-lg md:text-xl lg:mr-16 sm:flex'>
                    <li className='group'>
                        <div className='h-16 w-full flex items-center md:h-20'>
                            <Link href='/' className='group-hover:text-main-blue group-hover:duration-200'>Home</Link>
                        </div>
                    </li>

                    <li className='group'>
                        <div className='h-16 w-full flex items-center md:h-20'>
                            <Link href='#games' scroll={true} className='group-hover:text-main-blue group-hover:duration-200'>Games</Link>
                        </div>
                    </li>

                    <li className='group'>
                        <div className='h-16 w-full flex items-center md:h-20'>
                            <Link href='/' className='group-hover:text-main-blue group-hover:duration-200'>Blog</Link>
                        </div>
                    </li>

                    <li className='group'>
                        <div className='h-16 w-full flex items-center md:h-20'>
                            <Link href='/' className='group-hover:text-main-blue group-hover:duration-200'>Contact</Link>
                        </div>
                    </li>
                </ul>
            </nav>
        </header>
    )
};