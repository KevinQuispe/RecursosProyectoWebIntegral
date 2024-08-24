package com.example.microservicioPeliculas.controller;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.microservicioPeliculas.entity.User;
import com.example.microservicioPeliculas.repository.UserRepository;
import com.example.microservicioPeliculas.service.UserService;

/**
 *
 * @author KEVIN
 */
@RestController
@RequestMapping("/api/user")

public class UserController {
    
 @Autowired
 private UserRepository userRepository;
 @Autowired
 private UserService userService;
 @Autowired
 private PasswordEncoder passwordEncoder;

    public User getUserByUsername(String username) {
        return userRepository.findByEmail(username)
                .orElseThrow(() -> new UsernameNotFoundException("User Not Found with username: " + username));
    }

 
   @GetMapping("/getAllUsers")
   public ResponseEntity<List<User>> getAllUser() {
        try {
            List<User> userList = new ArrayList<>(userRepository.findAll());
            if (userList.isEmpty()) {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }
            return new ResponseEntity<>(userList, HttpStatus.OK);
        } catch(Exception ex) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/createUser")
    public ResponseEntity<User> createUser(@RequestBody User user) {
        try {
            user.setPassword(passwordEncoder.encode(user.getPassword()));
            User userObject = userRepository.save(user);
            return new ResponseEntity<>(userObject, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    //uso del service
    @GetMapping("/getUserById/{id}")
    public ResponseEntity<User> getUserById(@PathVariable Long id) {
        Optional<User> userObj = userService.getUserById(id);
        if (userObj.isPresent()) {
            return new ResponseEntity<>(userObj.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
    
    @DeleteMapping("/deleteUserById/{id}")
   
    public ResponseEntity<HttpStatus> deleteUser(@PathVariable Long id) {
        Optional<User> existingProduct = userRepository.findById(id);
        if(existingProduct.isPresent()){
            userRepository.deleteById(id);
            return new ResponseEntity<>(HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
    }
   
    @PostMapping("/updateUser/{id}")

    public ResponseEntity<User> updateUser(@PathVariable Long id, @RequestBody User user) {
        try {
            Optional<User> userData = userRepository.findById(id);
            if (userData.isPresent()) {
                User updateUserData = userData.get();
                updateUserData.setName(user.getName());
                updateUserData.setEmail(user.getEmail());
                updateUserData.setPassword(user.getPassword());
                User userObject = userRepository.save(updateUserData);
                return new ResponseEntity<>(userObject, HttpStatus.CREATED);
            }

            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
