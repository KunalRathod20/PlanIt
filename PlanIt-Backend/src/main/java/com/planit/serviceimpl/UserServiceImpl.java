package com.planit.serviceimpl;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.planit.exception.ResourceNotFoundException;
import com.planit.model.User;
import com.planit.repository.UserRepository;
import com.planit.service.UserService;

//User Service Implementation
@Service
public class UserServiceImpl implements UserService {
 @Autowired
 private UserRepository userRepository;
 
 @Autowired
 private PasswordEncoder passwordEncoder;

 @Override
 public User createUser(User user) {

     String encodedPassword = passwordEncoder.encode(user.getPassword());
     user.setPassword(encodedPassword);
     return userRepository.save(user);
 }

 @Override
 public User getUserById(Long id) {
     return userRepository.findById(id)
             .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + id));
 }

 @Override
 public Optional<User> getUserByEmail(String email) {
     return userRepository.findByEmail(email);
 }

 @Override
 public List<User> getAllUsers() {
     return userRepository.findAll();
 }

 @Override
 public void deleteUser(Long id) {
     User user = getUserById(id);
     userRepository.delete(user);
 }
}

