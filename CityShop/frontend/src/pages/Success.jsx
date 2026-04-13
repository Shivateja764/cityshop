import React, { useEffect } from "react";

import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { clearCart } from "../redux/productSlice";

function Success() {
  const navigate = useNavigate();
  const dispatch = useDispatch(); // ✅ inside component

  useEffect(() => {
    Swal.fire({
      title: "Payment Successful",
      text: "Your order has been placed!",
      icon: "success",
      confirmButtonText: "Continue Shopping",
      confirmButtonColor: "#28a745",
      customClass: {
        confirmButton: "swal-btn"
      }
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(clearCart());  // ✅ CLEAR CART HERE
        navigate("/");
      }
    });
  }, [navigate, dispatch]);

  return null;
}

export default Success;