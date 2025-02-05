import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/axiosConfig";

const PaymentPage = () => {
  const { id } = useParams(); // Event ID from URL
  const navigate = useNavigate();
  const [totalAmount, setTotalAmount] = useState(0);
  const [paymentStatus, setPaymentStatus] = useState(""); // To track payment status

  const user = JSON.parse(localStorage.getItem("user"));
  const token = user?.jwtToken;

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
      const paymentData = {
        amount: totalAmount,
        eventId: id,
      };
  
      // ✅ Create a Razorpay Order from Backend
      const orderResponse = await api.post("/payments/create-order", paymentData, {
        headers: { Authorization: `Bearer ${token}` },
      });
  
      const { id: razorpayOrderId, amount } = orderResponse.data;
  
      const options = {
        key: "rzp_test_Q0WD3rgIED0ILF",
        amount: amount, // Amount in paise
        currency: "INR",
        name: "PlanIT Event",
        description: "Event Payment",
        image: "/path/to/logo.png",
        order_id: razorpayOrderId,
        handler: async function (response) {
          try {
            const verifyResponse = await api.post(
              "/payments/verify",
              {
                razorpayPaymentId: response.razorpay_payment_id,
                razorpayOrderId: response.razorpay_order_id,
                razorpaySignature: response.razorpay_signature,
              },
              { headers: { Authorization: `Bearer ${token}` } }
            );
  
            if (verifyResponse.data.status === "Completed") {
              setPaymentStatus("Payment successful!");
              alert("Payment Successful!");
              navigate(`/event-details/${id}`);
            }
          } catch (error) {
            console.error("Error verifying payment", error);
            alert("Payment verification failed.");
          }
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
      console.error("Error processing payment", error);
      alert("Failed to process payment.");
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
