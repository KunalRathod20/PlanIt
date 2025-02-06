package com.planit.service;

import java.util.List;
import java.util.Map;

import com.razorpay.Order;


import com.planit.model.Payment;

public interface PaymentService {
    Payment processPayment(Payment payment);
    List<Payment> getPaymentsByUserId(Long userId);
    List<Payment> getPaymentsByEventId(Long eventId);
    Order createRazorpayOrder(int amount) throws Exception;
    boolean verifyPayment( String paymentId, String razorpaySignature);
}
