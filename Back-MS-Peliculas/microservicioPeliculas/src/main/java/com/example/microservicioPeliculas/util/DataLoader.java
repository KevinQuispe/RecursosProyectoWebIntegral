package com.example.microservicioPeliculas.util;

import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import com.example.microservicioPeliculas.repository.RolRepository;
import com.example.microservicioPeliculas.repository.UserRepository;

@Component
public class DataLoader implements CommandLineRunner {

    private final UserRepository userRepository;
    private final RolRepository rolRepository;

    public DataLoader(UserRepository userRepository, RolRepository rolRepository) {
        this.userRepository = userRepository;
        this.rolRepository = rolRepository;
    }

    @Override
    public void run(String... args) throws Exception {
        // Load initial data into the database
        //user admin
       
    }
}
