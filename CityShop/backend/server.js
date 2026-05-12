//external imports
require("dotenv").config();
const express = require("express");
const cors = require("cors");

//internal imports
const connectDB = require("./config/db");
const userRoute = require("./routes/UserRoutes");
const newProduct = require("./routes/ProductRoutes");
const paymentRoute = require("./routes/paymentRoute");

connectDB();

const app = express();

app.use(cors({
    origin: ["https://cityshop-5rrx.vercel.app",
    "http://localhost:5173"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}));
app.use(express.json({ limit: "10mb" }));



//port
const PORT = process.env.PORT || 8000;

//route
app.get("/", (req, res) => {
	res.send("from local host");
});

app.use("/user", userRoute);
app.use("/products", newProduct);
app.use("/payment", paymentRoute);


// listen to server
app.listen(PORT, () => {
	console.log("Server is running at : ", PORT);
});
