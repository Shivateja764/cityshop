const Product = require("../models/product");

const uploadProduct = async (req, res) => {
	try {
		const product = await Product.create(req.body);
		res.status(201).json(product);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

const getAllProducts = async (req, res) => {
	try {
		const products = await Product.find({});
		res.json(products);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

module.exports = { uploadProduct, getAllProducts };