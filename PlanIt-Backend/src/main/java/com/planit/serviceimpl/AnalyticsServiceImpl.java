package com.planit.serviceimpl;

import com.planit.service.AnalyticsService;
import com.planit.repository.UserRepository;
import com.planit.repository.EventRepository;
import com.planit.repository.PaymentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.HashMap;
import java.util.Map;

@Service
public class AnalyticsServiceImpl implements AnalyticsService {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private EventRepository eventRepository;

    @Autowired
    private PaymentRepository paymentRepository;

    @Override
    public Map<String, Object> getPlatformAnalytics() {
        Map<String, Object> data = new HashMap<>();

        data.put("totalUsers", userRepository.getTotalUsers()); // Total users
        data.put("totalEvents", eventRepository.count()); // Total events
        data.put("totalPayments", paymentRepository.getTotalRevenue()); // Total revenue

        data.put("eventTrends", eventRepository.getEventTrends()); // Event trends

        return data;
    }
}
