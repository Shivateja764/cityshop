const express = require("express");
const Razorpay = require("razorpay");

const router = express.Router();
const Order = require("../models/OrderModel");
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});
router.post("/save-order", async (req, res) => {
  try {

    const {
      userName,
      email,
      items,
      totalAmount,
      razorpay_order_id,
      razorpay_payment_id,
    } = req.body;

    const order = new Order({
      userName,
      email,
      items,
      totalAmount,
      razorpay_order_id,
      razorpay_payment_id,
    });

    await order.save();

    res.status(201).json({
      success: true,
      message: "Order Saved",
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
    });
  }
});

router.post("/create-order", async (req, res) => {
  try {
    const { amount } = req.body;

    const options = {
      amount: amount * 100,
      currency: "INR",
      receipt: "receipt_order",
    };

    const order = await razorpay.orders.create(options);

    res.status(200).json(order);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Order failed",
    });
  }
});

module.exports = router;