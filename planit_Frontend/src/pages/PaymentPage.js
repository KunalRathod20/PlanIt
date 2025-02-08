import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/axiosConfig";

const PaymentPage = () => {
  const { id } = useParams(); // Event ID from URL
  const navigate = useNavigate();
  const [totalAmount, setTotalAmount] = useState(0);
  const [paymentStatus, setPaymentStatus] = useState(""); // To track payment status

  // ✅ Fix: Correct userId retrieval from localStorage
  const user = JSON.parse(localStorage.getItem("user"));
  const token = user?.jwtToken;
  const userId = user?.userId; // ✅ Ensure userId is correctly retrieved

  useEffect(() => {
    const fetchTotalAmount = async () => {
      try {
        const response = await api.get(`/expenses/total/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setTotalAmount(response.data); // Set the total amount for payment
      } catch (error) {
        console.error("Error fetching total amount", error);
      }
    };

    fetchTotalAmount();
  }, [id, token]);

  const handlePayment = async () => {
    try {
      console.log("User ID:", userId);
      if (!userId) {
        alert("User ID is missing. Please log in again.");
        return;
      }
  
      console.log("Joining Event:", `/events/${id}/join/${userId}`);
  
      // Join the event before making payments
      await api.post(`/events/${id}/join/${userId}`, {}, { 
        headers: { Authorization: `Bearer ${token}` } 
      });
  
      // Create Razorpay order
      const paymentData = { amount: totalAmount, eventId: id };
      const orderResponse = await api.post("/payments/create-order", paymentData, {
        headers: { Authorization: `Bearer ${token}` },
      });
  
      console.log("Order Created:", orderResponse.data);
      const { id: razorpayOrderId, amount } = orderResponse.data;
  
      const options = {
        key: "rzp_test_Q0WD3rgIED0ILF",
        amount: amount, // Amount in paise
        currency: "INR",
        name: "PlanIT Event",
        description: "Event Payment",
        image: "/img/logo.png",
        order_id: razorpayOrderId,
        handler: async function (response) {
          console.log("Razorpay Payment Successful:", response);
  
          // ✅ Save Payment Details (Without ID)
          const paymentPayload = {
            amount: totalAmount,
            status: "Success",
            eventId: id,
            userId: userId,
          };
  
          await api.post("/payments/process", paymentPayload, {
            headers: { Authorization: `Bearer ${token}` },
          });
  
          setPaymentStatus("Payment Successful!");
          navigate(`/invoice/${id}`);
        },
        prefill: {
          name: user?.username || "User",
          email: user?.email || "user@example.com",
          contact: user?.contact || "9999999999",
        },
        theme: { color: "#3399cc" },
      };
  
      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error("Error processing payment", error.response?.data || error.message);
      alert("Failed to process payment. Check console logs.");
    }
  };
  
  
  return (
    <div className="container mt-5">
      <div className="card p-4 shadow-lg">
        <h2 className="text-center text-primary">Payment for Event</h2>
        <p><strong>Total Amount:</strong> ₹{totalAmount.toFixed(2)}</p>
        <p>{paymentStatus}</p>
        <div className="d-flex justify-content-center">
          <button className="btn btn-primary" onClick={handlePayment}>
            Pay and Join
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
