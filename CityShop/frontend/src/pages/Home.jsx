import React, { useRef } from "react";
import { useSelector } from "react-redux";

//import componets
import SuggestedFruits from "../components/SuggestedFruits";
import AllProducts from "../components/AllProducts";
import About from "./About";
import Contact from "./Contact";

function Home() {
	const productData = useSelector((state) => state.products.productList);

	const fruitsProducts = productData.filter(
		(item) => item.category === "fruits"
	);

	return (
		<div className=" w-full p-4 sm:p-8 " id="home">
			<div className="h-full mx-auto text-center flex flex-col gap-y-8">
				<h1 className="text-5xl font-bold  sm:max-w-[500px] lg:max-w-[900px] mx-auto">
					The Fastest Delivery{" "}
					<span className="text-red-600">in your Home</span>
				</h1>

				<p className="w-full text-sm sm:max-w-lg text-slate-600 tracking-wider mx-auto">
					Welcome to City Shop, your one-stop destination for all your shopping needs. We are dedicated to bringing you a seamless and enjoyable online shopping experience with a wide range of high-quality products at the best prices.

At City Shop, we offer everything from the latest electronics and fashion trends to home essentials and everyday products. Whether you're upgrading your gadgets, refreshing your wardrobe, or shopping for your home, we’ve got you covered.
				</p>
				<button
					type="button"
					className="bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-md w-3/4 sm:max-w-[350px] mx-auto"
				>
					Order Now
				</button>
			</div>

			{/* suggest fruits item in the first  */}
			<div className="mt-32 w-full">
				<SuggestedFruits fruitsProducts={fruitsProducts} />
			</div>

			{/* display all products */}
			<AllProducts heading={"Your Products"} />

			<About />
			<Contact />
		</div>
	);
}

export default Home;
