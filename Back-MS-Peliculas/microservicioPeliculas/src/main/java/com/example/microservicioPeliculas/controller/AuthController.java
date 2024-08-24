package com.example.microservicioPeliculas.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.microservicioPeliculas.entity.User;
import com.example.microservicioPeliculas.repository.UserRepository;
import com.example.microservicioPeliculas.security.JwtUtils;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JwtUtils jwtUtils;

    @Autowired
    private PasswordEncoder passwordEncoder;
    

    @PostMapping("/login")
    
    public ResponseEntity<?> loginUser(@RequestBody User loginRequest) {
        // Busca al usuario por su correo electrónico
        User user = userRepository.findByEmail(loginRequest.getEmail())
                                   .orElseThrow(() -> new UsernameNotFoundException("Invalid email or password"));
    
        // Verifica si la contraseña proporcionada coincide con la almacenada
        if (!passwordEncoder.matches(loginRequest.getPassword(), user.getPassword())) {
            return new ResponseEntity<>("Invalid email or password", HttpStatus.BAD_REQUEST);
        }
        String token = jwtUtils.generateToken(user.getEmail());
        System.out.println(token+"           "+user);
        

    // Crea una respuesta que contenga el token y la información del usuario
    LoginResponse loginResponse = new LoginResponse(token, user);

    return new ResponseEntity<>(loginResponse, HttpStatus.OK);
    }
    public static class LoginResponse {
        private String token;
        private User user;

        public LoginResponse(String token, User user) {
            this.token = token;
            this.user = user;
        }
        public String getToken() {
            return token;
        }
   
        public User getUser() {
            return user;
        }

       
    }
}
