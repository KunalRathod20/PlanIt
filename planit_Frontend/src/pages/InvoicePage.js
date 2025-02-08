import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/axiosConfig";
import { FaDownload } from "react-icons/fa";

const InvoicePage = () => {
  const { id } = useParams(); // Get event ID from URL
  const [invoice, setInvoice] = useState(null);
  const user = JSON.parse(localStorage.getItem("user"));
  const token = user?.jwtToken;

  useEffect(() => {
    const fetchInvoice = async () => {
      try {
        const response = await api.get(`/invoices/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.data && response.data.content) {
          const parsedContent = JSON.parse(response.data.content);
          setInvoice(parsedContent); // Store invoice details
        }
      } catch (error) {
        console.error("Error fetching invoice", error);
      }
    };

    fetchInvoice();
  }, [id, token]);

  // Function to Generate & Download Invoice
  const downloadInvoice = async () => {
    try {
      const response = await api.post(`/invoices/generate/${id}`, {}, {
        headers: { Authorization: `Bearer ${token}` },
        responseType: "blob", // Ensures response is treated as a file
      });

      // Create a blob URL and trigger download
      const blob = new Blob([response.data], { type: "application/pdf" });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");

      // Use a meaningful filename
      const filename = `Invoice_Event_${id}.pdf`;
      link.href = url;
      link.setAttribute("download", filename);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      console.log("Invoice downloaded:", filename);
    } catch (error) {
      console.error("Error generating/downloading invoice", error);
    }
  };

  return (
    <div className="container mt-5">
      <div className="card p-4 shadow-lg">
        <h2 className="text-center text-primary">Invoice Details</h2>
        
        {invoice ? (
          <>
            <p><strong>Invoice ID:</strong> {invoice.invoiceId || "N/A"}</p>
            <p><strong>User Name:</strong> {user.userName || "N/A"}</p>
            <p><strong>Event Name:</strong> {invoice.eventName || "N/A"}</p>
            <p><strong>Total Amount:</strong> ₹{invoice.totalAmount ? invoice.totalAmount.toFixed(2) : "0.00"}</p>
          </>
        ) : (
          <p>Loading invoice details...</p>
        )}

        <div className="d-flex justify-content-center mt-3">
          <button className="btn btn-success" onClick={downloadInvoice}>
            <FaDownload className="me-2" /> Download Invoice (PDF)
          </button>
        </div>
      </div>
    </div>
  );
};

export default InvoicePage;
