import React, { useState } from "react";
import toast from "react-hot-toast";

import { BsCloudUpload } from "react-icons/bs";
import ImageToBase64 from "../utils/ImageToBase64";
import config from "../frontEndConfig";

function NewProduct() {
	const initialState = {
		name: "",
		category: "",
		image: "",
		price: "",
		description: "",
	};

	const [data, setdata] = useState({
		name: "",
		category: "",
		image: "",
		price: "",
		description: "",
	});

	// handle on change
	const handleOnChange = (e) => {
		const { name, value } = e.target;

		setdata((prevData) => {
			return {
				...prevData,
				[name]: value,
			};
		});
	};

	//handle uplaod Image
	const handleUploadImage = async (e) => {
		const data = await ImageToBase64(e.target.files[0]);

		//add image to set data
		setdata((prevData) => {
			return {
				...prevData,
				image: data,
			};
		});
	};

	//handle on submit
	const handleOnSumbit = async (e) => {
		e.preventDefault();

		const { name, category, image, price, description } = data;

		if (name && category && image && price && description) {
			const fetchData = await fetch(
				import.meta.env.VITE_APP_SERVER_DOMAIN + "products/addProduct",
				{
					method: "POST",
					headers: {
						"content-type": "application/json",
					},
					body: JSON.stringify(data),
				}
			);

			const responseData = await fetchData.json();
			toast(responseData.message);

			// reset the form fields to their inital fields
			setdata(initialState);
		} else {
			toast("Enter require fields");
		}
	};

	return (
		<>
	
		</>
		)}


export default NewProduct;