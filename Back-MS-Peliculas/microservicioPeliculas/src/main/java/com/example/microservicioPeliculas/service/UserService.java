package com.example.microservicioPeliculas.service;

import com.example.microservicioPeliculas.entity.User;
import com.example.microservicioPeliculas.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    public Optional<User> getUserById(Long id) {
        return userRepository.findById(id);
    }
}
