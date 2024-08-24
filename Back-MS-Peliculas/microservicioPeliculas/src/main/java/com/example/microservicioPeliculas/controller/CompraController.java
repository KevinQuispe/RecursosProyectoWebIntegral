package com.example.microservicioPeliculas.controller;



import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.microservicioPeliculas.entity.Compra;
import com.example.microservicioPeliculas.service.CompraService;


/**
 *
 * @author KEVIN
 */
@RestController
@RequestMapping("/api/compras")
//@CrossOrigin(origins = "http://localhost:3000")
public class CompraController {

 @Autowired
 private CompraService compraService;

   @GetMapping("/getAllCompras")
  // @CrossOrigin(origins = "http://localhost:3000")
   public ResponseEntity<List<Compra>> getAllCompras() {
        try {
            List<Compra> compraList = new ArrayList<>(compraService.getAllCompras());
            if (compraList.isEmpty()) {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }
            return new ResponseEntity<>(compraList, HttpStatus.OK);
        } catch(Exception ex) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

   @PostMapping("/createCompra")
   //@CrossOrigin(origins = "http://localhost:3000")
   public ResponseEntity<Compra> createRol(@RequestBody Compra compra) {
       try {
           Compra compraObject = compraService.createCompra(compra);
           return new ResponseEntity<>(compraObject, HttpStatus.CREATED);
       } catch (Exception e) {
           return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
       }
   }

 

    @PostMapping("updateCompra/{id}")
    public ResponseEntity<Compra> updatePelicula(@PathVariable long id, @RequestBody Compra compra){
        Compra compraData = compraService.updateCompra(id, compra);
        return new ResponseEntity<>(compraData, HttpStatus.OK);
    }

    @GetMapping("/getCompraById/{id}")
    public ResponseEntity<Compra> getCompraById(@PathVariable Long id) {
        Optional<Compra> compra = compraService.getCompraById(id);
        if (compra.isPresent()) {
            return new ResponseEntity<>(compra.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/getComprasByUserId/{userId}")
//@CrossOrigin(origins = "http://localhost:3000")
public ResponseEntity<List<Compra>> getComprasByUserId(@PathVariable Long userId) {
    try {
        List<Compra> compraList = compraService.getComprasByUserId(userId);
        if (compraList.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(compraList, HttpStatus.OK);
    } catch(Exception ex) {
        return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
@DeleteMapping("/deleteCompra/{id}")
public ResponseEntity<Void> deleteCompra(@PathVariable int id) {
    try {
        boolean deleted = compraService.deleteCompraById(id);
        if (deleted) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT); // 204 No Content
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND); // 404 Not Found
        }
    } catch (Exception e) {
        return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR); // 500 Internal Server Error
    }
}

}
