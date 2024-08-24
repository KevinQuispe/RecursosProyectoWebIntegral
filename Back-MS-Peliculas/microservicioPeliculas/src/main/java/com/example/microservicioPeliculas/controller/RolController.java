package com.example.microservicioPeliculas.controller;
import com.example.microservicioPeliculas.entity.Rol;
import com.example.microservicioPeliculas.repository.RolRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

/**
 *
 * @author KEVIN
 */
@RestController
@RequestMapping("/api/rol")
public class RolController {
    
 @Autowired
 private RolRepository rolRepository;
 
   @GetMapping("/getAllRol")
   public ResponseEntity<List<Rol>> getAllRoles() {
        try {
            List<Rol> rolList = new ArrayList<>(rolRepository.findAll());
            if (rolList.isEmpty()) {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }
            return new ResponseEntity<>(rolList, HttpStatus.OK);
        } catch(Exception ex) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    @GetMapping("/getRolById/{id}")
    public ResponseEntity<Rol> getRolById(@PathVariable Long id) {
        Optional<Rol> userObj = rolRepository.findById(id);
        if (userObj.isPresent()) {
            return new ResponseEntity<>(userObj.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping("/createRol")
    public ResponseEntity<Rol> createRol(@RequestBody Rol rol) {
        try {
            Rol rolObject = rolRepository.save(rol);
            return new ResponseEntity<>(rolObject, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    
    @DeleteMapping("/deleteRolById/{id}")
    public ResponseEntity<HttpStatus> deleteRol(@PathVariable Long id) {
        Optional<Rol> existingProduct = rolRepository.findById(id);
        if(existingProduct.isPresent()){
            rolRepository.deleteById(id);
            return new ResponseEntity<>(HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @PostMapping("/updateRol/{id}")
    public ResponseEntity<Rol> updateRol(@PathVariable Long id, @RequestBody Rol rol) {
        try {
            Optional<Rol> rolData = rolRepository.findById(id);
            if (rolData.isPresent()) {
                Rol updateRolData = rolData.get();
                updateRolData.setId(rol.getId());
                updateRolData.setRol(rol.getRol());
                Rol rolObject = rolRepository.save(updateRolData);
                return new ResponseEntity<>(rolObject, HttpStatus.CREATED);
            }

            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
