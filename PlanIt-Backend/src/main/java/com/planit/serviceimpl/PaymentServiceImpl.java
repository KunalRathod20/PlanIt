package com.planit.serviceimpl;

import java.security.Key;
import java.util.Base64;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.planit.model.Event;
import com.planit.model.Payment;
import com.planit.repository.EventRepository;
import com.planit.repository.PaymentRepository;
import com.planit.service.PaymentService;
import com.razorpay.Order;
import com.razorpay.RazorpayClient;
import com.razorpay.Utils;
@Service
public class PaymentServiceImpl implements PaymentService {

    @Value("${razorpay.key.id}")
    private String razorpayKeyId;

    @Value("${razorpay.secret.key}")
    private String razorpayKeySecret;

    private final PaymentRepository paymentRepository;
    private final EventRepository eventRepository; // Ensure event exists before payment

    public PaymentServiceImpl(PaymentRepository paymentRepository, EventRepository eventRepository) {
        this.paymentRepository = paymentRepository;
        this.eventRepository = eventRepository;
    }

    @Override
    public Payment processPayment(Payment payment) {
    	System.out.println("PAYMENT "+payment);
        // ✅ Check if the event exists before saving the payment
        Optional<Event> event = eventRepository.findById(payment.getEvent().getId());
        if (event.isEmpty()) {
            throw new RuntimeException("Event not found! Cannot process payment.");
        }
        return paymentRepository.save(payment);
    }

    @Override
    public List<Payment> getPaymentsByUserId(Long userId) {
        return paymentRepository.findByUserId(userId);
    }

    @Override
    public List<Payment> getPaymentsByEventId(Long eventId) {
        return paymentRepository.findByEventId(eventId);
    }

    @Override
    public Order createRazorpayOrder(int amount) throws Exception {
        RazorpayClient razorpay = new RazorpayClient(razorpayKeyId, razorpayKeySecret);

        JSONObject orderRequest = new JSONObject();
        orderRequest.put("amount", amount * 100); // Convert to paise
        orderRequest.put("currency", "INR");
        orderRequest.put("receipt", "txn_" + System.currentTimeMillis());
        orderRequest.put("payment_capture", 1); // Auto-capture payment

        return razorpay.orders.create(orderRequest);
    }



    @Override
    public boolean verifyPayment(String paymentId, String razorpaySignature) {
        try {
            JSONObject paymentData = new JSONObject();
            paymentData.put("razorpay_payment_id", paymentId);
            paymentData.put("razorpay_signature", razorpaySignature);

            String secret = Objects.requireNonNull(razorpayKeySecret, "Razorpay Secret Key is missing!");
            Utils.verifyPaymentSignature(paymentData, secret);
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }

    
}
