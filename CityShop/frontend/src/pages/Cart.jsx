import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import axios from "axios";

import {  useEffect } from "react";
// Cart.jsx - add useNavigate to imports
import { useNavigate } from "react-router-dom";

//components
import CartProducts from "../components/CartProducts";
import emptyCart from "../assests/empty.gif";


function Cart() {
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.products.cartItem);
  const userState = useSelector((state) => state.user.userInfo);

  

  //start always from top
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

 

  //total quantity
  const totalQuantity = cartItems.reduce(
    (acc, product) => acc + parseInt(product.qty),
    0,
  );

  //total price
  const totalPrice = cartItems.reduce(
    (acc, product) => acc + parseInt(product.total),
    0,
  );
  const handlePayment = async () => {
  try {

    const { data } = await axios.post(
      "https://cityshop-backend.onrender.com/payment/create-order",
      {
        amount: totalPrice,
      }
    );

 
    


    const options = {
      key: "rzp_live_SoVwXrnTAp5qsq",

      amount: data.amount,

      currency: data.currency,

      name: "My Store",

      description: "Food Order Payment",

      order_id: data.id,

      handler: async function (response) {

  try {

    await axios.post(
      "https://cityshop-backend.onrender.com/payment/save-order",
      {
        userName: userState?.name,

        email: userState?.email,

        items: cartItems,

        totalAmount: totalPrice,

        razorpay_order_id: response.razorpay_order_id,

        razorpay_payment_id: response.razorpay_payment_id,
      }
    );

    toast.success("Payment Successful");

    navigate("/success");

  } catch (error) {

    console.log(error);

    toast.error("Order Save Failed");
  }
},

      prefill: {
        name: userState?.name,
        email: userState?.email,
      },

      theme: {
        color: "#2563eb",
      },
    };

    const razorpay = new window.Razorpay(options);

    razorpay.open();

  } catch (error) {

    console.log(error);

    toast.error("Payment Failed");
  }
};


  return (
    <>
      {cartItems[0] ? (
        <div className="p-4 w-full">
          <h2 className="text-2xl font-bold text-slate-700">Your Cart Items</h2>
          {/* items and summary conainer */}
          <div className="w-full flex flex-col md:flex-row md:gap-x-2 lg:gap-x-10 md:gap-y-0  gap-y-10 mx-auto">
            {/* item */}
            <div className=" w-full  space-y-3  ">
              {cartItems.map((item, index) => (
                <CartProducts key={index} item={item} />
              ))}
            </div>

            {/* summary*/}
            <div className="  md:max-w-md w-full flex flex-col gap-y-2 mx-auto items-center">
              <h1 className=" w-full bg-blue-700 text-white p-2 rounded-md text-center">
                Summary
              </h1>
              <div className="w-full  flex justify-between items-center">
                <p>Total Qty:</p>
                <span className="font-semibold w-32">{totalQuantity}</span>
              </div>
              <div className="w-full flex justify-between items-center">
                <p>Total Price:</p>
                <p className="w-32 font-semibold">
                  <span className="text-red-600">₹</span>
                  {totalPrice}
                </p>
              </div>
              {userState.email ? (
                <button
  type="button"
  onClick={handlePayment}
  className="p-2 text-white bg-red-600 w-full rounded-md hover:bg-red-700"
>
  Payment
</button>
              ) : (
                <div className="bg-blue-100 w-full text-center p-2 rounded-md">
                  <p className="font-thin italic text-red-500">
                    To make payment you must login
                  </p>
                </div>
              )}

             
            </div>
          </div>
        </div>
      ) : (
        <div className="w-full h-[600px] flex flex-col items-center  justify-center">
          <img
            src={emptyCart}
            alt="emptyCartIcon"
            className="w-full max-w-sm rounded-lg hover:scale-105 transition-all duration-500"
          />
          <p className="text-center text-slate-500 text-3xl font-bold mt-10">
            Empty Cart
          </p>
        </div>
      )}
    </>
  );
}

export default Cart;
