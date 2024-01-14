import Head from 'next/head';
import React, { useState } from 'react';

export default function Home () {
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [formData, setFormData] = useState({
        subject: '',
        name: '',
        email: '',
        message: '',
    });

    const handleSubmit = async (event) => {
        event.preventDefault();
		setIsSubmitting(true);

		const response = await fetch('/api/sendEmail', {
			method: "POST",
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(formData)
		});

		setIsSubmitting(false);

		if (response.ok) {
			setFormData({
				subject: '',
				name: '',
				email: '',
				message: '',
			});

			console.log("Message sent successfully.");

		}
		if (!response.ok) {
			console.log("Error sending message")
		}
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    return (
		<>
			<Head>
				<title>Broken Clock Contact</title>
			</Head>

			<div className="flex">
				<div className="w-1/2 h-screen right-0 bg-secundary -mt-20">
					<div className="relative mt-48 ml-16 w-2/3 xl:ml-32">
						<div className="pb-10">
							<h1 className="uppercase text-white font-black text-5xl pb-2">Contact</h1>
							<h2 className="text-main-blue font-bold text-2xl">How can we help?</h2>

							<div className="w-full h-[1px] bg-white my-2"></div>

							<h3 className="text-primary-gray text-left text-xl mt-4 mb-8">Fill in the information in this contact form. We will get back in touch as soon as possible.</h3>
							
							<a href="mailto:principal@brokenclock.fun" className="text-main-blue text-left text-xl font-bold">principal@brokenclock.fun</a>
							<br></br>
							<a href="mailto:hello@brokenclock.fun" className="text-main-blue text-left text-xl font-bold">hello@brokenclock.fun</a>
						</div>
					</div>
				</div>

				<div className="w-1/2 h-full right-0">
					<div className='bg-secundary bg-opacity-50 relative -mt-20 bg-principal h-[calc(100vh)] max-h-[1024px] min-h-[600px] before:bg-contact before:bg-cover before:bg-center before:bg-no-repeat before:absolute before:w-full before:h-full before:blur-sm before:-z-10'>
						<div className='bg-contact-shadow bg-cover bg-center bg-no-repeat h-full w-full'>
							{/* Background */}
							
								{/* <div className='h-screen w-full bg-principal bg-cover bg-center bg-no-repeat'></div>
								<div className='h-screen w-full bg-principal-shadow bg-cover absolute top-0'></div> */}
							
							{/* <div className='relative h-[calc(100vh-1rem)] w-full top-1/2 -translate-y-1/2 max-h-[400px] md:max-h-[500px]'>
								<a href='https://www.roblox.com/games/14108196267/The-Adventures-of-John-and-Mark' target="_blank" className='mx:auto w-5/6 h-full mx-auto block bg-john-and-mark-logo-name bg-contain bg-center bg-no-repeat sm:aspect-square sm:w-auto'></a>
								

								<a href='https://www.roblox.com/games/14108196267/The-Adventures-of-John-and-Mark' className='group duration-200 bg-main-blue mt-10 h-16 w-fit min-w-[180px] mx-auto rounded-full flex items-center hover:shadow-button hover:duration-200 hover:transition-all min-[300px]:mt-15 md:mt-20'>
									<p className='uppercase text-2xl text-white text-center font-black mx-auto px-10 min-[400px]:text-3xl'>Play now</p>
								</a>
							</div> */}

							<div className='absolute bg-primary-white w-3/4 top-1/2 -translate-y-1/2 mx-auto right-0 left-0 rounded-xl mt-5 lg:w-[350px] xl:w-[450px]'>
								<form onSubmit={handleSubmit} className="px-8 py-10">
									<input type="text"
										id="subject"
										name="subject"
										placeholder="Subject"
										value={formData.subject}
										onChange={handleChange}
										required
										className="text-xl text-secundary bg-secundary-white rounded-xl w-full p-2 px-6 mb-6"
									/>
									<input type="text"
										id="name"
										name="name"
										placeholder="Full name"
										value={formData.name}
										onChange={handleChange}
										required
										className="text-xl text-secundary bg-secundary-white rounded-xl w-full p-3 px-6 mb-6"
									/>
									<input type="text"
										id="email"
										name="email"
										placeholder="Email"
										value={formData.email}
										onChange={handleChange}
										required
										className="text-xl text-secundary bg-secundary-white rounded-xl w-full p-3 px-6 mb-6"
									/>
									<textarea
										id="message"
										name="message"
										placeholder="Message"
										value={formData.message}
										onChange={handleChange}
										required
										className="text-xl text-secundary bg-secundary-white rounded-xl w-full p-3 px-6 min-h-[120px] max-h-[400px] mb-6"
									/>

									<div className='w-5/6 mx-auto max-h-32'>			
										<input
											type="submit"
											value={isSubmitting ? "SENDING..." : "SUBMIT"}
											className={`h-12 w-fit min-w-[180px] mx-auto flex rounded-xl text-white text-xl text-center font-bold px-16 ${isSubmitting ? 'bg-gray' : 'bg-main-blue'}`}
											disabled={isSubmitting}
										/>
									</div>
								</form>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
    );
};