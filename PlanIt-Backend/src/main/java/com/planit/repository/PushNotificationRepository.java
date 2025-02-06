package com.planit.repository;

import com.planit.model.PushNotification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PushNotificationRepository extends JpaRepository<PushNotification, Long> {
    // Custom queries, if needed, can be added here
}
