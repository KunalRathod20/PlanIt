package com.planit.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.planit.model.Payment;

@Repository
public interface PaymentRepository extends JpaRepository<Payment, Long> {
    List<Payment> findByUserId(Long userId);
    List<Payment> findByEventId(Long eventId);
    void deleteByEventId(Long eventId);

    // Get total revenue (without using payment.date)
    @Query("SELECT SUM(p.amount) FROM Payment p")
    Double getTotalRevenue();
}
