import { useSelector } from "react-redux";
import toast from "react-hot-toast";

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
                  className="p-2 text-white bg-red-600 w-full rounded-md hover:bg-red-700"
                  onClick={() => navigate("/payment")}
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
