import React, { useState } from "react";
import toast from "react-hot-toast";

function Contact() {
	const inititalData = {
		name: "",
		email: "",
		message: "",
	};

	const [data, setdata] = useState(inititalData);

	// handle on change
	const handleOnChange = (e) => {
		const { name, value } = e.target;
		setdata((prevState) => ({
			...prevState,
			[name]: value,
		}));
	};

	// handle submit
	const handleSumbitButton = (e) => {
		e.preventDefault();

		//Validation
		if (!data.name || !data.email || !data.message) {
			toast.error("Please fill all fields");
			return;
		}

		// Success
		toast.success("Message sent successfully");
		setdata(inititalData);
	};

	return (
		<div className="bg-gray-100" id="contact">
			<div className="container mx-auto py-16 px-4">
				<div className="text-center">
					<h1 className="text-4xl font-semibold text-gray-800">
						Contact Us
					</h1>
					<p className="text-gray-600 mt-2">
						We'd love to hear from you!
					</p>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-10">
					
					{/* Contact Form */}
					<div className="bg-white p-6 rounded-lg shadow-lg">
						<h2 className="text-2xl font-semibold text-gray-800 mb-4">
							Send us a message
						</h2>

						{/* ✅ Attach submit here */}
						<form onSubmit={handleSumbitButton}>
							<div className="mb-4">
								<input
									type="text"
									name="name"
									placeholder="Your Name"
									value={data.name}
									onChange={handleOnChange}
									className="w-full px-4 py-2 border rounded-lg"
								/>
							</div>

							<div className="mb-4">
								<input
									type="email"
									name="email"
									placeholder="Email Address"
									value={data.email}
									onChange={handleOnChange}
									className="w-full px-4 py-2 border rounded-lg"
								/>
							</div>

							<div className="mb-4">
								<textarea
									name="message"
									placeholder="Your Message"
									value={data.message}
									onChange={handleOnChange}
									className="w-full px-4 py-2 border rounded-lg h-32"
								/>
							</div>

							<div className="text-center">
								<button
									type="submit"
									className="bg-blue-600 text-white py-2 px-6 rounded-lg"
								>
									Send Message
								</button>
							</div>
						</form>
					</div>

					{/* Contact Info (unchanged) */}
					<div className="bg-white p-6 rounded-lg shadow-lg">
						<h2 className="text-2xl font-semibold text-gray-800 mb-4">
							Contact Information
						</h2>

						<p>Hyderabad, Telangana</p>
						<p>Email: cityShoporg@mail.com</p>
						<p>Phone: +91 6281418434</p>
					</div>

				</div>
			</div>
		</div>
	);
}

export default Contact;