package com.planit.service;

public interface PushNotificationService {

    String sendNotification(String token, String title, String body) throws Exception;
}
