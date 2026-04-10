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
							At CityShop, we are dedicated to making your online shopping experience simple, convenient, and enjoyable. Our goal is to bring you a wide selection of high-quality products across multiple categories, all at affordable prices, in one seamless platform.
						</p>
						<p className="text-slate-600 leading-relaxed mb-8 font-medium italic">
							Whether you’re searching for the latest gadgets, stylish fashion, home essentials, or everyday necessities, CityShop has you covered. We carefully curate our product range to match your lifestyle and personal preferences.
						</p>
						<p className="text-slate-600 leading-relaxed mb-8 font-medium italic">
						Our team works closely with trusted suppliers to ensure that every product meets the highest standards of quality, value, and reliability. We believe that shopping online should be secure, smooth, and satisfying.

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
