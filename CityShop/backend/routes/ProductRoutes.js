const express = require("express");
const router = express.Router();

const {
	uploadProduct,
	getAllProducts,
} = require("../controllers/ProductController");

const authMiddleware = require("../middleware/auth");

// protected route
router.post("/addProduct", authMiddleware, uploadProduct);

// public route
router.get("/getAllProducts", getAllProducts);

module.exports = router;