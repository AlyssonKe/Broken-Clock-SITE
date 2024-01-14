import ScrollButton from '../components/ScrollButton';
import Link from 'next/link'
import React from 'react';

import { useState } from "react";

export default function Navbar() {
    const [menuVisible, setMenuVisible] = useState(false);

    const toggleMenu = () => {
        setMenuVisible(!menuVisible);
        console.log(menuVisible)
    };

    return (
        <header id="header" className='h-20 w-full bg-primary border-b-[1px] border-gray sticky top-0 z-50 items-center duration-200'>
            <nav>

                {/* <div className='bg-white h-20 w-20'>
                    Ata
                </div> */}

                <div className={`h-20 w-full float-left bg-primary absolute z-50 items-center sm:hidden ${menuVisible ? 'block' : 'hidden'} transition-all duration-300`}></div>

                {/* Logo */}
                <Link href='/' className='absolute bg-bc-logo-name bg-center bg-contain bg-no-repeat w-24 h-12 ml-4 mt-4 z-50 min-[350px]:right-0 min-[350px]:left-0 min-[350px]:mx-auto md:w-32 sm:ml-8 sm:right-auto sm:left-auto lg:ml-16'></Link>
                
                {/* Open menu button */}
                <button onClick={toggleMenu} href='/' className='absolute bg-menu-button right-0 bg-contain bg-no-repeat w-10 h-10 mr-3 top-1/2 -translate-y-1/2 inline z-50 min-[200px]:mr-10 sm:hidden'></button>
                
                <div className='clear-both'></div>

                <div className={`h-screen w-full backdrop-blur-2xl absolute top-0 before:absolute before:h-full before:w-full before:bg-secundary before:opacity-80 sm:absolute sm:h-full sm:before:opacity-0 sm:backdrop-blur-none ${menuVisible ? 'block' : 'hidden'} duration-300 transition-all sm:block sm:right-0 sm:duration-0`}>
                    <ul className='absolute top-1/2 -translate-y-1/2 w-fit mx-auto right-0 left-0 space-x-0 space-y-4 gap-6 uppercase text-lg text-white font-semibold sm:mr-8 md:text-base lg:mr-16 sm:flex sm:space-x-1 sm:space-y-0'>
                        <li className='group'>
                            <div className='h-16 w-full flex items-center md:h-20'>
                                <Link href='/' className='mx-auto group-hover:text-main-blue group-hover:duration-200'>Home</Link>
                            </div>
                        </li>

                        <li className='group'>
                            <div className='h-16 w-full flex items-center md:h-20 hover:text-main-blue hover:duration-200'>
                                <ScrollButton targetId="games" title="GAMES" />
                            </div>
                        </li>

                        <li className='group'>
                            <div className='h-16 w-full flex items-center md:h-20'>
                                <Link href='/blog' className='mx-auto group-hover:text-main-blue group-hover:duration-200'>Blog</Link>
                            </div>
                        </li>

                        <li className='group'>
                            <div className='h-16 w-full flex items-center md:h-20'>
                                <Link href='/contact' className='mx-auto group-hover:text-main-blue group-hover:duration-200'>Contact</Link>
                            </div>
                        </li>
                    </ul>

                    <ul className='absolute w-fit mx-auto left-0 right-0 flex items-center space-x-6 bottom-0 mb-12 sm:hidden'>
                        <li className='h-8 w-8'>
                            <a href='https://twitter.com/BrokenClockRBX' target="_blank" className='h-full w-full'>
                                <svg className='fill-white duration-200 hover:fill-main-blue hover:duration-200' viewBox="0 0 512 512">
                                    <path d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z"/>
                                </svg>
                            </a>
                        </li>

                        <li className='h-8 w-8'>
                            <a href='https://www.youtube.com/@BrokenClockRBX' target="_blank" className='h-full w-full'>
                                <svg className='fill-white duration-200 hover:fill-main-blue hover:duration-200' viewBox="2 2 45 45">
                                    <path d="M 44.898438 14.5 C 44.5 12.300781 42.601563 10.699219 40.398438 10.199219 C 37.101563 9.5 31 9 24.398438 9 C 17.800781 9 11.601563 9.5 8.300781 10.199219 C 6.101563 10.699219 4.199219 12.199219 3.800781 14.5 C 3.398438 17 3 20.5 3 25 C 3 29.5 3.398438 33 3.898438 35.5 C 4.300781 37.699219 6.199219 39.300781 8.398438 39.800781 C 11.898438 40.5 17.898438 41 24.5 41 C 31.101563 41 37.101563 40.5 40.601563 39.800781 C 42.800781 39.300781 44.699219 37.800781 45.101563 35.5 C 45.5 33 46 29.398438 46.101563 25 C 45.898438 20.5 45.398438 17 44.898438 14.5 Z M 19 32 L 19 18 L 31.199219 25 Z"/>
                                </svg>
                            </a>
                        </li>

                        <li className='h-8 w-8'>
                            <a href='https://discord.com/invite/qsaSA45KUX' target="_blank" className='h-full w-full'>
                                <svg className='fill-white duration-200 hover:fill-main-blue hover:duration-200' viewBox="-0 -30 265 270">
                                    <path d="M216.856339,16.5966031 C200.285002,8.84328665 182.566144,3.2084988 164.041564,0 C161.766523,4.11318106 159.108624,9.64549908 157.276099,14.0464379 C137.583995,11.0849896 118.072967,11.0849896 98.7430163,14.0464379 C96.9108417,9.64549908 94.1925838,4.11318106 91.8971895,0 C73.3526068,3.2084988 55.6133949,8.86399117 39.0420583,16.6376612 C5.61752293,67.146514 -3.4433191,116.400813 1.08711069,164.955721 C23.2560196,181.510915 44.7403634,191.567697 65.8621325,198.148576 C71.0772151,190.971126 75.7283628,183.341335 79.7352139,175.300261 C72.104019,172.400575 64.7949724,168.822202 57.8887866,164.667963 C59.7209612,163.310589 61.5131304,161.891452 63.2445898,160.431257 C105.36741,180.133187 151.134928,180.133187 192.754523,160.431257 C194.506336,161.891452 196.298154,163.310589 198.110326,164.667963 C191.183787,168.842556 183.854737,172.420929 176.223542,175.320965 C180.230393,183.341335 184.861538,190.991831 190.096624,198.16893 C211.238746,191.588051 232.743023,181.531619 254.911949,164.955721 C260.227747,108.668201 245.831087,59.8662432 216.856339,16.5966031 Z M85.4738752,135.09489 C72.8290281,135.09489 62.4592217,123.290155 62.4592217,108.914901 C62.4592217,94.5396472 72.607595,82.7145587 85.4738752,82.7145587 C98.3405064,82.7145587 108.709962,94.5189427 108.488529,108.914901 C108.508531,123.290155 98.3405064,135.09489 85.4738752,135.09489 Z M170.525237,135.09489 C157.88039,135.09489 147.510584,123.290155 147.510584,108.914901 C147.510584,94.5396472 157.658606,82.7145587 170.525237,82.7145587 C183.391518,82.7145587 193.761324,94.5189427 193.539891,108.914901 C193.539891,123.290155 183.391518,135.09489 170.525237,135.09489 Z"/>
                                </svg>
                            </a>
                        </li>
                        
                        <li className='h-8 w-8'>
                            <a href='https://www.tiktok.com/@brokenclockrbx' target="_blank" className='h-full w-full'>
                                <svg className='fill-white duration-200 hover:fill-main-blue hover:duration-200' viewBox="0 0 32 32">
                                    <path d="M16.656 1.029c1.637-0.025 3.262-0.012 4.886-0.025 0.054 2.031 0.878 3.859 2.189 5.213l-0.002-0.002c1.411 1.271 3.247 2.095 5.271 2.235l0.028 0.002v5.036c-1.912-0.048-3.71-0.489-5.331-1.247l0.082 0.034c-0.784-0.377-1.447-0.764-2.077-1.196l0.052 0.034c-0.012 3.649 0.012 7.298-0.025 10.934-0.103 1.853-0.719 3.543-1.707 4.954l0.020-0.031c-1.652 2.366-4.328 3.919-7.371 4.011l-0.014 0c-0.123 0.006-0.268 0.009-0.414 0.009-1.73 0-3.347-0.482-4.725-1.319l0.040 0.023c-2.508-1.509-4.238-4.091-4.558-7.094l-0.004-0.041c-0.025-0.625-0.037-1.25-0.012-1.862 0.49-4.779 4.494-8.476 9.361-8.476 0.547 0 1.083 0.047 1.604 0.136l-0.056-0.008c0.025 1.849-0.050 3.699-0.050 5.548-0.423-0.153-0.911-0.242-1.42-0.242-1.868 0-3.457 1.194-4.045 2.861l-0.009 0.030c-0.133 0.427-0.21 0.918-0.21 1.426 0 0.206 0.013 0.41 0.037 0.61l-0.002-0.024c0.332 2.046 2.086 3.59 4.201 3.59 0.061 0 0.121-0.001 0.181-0.004l-0.009 0c1.463-0.044 2.733-0.831 3.451-1.994l0.010-0.018c0.267-0.372 0.45-0.822 0.511-1.311l0.001-0.014c0.125-2.237 0.075-4.461 0.087-6.698 0.012-5.036-0.012-10.060 0.025-15.083z"/>
                                </svg>
                            </a>
                        </li>
                        <li className='h-8 w-8'>
                            <a href='https://www.roblox.com/groups/4756258/Broken-Clock' target="_blank" className='h-full w-full'>
                                <svg className='fill-white duration-200 hover:fill-main-blue hover:duration-200' viewBox="0 0 310 310">
                                    <path d="M120.5,271.7c-110.9-28.6-120-31-119.9-31.5C0.7,239.6,62.1,0.5,62.2,0.4c0,0,54,13.8,119.9,30.8S302.1,62,302.2,62c0.2,0,0.2,0.4,0.1,0.9c-0.2,1.5-61.5,239.3-61.7,239.5C240.6,302.5,186.5,288.7,120.5,271.7z M174.9,158c3.2-12.6,5.9-23.1,6-23.4c0.1-0.5-2.3-1.2-23.2-6.6c-12.8-3.3-23.5-5.9-23.6-5.8c-0.3,0.3-12.1,46.6-12,46.7c0.2,0.2,46.7,12.2,46.8,12.1C168.9,180.9,171.6,170.6,174.9,158L174.9,158z"/>
                                </svg>
                            </a>
                        </li>
                    </ul>
                </div>
            </nav>
        </header>
    )
};