const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    userName: String,

    email: String,

    items: Array,

    totalAmount: Number,

    razorpay_order_id: String,

    razorpay_payment_id: String,

    status: {
      type: String,
      default: "Paid",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Order", orderSchema);