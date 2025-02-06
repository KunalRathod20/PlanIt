package com.planit.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.razorpay.RazorpayClient;
import com.razorpay.RazorpayException;

@Configuration
public class RazorpayConfig {

    @Bean
    public RazorpayClient razorpayClient(
            @Value("${razorpay.key.id}") String key,
            @Value("${razorpay.secret.key}") String secret) throws RazorpayException {
        return new RazorpayClient(key, secret);
    }
}
