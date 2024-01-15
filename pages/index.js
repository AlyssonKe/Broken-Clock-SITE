import SocialMedia from "/components/social-media";
import PlayersOnline from "/components/players-online"
import CustomHead from '/components/CustomHead';

import { getSortedPosts } from '../lib/getSortedPosts';

import fs from 'fs';
import path from "path";
import matter from "gray-matter";
import { useState, useEffect, useRef  } from "react";
import React from 'react';
import Link from 'next/link'

export async function getStaticProps() {
	// Read the pages/posts dir
	let files = fs.readdirSync(path.join("pages/team"));
  
	// Get only the mdx files
	files = files.filter((file) => file.split(".")[1] === "mdx");
  
	// Read each file and extract front matter
	const posts = await Promise.all(
	  files.map((file) => {
		const mdWithData = fs.readFileSync(
		  path.join("pages/team", file),
		  "utf-8"
		);
  
		const { data: frontMatter } = matter(mdWithData);
  
		return {
		  frontMatter,
		  slug: file.split(".")[0],
		};
	  })
	);

	const allPosts = getSortedPosts();
	const featuredPost = allPosts[0];
    // const otherPosts = allPosts.slice(1, 3);

	// const allPosts = getSortedPosts();
    // const recentPosts = allPosts.slice(0, 3); // Pegar os últimos 3 posts
  
	// Return all the posts frontMatter and slug as props
	return {
		props: {
			posts,
			featuredPost
			// recentPosts
		},
	};
}

