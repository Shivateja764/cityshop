//external imports
const mongoose = require("mongoose");

const connectDB = async () => {
	try {
		mongoose.set("strictQuery", true);

		await mongoose.connect(process.env.MONGO_URI, {
			
		});
		console.log("Database is connected");
	} catch (error) {
		console.log(`Error: ${error.message}`);
		
	}
};

//export
module.exports = connectDB;
