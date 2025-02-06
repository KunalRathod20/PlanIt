package com.planit.controller;

import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.planit.model.Event;
import com.planit.model.Payment;
import com.planit.model.User;
import com.planit.repository.EventRepository;
import com.planit.repository.UserRepository;
import com.planit.service.PaymentService;
import com.razorpay.Order;

@RestController
@RequestMapping("/api/payments")
public class PaymentController {

    
    @Autowired
    private final PaymentService paymentService;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private EventRepository eventRepository;

    public PaymentController(PaymentService paymentService) {
        this.paymentService = paymentService;
    }

    @PostMapping("/process")
    public ResponseEntity<Payment> processPayment(@RequestBody Payment payment) {
        Payment savedPayment = paymentService.processPayment(payment);
        return ResponseEntity.ok(savedPayment);
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Payment>> getPaymentsByUser(@PathVariable Long userId) {
        return ResponseEntity.ok(paymentService.getPaymentsByUserId(userId));
    }

    @GetMapping("/event/{eventId}")
    public ResponseEntity<List<Payment>> getPaymentsByEvent(@PathVariable Long eventId) {
        return ResponseEntity.ok(paymentService.getPaymentsByEventId(eventId));
    }

    @PostMapping("/create-order")
    public ResponseEntity<Map<String, Object>> createOrder(@RequestBody Map<String, Object> requestData) {
        try {
            int amount = (int) requestData.get("amount");
            Order order = paymentService.createRazorpayOrder(amount);

            Map<String, Object> response = new HashMap<>();
            response.put("id", order.get("id"));
            response.put("amount", order.get("amount"));
            response.put("currency", order.get("currency"));

            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.status(500).body(Collections.singletonMap("error", e.getMessage()));
        }
    }

    @PostMapping("/verify")
    public ResponseEntity<Map<String, String>> verifyPayment(@RequestBody Map<String, String> paymentDetails) {
        try {
            // Extracting payment details from request body
            String paymentId = paymentDetails.get("paymentId");
            String razorpaySignature = paymentDetails.get("razorpaySignature");

            // Verify payment using the service
            boolean isVerified = paymentService.verifyPayment(paymentId, razorpaySignature);

            if (isVerified) {
                // Retrieve the additional data needed to store the payment
                Long userId = Long.parseLong(paymentDetails.get("userId"));
                Long eventId = Long.parseLong(paymentDetails.get("eventId"));
                double amount = Double.parseDouble(paymentDetails.get("amount"));

                // Fetch the user and event to associate with payment
                User user = userRepository.findById(userId)
                        .orElseThrow(() -> new RuntimeException("User not found"));
                Event event = eventRepository.findById(eventId)
                        .orElseThrow(() -> new RuntimeException("Event not found"));

                // Create and save payment record
                Payment payment = new Payment();
                payment.setAmount(amount);
                payment.setStatus("Completed");
                payment.setUser(user);
                payment.setEvent(event);

                paymentService.processPayment(payment); // Save payment to database

                // Return success response
                return ResponseEntity.ok(Collections.singletonMap("status", "Completed"));
            } else {
                // Return failure response if verification fails
                return ResponseEntity.status(400).body(Collections.singletonMap("status", "Failed"));
            }
        } catch (Exception e) {
            // Return error response in case of an exception
            return ResponseEntity.status(500).body(Collections.singletonMap("error", e.getMessage()));
        }
    }


}