export default function Home ({ posts, featuredPost }) {
	const [workerName, setWorkerName] = useState(null)
	const [workerRole, setWorkerRole] = useState(null)
	const [workerDescription, setWorkerDescription] = useState(null)
	const [workerRobloxCharacter, setWorkerRobloxCharacter] = useState()
	const [workerSocialMedia, setWorkerSocialMedia] = useState(null);

	const [currentIndex, setCurrentIndex] = useState(0);
	const scrollInterval = useRef(null);

	const [selectedPost, setSelectedPost] = useState(null);

    const [workerInformationVisible, setWorkerInformationVisible] = useState(false);

	function changeWorker(worker) {
		console.log(worker)

		if (worker.title) {
			setWorkerName(worker.title);
			setSelectedPost(worker.title);
		} else {
			console.log(`Title não encontrado no item`);
		}

		if (worker.roles) {
			setWorkerRole(worker.roles);
		} else {
			console.log(`Roles não encontrado no item`);
		}

		if (worker.description) {
			setWorkerDescription(worker.description);
		} else {
			console.log(`Description não encontrado no item`);
		}

		if (worker["roblox-character"]) {
			setWorkerRobloxCharacter(worker["roblox-character"]);
		} else {
			console.log(`Roblox Id não encontrado no item`);
		}

		if (worker) {
			setWorkerSocialMedia(worker);
		} else {
			console.log(`Social media não encontrado no item`);
		}

        toggleWorkerInformation()
	}

	const renderSocialIcon = (platform, url) => {
		const updatedUrl = workerSocialMedia[platform] || url;

		return (
			<a href={updatedUrl} target="_blank" className='h-full w-full'>
				<svg className={`fill-secundary duration-200 hover:fill-main-blue hover:duration-200`} viewBox={getSocialIconViewBox(platform)}>
				<path d={getSocialIconPath(platform)}/>
			</svg>
			</a>
		);
	};

	const validPlatforms = ["twitter", "instagram", "roblox", "youtube", "tiktok"];
	 
	const getSocialIconViewBox = (platform) => {
		const viewBox = {
		twitter: '0 0 512 512',
		instagram: '2 2 20 20',
		tiktok: '0 0 32 32',
		youtube: '2 2 45 45',
		roblox: '0 0 310 310',
		};
		return viewBox[platform];
	};

	const getSocialIconPath = (platform) => {
		const iconPaths = {
		twitter: 'M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z',
		instagram: 'M 8 3 C 5.243 3 3 5.243 3 8 L 3 16 C 3 18.757 5.243 21 8 21 L 16 21 C 18.757 21 21 18.757 21 16 L 21 8 C 21 5.243 18.757 3 16 3 L 8 3 z M 8 5 L 16 5 C 17.654 5 19 6.346 19 8 L 19 16 C 19 17.654 17.654 19 16 19 L 8 19 C 6.346 19 5 17.654 5 16 L 5 8 C 5 6.346 6.346 5 8 5 z M 17 6 A 1 1 0 0 0 16 7 A 1 1 0 0 0 17 8 A 1 1 0 0 0 18 7 A 1 1 0 0 0 17 6 z M 12 7 C 9.243 7 7 9.243 7 12 C 7 14.757 9.243 17 12 17 C 14.757 17 17 14.757 17 12 C 17 9.243 14.757 7 12 7 z M 12 9 C 13.654 9 15 10.346 15 12 C 15 13.654 13.654 15 12 15 C 10.346 15 9 13.654 9 12 C 9 10.346 10.346 9 12 9 z',
		tiktok: 'M16.656 1.029c1.637-0.025 3.262-0.012 4.886-0.025 0.054 2.031 0.878 3.859 2.189 5.213l-0.002-0.002c1.411 1.271 3.247 2.095 5.271 2.235l0.028 0.002v5.036c-1.912-0.048-3.71-0.489-5.331-1.247l0.082 0.034c-0.784-0.377-1.447-0.764-2.077-1.196l0.052 0.034c-0.012 3.649 0.012 7.298-0.025 10.934-0.103 1.853-0.719 3.543-1.707 4.954l0.020-0.031c-1.652 2.366-4.328 3.919-7.371 4.011l-0.014 0c-0.123 0.006-0.268 0.009-0.414 0.009-1.73 0-3.347-0.482-4.725-1.319l0.040 0.023c-2.508-1.509-4.238-4.091-4.558-7.094l-0.004-0.041c-0.025-0.625-0.037-1.25-0.012-1.862 0.49-4.779 4.494-8.476 9.361-8.476 0.547 0 1.083 0.047 1.604 0.136l-0.056-0.008c0.025 1.849-0.050 3.699-0.050 5.548-0.423-0.153-0.911-0.242-1.42-0.242-1.868 0-3.457 1.194-4.045 2.861l-0.009 0.030c-0.133 0.427-0.21 0.918-0.21 1.426 0 0.206 0.013 0.41 0.037 0.61l-0.002-0.024c0.332 2.046 2.086 3.59 4.201 3.59 0.061 0 0.121-0.001 0.181-0.004l-0.009 0c1.463-0.044 2.733-0.831 3.451-1.994l0.010-0.018c0.267-0.372 0.45-0.822 0.511-1.311l0.001-0.014c0.125-2.237 0.075-4.461 0.087-6.698 0.012-5.036-0.012-10.060 0.025-15.083z',
		youtube: 'M 44.898438 14.5 C 44.5 12.300781 42.601563 10.699219 40.398438 10.199219 C 37.101563 9.5 31 9 24.398438 9 C 17.800781 9 11.601563 9.5 8.300781 10.199219 C 6.101563 10.699219 4.199219 12.199219 3.800781 14.5 C 3.398438 17 3 20.5 3 25 C 3 29.5 3.398438 33 3.898438 35.5 C 4.300781 37.699219 6.199219 39.300781 8.398438 39.800781 C 11.898438 40.5 17.898438 41 24.5 41 C 31.101563 41 37.101563 40.5 40.601563 39.800781 C 42.800781 39.300781 44.699219 37.800781 45.101563 35.5 C 45.5 33 46 29.398438 46.101563 25 C 45.898438 20.5 45.398438 17 44.898438 14.5 Z M 19 32 L 19 18 L 31.199219 25 Z',
		roblox: 'M120.5,271.7c-110.9-28.6-120-31-119.9-31.5C0.7,239.6,62.1,0.5,62.2,0.4c0,0,54,13.8,119.9,30.8S302.1,62,302.2,62c0.2,0,0.2,0.4,0.1,0.9c-0.2,1.5-61.5,239.3-61.7,239.5C240.6,302.5,186.5,288.7,120.5,271.7z M174.9,158c3.2-12.6,5.9-23.1,6-23.4c0.1-0.5-2.3-1.2-23.2-6.6c-12.8-3.3-23.5-5.9-23.6-5.8c-0.3,0.3-12.1,46.6-12,46.7c0.2,0.2,46.7,12.2,46.8,12.1C168.9,180.9,171.6,170.6,174.9,158L174.9,158z',
		};
		return iconPaths[platform];
	};

	const toggleWorkerInformation = () => {
		setWorkerInformationVisible(!workerInformationVisible);
	};

	function smoothScroll(element, target, duration) {
		let start = element.scrollLeft,
			change = target - start,
			startTime = performance.now(),
			animate = time => {
			let elapsed = time - startTime,
				fraction = elapsed / duration;
	
			element.scrollLeft = start + change * Math.min(fraction, 1);
	
			if (fraction < 1) {
				requestAnimationFrame(animate);
			}
			};
	
		requestAnimationFrame(animate);
	}

	const startAutoScroll = () => {
		clearInterval(scrollInterval.current);
		scrollInterval.current = setInterval(() => {
		setCurrentIndex(prevIndex => (prevIndex + 1) % 2); // Assumindo 2 elementos
		}, 5000); // Muda o item a cada 5 segundos
	};
	
	useEffect(() => {
		startAutoScroll();
		return () => clearInterval(scrollInterval.current);
	}, []);

	useEffect(() => {
		const container = document.getElementById("scrolling-container");
		const itemWidth = container.clientWidth;
		smoothScroll(container, itemWidth * currentIndex, 500); // 500ms para a transição
	}, [currentIndex]);

	const handleButtonClick = (index) => {
		setCurrentIndex(index);
		startAutoScroll(); // Reinicia o intervalo de rolagem automática
	};

	 
    return (
		<>
			<CustomHead
                description="Official website of Broken Clock, an indie game development studio on the Roblox platform." 
                author="Duelan"
                cover="/images/broken-clock-logo-name.png"
            />

			<div className="bg-secundary bg-opacity-40">
				{/* Home */}
				<div className='relative -mt-20 h-[calc(100vh)] max-h-[1024px] min-h-[600px]'>
					<div id="scrolling-container" className="w-full h-full overflow-hidden">
						<div id="scrolling-content" className="w-full h-full flex flex-row after:bg-home-shadow after:absolute after:w-full after:h-full after:top-0">
							<div className="w-full h-full shrink-0 overflow-hidden ">
								<div className="w-full h-full bg-home-page1 bg-cover bg-center blur-sm"></div>

								<div className='relative w-full h-full -top-full z-20'>
									<div className='relative w-11/12 top-1/2 -translate-y-1/2 duration-200 h-72 mx-auto mt-15 md:w-144 md:mt-0 sm:h-96 xl:h-[520px]'>
										<div className='h-full w-full relative block bg-john-and-mark-logo-name bg-contain bg-center bg-no-repeat min-[320px]:h-64 sm:h-[300px] md:h-[300px] lg:h-[310px] xl:h-[400px]'></div>

										<div className='w-5/6 mx-auto max-h-84 mt-12 sm:mt-14'>			
											<a href='https://www.roblox.com/games/14108196267/The-Adventures-of-John-and-Mark' target="_blank" className='group duration-200 bg-main-blue h-16 w-fit min-w-[180px] mx-auto rounded-full flex items-center hover:shadow-button hover:duration-200 hover:transition-all'>
												<p className='uppercase text-xl text-white text-center font-black mx-auto px-8 min-[400px]:text-2xl min-[400px]:px-10'>Play now</p>
											</a>
										</div>
									</div>
								</div>
							</div>

							<div className="w-full h-full shrink-0 overflow-hidden">
								<div className="w-full h-full bg-home-page2 bg-cover bg-center blur-sm"></div>

								<div className='relative w-full h-full -top-full z-20'>
									<div className='relative w-8/12 h-fit top-1/2 -translate-y-1/2 duration-200 mx-auto mt-15 md:w-10/12 md:mt-0 sm:h-96 xl:h-[520px]'>
										<div className='w-full translate-y-0 mx-auto max-h-84 sm:translate-y-1/2'>
											<h1 className="font-black text-5xl text-center text-main-blue uppercase mt-4">
												Read our first blog!
											</h1>
											<h2 className="font-bold text-2xl text-center text-secundary-gray mt-2">
												Discover our plans and ideas for 2024!
											</h2>
											
											<div className='w-5/6 mx-auto max-h-84 mt-12 sm:mt-14'>			
												<Link href={`/blog/first-blog`} className='group duration-200 bg-main-blue h-16 w-fit min-w-[180px] mx-auto rounded-full flex items-center hover:shadow-button hover:duration-200 hover:transition-all'>
													<p className='uppercase text-xl text-white text-center font-black mx-auto px-8 min-[400px]:text-2xl min-[400px]:px-10'>Read now</p>
												</Link>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					{/* Background */}
					
						{/* <div className='h-screen w-full bg-principal bg-cover bg-center bg-no-repeat'></div>
						<div className='h-screen w-full bg-principal-shadow bg-cover absolute top-0'></div> */}
					
					{/* <div className='relative h-[calc(100vh-1rem)] w-full top-1/2 -translate-y-1/2 max-h-[400px] md:max-h-[500px]'>
						<a href='https://www.roblox.com/games/14108196267/The-Adventures-of-John-and-Mark' target="_blank" className='mx:auto w-5/6 h-full mx-auto block bg-john-and-mark-logo-name bg-contain bg-center bg-no-repeat sm:aspect-square sm:w-auto'></a>
						

						<a href='https://www.roblox.com/games/14108196267/The-Adventures-of-John-and-Mark' className='group duration-200 bg-main-blue mt-10 h-16 w-fit min-w-[180px] mx-auto rounded-full flex items-center hover:shadow-button hover:duration-200 hover:transition-all min-[300px]:mt-15 md:mt-20'>
							<p className='uppercase text-2xl text-white text-center font-black mx-auto px-10 min-[400px]:text-3xl'>Play now</p>
						</a>
					</div> */}

					<div className="hidden sm:block">
						<SocialMedia />
					</div>
					
					<div className='absolute w-fit bottom-0 right-0 left-0 mx-auto gap-0 space-x-3 flex items-center flex-row mb-6 z-50'>
						<button className={`aspect-square rounded-full duration-200 ${currentIndex === 0 ? 'bg-main-blue h-4' : 'bg-white h-3'}`} onClick={() => handleButtonClick(0)}></button>
						<button className={`aspect-square rounded-full duration-200 ${currentIndex === 1 ? 'bg-main-blue h-4' : 'bg-white h-3'}`} onClick={() => handleButtonClick(1)}></button>
					</div>
				</div>


				{/* -- About */}
				<div className='bg-primary'>
					<div className='w-10/12 mx-auto py-24'>
						<div className='relative w-full h-fit duration-200 mx-auto mt-15'>
							<a href='https://www.roblox.com/groups/4756258/Broken-Clock' target="_blank" className='relative h-48 w-full block bg-bc-logo-name bg-contain bg-center bg-no-repeat left-0 right-0 mx-auto sm:w-96'></a>

							<h1 className="font-black text-5xl text-center text-secundary uppercase mt-4">
								Who we are?
							</h1>
							<h2 className="font-bold text-2xl text-center text-gray mt-2">
								We are an independent Roblox game development studio!
							</h2>

							<div className='w-5/6 mx-auto max-h-84 mt-12 sm:mt-14'>			
								<a href='https://www.roblox.com/groups/4756258/Broken-Clock' target="_blank" className='duration-200 bg-main-blue w-fit min-w-16 mx-auto rounded-full flex items-center hover:shadow-button hover:duration-200 hover:transition-all'>
									<p className='uppercase text-lg text-white text-center font-black px-2 my-4 min-[400px]:text-2xl min-[400px]:mx-10 [400px]:my-4'>Our Roblox Group</p>
								</a>
							</div>
						</div>
					</div>
				</div>

				{/* Latest Blog */}
				<div className='featured-post-bg z-10 relative overflow-hidden bg-secundary-white bg-cover before:absolute before:w-full before:h-full before:bg-latest-blog before:bg-center before:bg-no-repeat before:opacity-10 before:blur-[10px] before:-z-10'>				
					<div className='w-10/12 mx-auto py-24'>
						<div className="pb-10">
							<h1 className="uppercase text-secundary font-black text-5xl pb-2">Featured content</h1>
							<h2 className="text-gray font-bold text-2xl">Latest news</h2>
						</div>



						<div className='w-5/6 mx-auto md:w-[640px] mt-5'>
							{/* Content */}
							<Link href={`/blog/${featuredPost.slug}`} className='featured-post relative w-full h-72 block rounded-lg shadow-latest-blog duration-300 sm:h-96 overflow-hidden before:absolute before:bg-cover before:bg-center before:w-full before:h-full before:duration-300 before:hover:duration-300 before:hover:scale-110'>
								<style>
									{`.featured-post:before { background-image: url(${featuredPost.cover}); }`}
								</style>
				
								
								<div className='relative bg-latest-blog-shadow-content h-72 w-full rounded-lg items-end duration-300 sm:h-96'>
									<div className='absolute bottom-0 right-0 left-0 mb-4 md:ml-6'>
										<h2 className='text-white text-2xl font-bold text-center md:text-left'>{featuredPost.title}</h2>
										<p className='uppercase text-main-blue text-lg font-semibold text-center md:text-left'>Latest Blog</p>
									</div>

									<div className='group hidden absolute right-0 bottom-0 mr-8 mb-6 cursor-pointer duration-200 bg-main-blue h-12 w-48 min-w-[180px] mx-auto rounded-xl items-center hover:shadow-button hover:duration-200 hover:transition-all md:flex'>
										<p className='inline uppercase text-lg text-white text-left font-black mx-4'>Read more</p>
										<div className='inline w-10 h-10 bg-right-arrow bg-center bg-contain'></div>
									</div>
								</div>

								{/* <div className='relative top-0 -translate-y-full float-left bg-latest-blog bg-cover bg-center bg-no-repeat w-full h-full duration-300 hover:duration-300 hover:scale-150'></div> */}
							</Link>
						</div>
					</div>
				</div>

				{/* Games */}
				<span id='games'></span>
				<div className='bg-primary'>
					<div className='w-10/12 mx-auto py-24'>
						<div className="pb-10">
							<h1 className="uppercase text-secundary font-black text-5xl pb-2">Our Games</h1>
							<h2 className="text-gray font-bold text-2xl">Let’s enjoy with us!</h2>
						</div>

						<div className='w-full h-fit flex flex-wrap'>
							{/* John and Mark */}
							<div className="w-full h-[400px] px-3 py-3 sm:w-1/2 2xl:w-1/3 max-w-2xl">
								<div className="bg-primary-white w-full h-full rounded-xl overflow-hidden shadow-games">
									<a href="https://www.roblox.com/games/14108196267/The-Adventures-of-John-and-Mark-STORY" target="_blank" className="block relative w-full h-2/3 bg-secundary-white overflow-hidden">
										{/* Players online */}
										<div className="w-24 absolute bottom-0 flex mb-2 ml-4 z-10 pointer-events-none text-white text-lg">
											<PlayersOnline universeId={4884396315} />
										</div>

										{/* Year */}
										<div className='absolute right-0 bottom-0 duration-200 bg-main-orange w-fit mr-6 mb-4 rounded-full flex items-center z-10 pointer-events-none'>
											<p className='uppercase mx-auto text-base text-white text-center font-bold px-4 py-1'>2023</p>
										</div>
										
										{/* Game cover */}
										<div className=' bg-john-and-mark bg-cover bg-no-repeat bg-center duration-300 h-full hover:duration-300 hover:scale-110'>
											<div className='relative bg-game-shadow h-full w-full items-end sm:h-full'></div>
										</div>
									</a>
									
									<div className="w-full h-1/3 xl:h-1/4">
										<p className="text-secundary text-center text-2xl font-bold my-4 w-full px-2 overflow-hidden whitespace-nowrap text-ellipsis">The Adventures Of John And Mark</p>
										<div className='w-5/6 mx-auto max-h-84'>			
											<a href='https://www.roblox.com/games/14108196267/The-Adventures-of-John-and-Mark-STORY' target="_blank" className='group duration-200 bg-main-blue w-fit min-w-[180px] mx-auto rounded-full flex items-center hover:shadow-button hover:duration-200 hover:transition-all'>
												<p className='uppercase mx-auto text-lg text-white text-center font-black px-2 my-2 min-[400px]:text-2xl'>Play</p>
											</a>
										</div>
									</div>
								</div>
							</div>
							
							{/* Treacherous Tower */}
							<div className="w-full h-[400px] px-3 py-3 sm:w-1/2 2xl:w-1/3 max-w-2xl">
								<div className="bg-primary-white w-full h-full rounded-xl overflow-hidden shadow-games">
									<a href="https://www.roblox.com/games/4237861040/Treacherous-Tower" target="_blank" className="block relative w-full h-2/3 bg-secundary-white overflow-hidden">
										{/* Players online */}
										<div className="w-24 absolute bottom-0 flex mb-2 ml-4 z-10 pointer-events-none text-white text-lg">
											<PlayersOnline universeId={1383164929} />
										</div>

										{/* Year */}
										<div className='absolute right-0 bottom-0 duration-200 bg-main-orange w-fit mr-6 mb-4 rounded-full flex items-center z-10 pointer-events-none'>
											<p className='uppercase mx-auto text-base text-white text-center font-bold px-4 py-1'>2019</p>
										</div>

										{/* Game cover */}
										<div className=' bg-treacherous-tower bg-cover bg-no-repeat bg-center duration-300 h-full hover:duration-300 hover:scale-110'>
											<div className='relative bg-game-shadow h-full w-full items-end sm:h-full'></div>
										</div>
									</a>
									
									<div className="w-full h-1/3">
										<p className="text-secundary text-center text-2xl font-bold my-4 w-full px-2 overflow-hidden whitespace-nowrap text-ellipsis">Treacherous Tower</p>
										<div className='w-5/6 mx-auto max-h-84'>			
											<a href='https://www.roblox.com/games/4237861040/Treacherous-Tower' target="_blank" className='group duration-200 bg-main-blue w-fit min-w-[180px] mx-auto rounded-full flex items-center hover:shadow-button hover:duration-200 hover:transition-all'>
												<p className='uppercase mx-auto text-lg text-white text-center font-black px-2 my-2 min-[400px]:text-2xl'>Play</p>
											</a>
										</div>
									</div>
								</div>
							</div>

							{/* Never Die */}
							<div className="w-full h-[400px] px-3 py-3 sm:w-1/2 lg:w-1/3 max-w-2xl">
								<div className="bg-primary-white w-full h-full rounded-xl overflow-hidden shadow-games">
									<a className="block relative w-full h-2/3 bg-secundary-white overflow-hidden">
										{/* Year */}
										<div className='absolute right-0 bottom-0 duration-200 bg-main-orange w-fit mr-6 mb-4 rounded-full flex items-center z-10 pointer-events-none'>
											<p className='uppercase mx-auto text-base text-white text-center font-bold px-4 py-1'>2024</p>
										</div>

										{/* Game cover */}
										<div className=' bg-never-die bg-cover bg-no-repeat bg-center duration-300 h-full hover:duration-300 hover:scale-110'>
											<div className='relative bg-game-shadow h-full w-full items-end sm:h-full'></div>
										</div>
									</a>
									
									<div className="w-full h-1/3">
										<p className="text-secundary text-center text-2xl font-bold my-4 w-full px-2 overflow-hidden whitespace-nowrap text-ellipsis">Never Die</p>
										<div className='w-5/6 mx-auto max-h-84'>			
											<a className='group duration-200 bg-button-gray w-fit min-w-[180px] mx-auto rounded-full flex items-center hover:shadow-button hover:duration-200 hover:transition-all'>
												<p className='uppercase mx-auto text-lg text-white text-center font-black px-2 my-2 min-[400px]:text-2xl'>Soon</p>
											</a>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>

				{/* Team */}
				<div className='relative bg-secundary-white'>
					<div className='w-10/12 mx-auto py-24'>
						<div className="pb-10">
							<h1 className="uppercase text-secundary font-black text-5xl pb-2">The Team</h1>
							<h2 className="text-gray font-bold text-2xl">Get to know us!</h2>
						</div>

						<div className="w-full h-fit sm:flex">
							<div className='w-full h-fit flex flex-wrap sm:w-1/2 sm:min-h-0'>
								{[...posts].sort((a, b) => a.frontMatter.order - b.frontMatter.order).map((post) => (
									<div className="w-32 h-32 sm:h-40 m-4 sm:w-40" key={post.frontMatter.title}>
										<button onClick={() => changeWorker(post.frontMatter)} className={`absolute bg-primary w-32 h-32 rounded-xl overflow-hidden shadow-games sm:w-40 sm:h-40 ${selectedPost === post.frontMatter.title ? 'sm:outline outline-4 sm:outline-main-blue' : ''}`} key={post.frontMatter.title}>
											{/* ... restante do seu código ... */}
											<div className="block relative w-full h-full bg-secundary-white overflow-hidden">
												{/* Worker cover */}
												<div className='bg-cover bg-no-repeat bg-center duration-300 h-full'>
													<div alt="Cover Image" className="w-full h-full absolute bg-cover" style={{ backgroundImage: `url(${post.frontMatter.thumbnail})` }} />
													<div className='relative bg-game-shadow h-full w-full items-end sm:h-full z-10'></div>
												</div>
											</div>
											
											<div className="absolute flex bottom-0 w-full h-fit before:absolute before:w-full before:h-full before:bg-secundary before:opacity-50 before:-z-10 z-10">
												<h3 className={`text-center text-xl font-bold my-3 w-full px-2 overflow-hidden whitespace-nowrap text-ellipsis ${selectedPost === post.frontMatter.title ? 'text-white sm:text-main-blue' : 'text-white'}`} key={post.frontMatter.title}>
													{post.frontMatter.title}
												</h3>
												{/* <h3 className={`text-white text-center text-xl font-bold my-3 w-full px-2 overflow-hidden whitespace-nowrap text-ellipsis ${selectedPost === post.frontMatter.title ? 'text-main-blue' : ''}`} key={post.frontMatter.title}>{post.frontMatter.title}</h3> */}
											</div>
										</button>
									</div>
								))}
							</div>
							
							<div className={`absolute w-full h-full left-0 top-0 z-10 before:absolute before:h-full before:w-full before:bg-secundary before:opacity-50 before:-z-10 sm:before:hidden sm:w-1/2 sm:relative sm:h-fit sm:block ${workerInformationVisible ? 'block' : 'hidden'}`}>
								<div className="absolute bg-secundary-white w-1/2 mx-auto right-0 left-0 top-1/2 -translate-y-1/2 p-6 rounded-xl min-w-[250px] sm:min-w-0 sm:relative sm:w-full sm-p-0 sm:right-auto sm:left-auto sm:mx-0 sm:translate-y-0 sm:top-0 sm:bg-transparent">
									<button onClick={ toggleWorkerInformation } className="h-16 w-16 absolute right-0 top-0 text-4xl font-bold text-secundary sm:hidden">X</button>
									<div className="block w-full h-64 -z-10 mx-auto sm:h-96 sm:w-64 sm:absolute">
										<img
											src={workerRobloxCharacter}
											className={`object-cover object-center w-full ${
												workerRobloxCharacter ?
												'block'
												: 'hidden'
											}`}
										/>
									</div>

									<div className="relative w-full z-50 sm:mt-80 lg:flex lg:flex-row-reverse">
										<ul className='w-full h-fit flex flex-row-reverse gap-2 right-0 lg:w-1/2'>
											{validPlatforms.map(platform => (
												workerSocialMedia && workerSocialMedia[platform] && (
													<li key={platform} className='h-10 w-10 p-1 mt-2 hover:outline-main-blue hover:duration-200'>
														{renderSocialIcon(platform, workerSocialMedia[platform])}
													</li>
												)
											))}
										</ul>

										<h1 className="text-secundary text-left text-3xl font-black block w-full py-2 lg:w-1/2 sm:overflow-hidden lg:whitespace-nowrap lg:text-ellipsis lg:inline">{workerName}</h1>

									</div>

									<div className={`w-full h-[2px] bg-secundary my-2 ${selectedPost !== null ? 'block' : 'hidden'}`}></div>
									<h3 className="text-gray text-left text-xl font-bold italic">{workerRole}</h3>
									<h3 className="text-secundary text-left text-xl mt-4">{workerDescription}</h3>
								</div>
							</div>
						</div>
					</div>
				</div>

				{/* Community */}
				<div className='bg-secundary-white bg-john-and-mark-parallax bg-cover bg-fixed bg-top'>
					<div className="bg-community-blue w-full h-full">
						<div className='w-full mx-auto py-16'>
							<div className="w-fit mx-auto block items-center">
								<span className="uppercase text-white text-4xl font-black block text-center mx-auto min-[300px]:text-5xl md:inline">Join Our </span>
								<span className="uppercase text-main-blue text-4xl font-black text-center block mx-auto min-[300px]:text-5xl md:inline">Community </span>
							</div>

							<p className="font-normal text-2xl text-center text-white mt-4 px-4">
								We look forward to having you with us!
							</p>

							<div className='w-5/6 mx-auto max-h-84 mt-16 sm:mt-16'>			
								<a href='https://discord.com/invite/qsaSA45KUX' target="_blank" className='group duration-200 bg-main-blue w-fit min-w-16 mx-auto rounded-full flex items-center hover:shadow-button hover:duration-200 hover:transition-all'>
									<p className='uppercase text-lg text-white text-center font-black px-2 my-4 min-[400px]:text-2xl min-[400px]:mx-10 [400px]:my-4'>Join Discord</p>
								</a>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
    );
};