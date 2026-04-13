import React, { useRef } from "react";

//components
import ProductCard from "../components/ProductCard";


function SuggestedFruits({ fruitsProducts }) {
	const sliderRef = useRef();

	return (
		<div className="w-full">

			{/* product Card */}
			<div
				className="w-full flex  items-center justify-center mt-8 gap-x-5 whitespace-nowrap  scrollbar-none transition-all overflow-scroll scroll-smooth"
				ref={sliderRef}
			>
				{fruitsProducts.map((item, index) => (
					<ProductCard key={index} item={item} />
				))}
			</div>
		</div>
	);
}

export default SuggestedFruits;
