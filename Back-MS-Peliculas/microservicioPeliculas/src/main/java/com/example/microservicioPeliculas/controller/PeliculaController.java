package com.example.microservicioPeliculas.controller;

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

import com.example.microservicioPeliculas.entity.Pelicula;
import com.example.microservicioPeliculas.service.PeliculaService;

@RestController
@RequestMapping("/api/peliculas")
//@CrossOrigin(origins = "http://localhost:3000")
public class PeliculaController {

    @Autowired
    private PeliculaService peliculaService;

    @GetMapping("/all")
    public ResponseEntity<List<Pelicula>> getAllPeliculas() {
        List<Pelicula> peliculas = peliculaService.getAllPeliculas();
        return new ResponseEntity<>(peliculas, HttpStatus.OK);
    }
    
    @PostMapping("/create")
    public ResponseEntity<Pelicula> createPelicula(@RequestBody Pelicula pelicula){        
        Pelicula peliculas = peliculaService.createPelicula(pelicula);
        return new ResponseEntity<>(peliculas, HttpStatus.OK);        
    }
    @DeleteMapping("/delete/{id}")
    public String deletePelicula(@PathVariable Long id){
        String peliculas = peliculaService.deletePelicula(id);
        return peliculas;         
    }

    @PostMapping("update/{id}")
    public ResponseEntity<Pelicula> updatePelicula(@PathVariable long id, @RequestBody Pelicula pelicula){
        Pelicula pelicula_ = peliculaService.updatePelicula(id, pelicula);
        return new ResponseEntity<>(pelicula_, HttpStatus.OK);
    }
    

    @GetMapping("/top5")
    public ResponseEntity<List<Pelicula>> getTop5Peliculas() {
        List<Pelicula> peliculas = peliculaService.getTop5Peliculas();
        return new ResponseEntity<>(peliculas, HttpStatus.OK);
    }

    @GetMapping("/getMovieById/{id}")
    public ResponseEntity<Pelicula> getPeliculaById(@PathVariable Long id) {
        Optional<Pelicula> pelicula = peliculaService.getPeliculaById(id);
        if (pelicula.isPresent()) {
            return new ResponseEntity<>(pelicula.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}
