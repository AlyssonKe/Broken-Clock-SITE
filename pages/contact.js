import CustomHead from '/components/CustomHead';

import React, { useState, useEffect  } from 'react';
import Link from 'next/link'

export default function Contact () {
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [formData, setFormData] = useState({
        subject: '',
        name: '',
        email: '',
        message: '',
    });
	const [isEmailValid, setIsEmailValid] = useState(true);
	const [isFormFilled, setIsFormFilled] = useState(false);
	const [formSubmitted, setFormSubmitted] = useState(false);

	const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

	useEffect(() => {	
		const isFormFilled = formData.subject && formData.name && formData.email && formData.message;
		setIsFormFilled(isFormFilled);
	}, [formData]);

    const handleSubmit = async (event) => {
        event.preventDefault();
		
		const isFormFilled = formData.subject && formData.name && formData.email && formData.message;

		// Check if the email is valid and the form is filled
		const isEmailValid = validateEmail(formData.email);
	
		if (!isFormFilled || !isEmailValid) {
			return;
		}

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

			setFormSubmitted(true);
		}
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));

		const formComplete = formData.subject && formData.name && formData.email && formData.message && value;
    	setIsFormFilled(formComplete);

		if (name === 'email') {
			setIsEmailValid(validateEmail(value));
		}
    };

    return (
		<>
			<CustomHead 
				title="Contact"
				description="Contact the Broken Clock team to solve problems or send suggestions."
				author="Duelan"
				cover="/images/broken-clock-logo-name.png"
			/>

			<div className="flex flex-wrap">
				<div className="w-full h-1/3 right-0 -mt-20 max-h-[1024px] md:w-1/2 md:h-screen">
					<div className="w-10/12 mx-auto pt-36 pb-8 md:py-48 md:w-8/12">
						<div className="pb-10">
							<h1 className="uppercase text-secundary font-black text-5xl pb-2">Contact</h1>
							<h2 className="text-gray font-bold text-2xl">How can we help?</h2>

							<div className="w-full h-[1px] bg-secundary my-2"></div>

							<h3 className="text-secundary text-left text-xl mt-4 mb-8">Fill in the information in this contact form. We will get back in touch as soon as possible.</h3>
							
							<a href="mailto:principal@brokenclock.fun" className="text-main-blue text-left text-lg font-bold min-[400px]:text-xl hover:underline">principal@brokenclock.fun</a>
							<br></br>
							<a href="mailto:hello@brokenclock.fun" className="text-main-blue text-left text-lg font-bold min-[400px]:text-xl hover:underline">hello@brokenclock.fun</a>
						</div>
					</div>
				</div>

				<div className="w-full h-full right-0 md:w-1/2 md:h-full">
					<div className='bg-secundary bg-opacity-50 relative -mt-0 bg-principal h-full min-h-[550px] max-h-[1024px] before:bg-contact before:bg-cover before:bg-center before:bg-no-repeat before:absolute before:w-full before:h-full before:blur-sm before:-z-10 md:-mt-20 md:h-[calc(100vh)] md:min-h-[600px]'>
						<div className='bg-contact-shadow bg-cover bg-center bg-no-repeat h-full w-full min-h-[550px] max-h-[1024]'>
							{/* Background */}
							
								{/* <div className='h-screen w-full bg-principal bg-cover bg-center bg-no-repeat'></div>
								<div className='h-screen w-full bg-principal-shadow bg-cover absolute top-0'></div> */}
							
							{/* <div className='relative h-[calc(100vh-1rem)] w-full top-1/2 -translate-y-1/2 max-h-[400px] md:max-h-[500px]'>
								<a href='https://www.roblox.com/games/14108196267/The-Adventures-of-John-and-Mark' target="_blank" className='mx:auto w-5/6 h-full mx-auto block bg-john-and-mark-logo-name bg-contain bg-center bg-no-repeat sm:aspect-square sm:w-auto'></a>
								

								<a href='https://www.roblox.com/games/14108196267/The-Adventures-of-John-and-Mark' className='group duration-200 bg-main-blue mt-10 h-16 w-fit min-w-[180px] mx-auto rounded-full flex items-center hover:shadow-button hover:duration-200 hover:transition-all min-[300px]:mt-15 md:mt-20'>
									<p className='uppercase text-2xl text-white text-center font-black mx-auto px-10 min-[400px]:text-3xl'>Play now</p>
								</a>
							</div> */}

							{
								formSubmitted ? (
									<div className='absolute w-3/4 top-1/2 -translate-y-1/2 mx-auto right-0 left-0 rounded-xl mt-5 lg:w-[350px] xl:w-[450px]'>
										<div className='uppercase text-white font-black text-5xl pb-2 text-center'>Thank you for your contact!</div>
										<h2 className="text-secundary-gray font-bold text-2xl text-center">We will contact you as soon as possible!</h2>
										<div className='w-5/6 mx-auto max-h-84 mt-12 sm:mt-14'>			
											<Link href='/' className='group duration-200 bg-main-blue h-16 w-fit min-w-[180px] mx-auto rounded-full flex items-center hover:duration-200 hover:transition-all'>
												<p className='uppercase text-xl text-white text-center font-black mx-auto px-10 min-[400px]:text-2xl'>Return Home</p>
											</Link>
										</div>
									</div>
								) : (
									<div className='absolute flex items-center bg-primary-white w-full h-full top-0 mx-auto right-0 left-0 rounded-none mt-0 lg:w-[350px] xl:w-[450px] md:w-3/4 md:mt-5 md:-translate-y-1/2 md:top-1/2 md:rounded-xl md:h-auto'>
										<form onSubmit={handleSubmit} className="px-6 py-10 min-[450px]:px-16 md:px-8 md:py-10">
											<input type="text"
												id="subject"
												name="subject"
												placeholder="Subject"
												value={formData.subject}
												onChange={handleChange}
												required
												className="text-xl text-secundary bg-secundary-white rounded-xl w-full p-3 px-6 mb-6 duration-200 border-2 border-secundary-gray focus:duration-0 focus:outline-none focus:border-main-blue hover:border-main-blue"
											/>
											<input type="text"
												id="name"
												name="name"
												placeholder="Full name"
												value={formData.name}
												onChange={handleChange}
												required
												className="text-xl text-secundary bg-secundary-white rounded-xl w-full p-3 px-6 mb-6 duration-200 border-2 border-secundary-gray focus:duration-0 focus:outline-none focus:border-main-blue hover:border-main-blue"
											/>
											<input type="text"
												id="email"
												name="email"
												placeholder="Email"
												value={formData.email}
												onChange={handleChange}
												required
												className={`text-xl text-secundary bg-secundary-white rounded-xl w-full p-3 px-6 mb-6 duration-200 focus:duration-0 border-2 ${isEmailValid ? 'border-secundary-gray focus:border-main-blue hover:border-main-blue' : 'border-red'} focus:outline-none`}
											/>
											
											<textarea
												id="message"
												name="message"
												placeholder="Message"
												value={formData.message}
												onChange={handleChange}
												required
												className="text-xl text-secundary bg-secundary-white rounded-xl w-full p-3 px-6 min-h-[120px] max-h-[400px] mb-6 duration-200 border-2 border-secundary-gray focus:duration-0 focus:outline-none focus:border-main-blue hover:border-main-blue"
											/>

											<div className='w-full mx-auto max-h-32 text-center min-[450px]:w-5/6'>			
												<input
													type="submit"
													value={isSubmitting ? "SENDING..." : "SUBMIT"}
													className={`h-12 w-fit mx-auto flex rounded-xl text-white text-xl text-center font-bold px-10 min-[400px]:px-16 ${isSubmitting ? 'bg-gray cursor-not-allowed' : isFormFilled ? 'bg-main-blue cursor-pointer' : 'bg-gray cursor-not-allowed'}`}
													disabled={!isFormFilled || isSubmitting}
												/>
											</div>
										</form>
									</div>
								)
							}
							
						</div>
					</div>
				</div>
			</div>
		</>
    );
};