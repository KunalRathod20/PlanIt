package com.planit.service;
import java.util.List;
import java.util.Optional;

import com.planit.model.User;

// User Service Interface
public interface UserService {
    User createUser(User user);
    User getUserById(Long id);
    Optional<User> getUserByEmail(String email);
    List<User> getAllUsers();
    void deleteUser(Long id);
}