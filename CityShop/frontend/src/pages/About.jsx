import React from "react";
import about_us from "../assests/about_us.webp";

function About() {
	return (
		<section className="bg-gray-100 py-16" id="about">
			<div className="container mx-auto px-4">
				<div className="flex flex-wrap  justify-between items-center -mx-4">
					<div className="w-full lg:w-1/2 max-w-[480px] px-4">
						<h2 className="text-3xl font-semibold text-gray-800 mb-4">
							About Our Store
						</h2>
						<p className="text-slate-600 leading-relaxed mb-8 font-medium italic ">
							At City, we are passionate about making your shopping experience simple, enjoyable, and reliable. Our mission is to bring you the best quality products across categories at affordable prices, all in one place.
						</p>
						<p className="text-slate-600 leading-relaxed mb-8 font-medium italic">
							Whether you are looking for the latest gadgets, fashion essentials, home products, or daily needs, we’ve got you covered. We carefully curate a wide range of products to match your lifestyle and preferences.
						</p>
						<p className="text-slate-600 leading-relaxed mb-8 font-medium italic">
							Our team works closely with trusted suppliers to ensure every product meets high standards of quality, value, and durability. We believe that online shopping should be convenient, secure, and satisfying.

At City, customer satisfaction is our top priority. From easy browsing to fast delivery and responsive support, we strive to make every step of your shopping journey smooth and enjoyable.
						</p>
					</div>
					<div className="w-full lg:w-1/2 px-4">
						<img
							src={about_us} // Replace with your image URL
							alt="About Us"
							className="rounded-lg shadow-lg h-96 w-[90%]"
						/>
					</div>
				</div>
			</div>
		</section>
	);
}

export default About;
