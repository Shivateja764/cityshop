
const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
	firstName: { type: String, required: true },
	lastName: { type: String, required: true },
	email: { type: String, unique: true, required: true },
	password: { type: String, required: true },
	image: { type: String },
});

module.exports = mongoose.models.User || mongoose.model("User", UserSchema);