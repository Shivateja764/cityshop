const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


// SIGN UP
const userSignUp = async (req, res) => {
	try {
		const { firstName, lastName, email, password } = req.body;

		// check required fields
		if (!email || !password) {
			return res.status(400).json({ message: "Missing fields" });
		}

		// check existing user
		const existing = await User.findOne({ email });
		if (existing) {
			return res.status(400).json({ message: "User already exists" });
		}

		// 🔐 HASH PASSWORD HERE
		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(password, salt);

		console.log("Original:", password);
		console.log("Hashed:", hashedPassword);

		// save user
		const user = new User({
			firstName,
			lastName,
			email,
			password: hashedPassword, // ✅ hashed stored
		});

		await user.save();

		res.status(201).json({
			message: "User registered successfully",
		});
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

// LOGIN
const userLogin = async (req, res) => {
	try {
		const { email, password } = req.body;

		const user = await User.findOne({ email });
		if (!user) {
			return res.send({
				message: "User not found",
				alert: false,
			});
		}

		// compare password
		const isMatch = await bcrypt.compare(password, user.password);

		if (!isMatch) {
			return res.send({
				message: "Invalid credentials",
				alert: false,
			});
		}

		// create token
		
		res.send({
			message: "Login successful",
			alert: true,
			token,
			data: {
				_id: user._id,
				firstName: user.firstName,
				lastName: user.lastName,
				email: user.email,
				image: user.image,
			},
		});
	} catch (error) {
		res.send({ message: error.message });
	}
};

module.exports = { userSignUp, userLogin };