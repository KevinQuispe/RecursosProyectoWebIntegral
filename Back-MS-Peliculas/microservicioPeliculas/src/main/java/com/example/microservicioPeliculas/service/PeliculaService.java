package com.example.microservicioPeliculas.service;

import com.example.microservicioPeliculas.entity.Pelicula;
import com.example.microservicioPeliculas.repository.PeliculaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PeliculaService {
    @Autowired
    private PeliculaRepository peliculaRepository;

    public List<Pelicula> getAllPeliculas() {
        return peliculaRepository.findAll();
    }

    public Pelicula createPelicula(Pelicula pelicula) {
        return peliculaRepository.save(pelicula);
    }

    public List<Pelicula> getTop5Peliculas() {
        return peliculaRepository.findTop5ByOrderByRatingDesc();
    }

    public Optional<Pelicula> getPeliculaById(Long id) {
        return peliculaRepository.findById(id);
    }
    public String deletePelicula(Long id){
       // peliculaRepository.deleteById(id);   
        Optional<Pelicula> existingProduct = peliculaRepository.findById(id);     
        if(existingProduct.isPresent()){
            peliculaRepository.deleteById(id);
            return "success";
        }
        return "not found";
    }

    public Pelicula updatePelicula(Long id, Pelicula pelicula){
        Optional<Pelicula> peliculasData = peliculaRepository.findById(id);       
            Pelicula updatePeliculaData = peliculasData.get();
            updatePeliculaData.setDescription(pelicula.getDescription());
            updatePeliculaData.setIdiomas(pelicula.getIdiomas());
            updatePeliculaData.setImage(pelicula.getImage());
            updatePeliculaData.setPrice(pelicula.getPrice());
            updatePeliculaData.setRating(pelicula.getRating());
            updatePeliculaData.setTitle(pelicula.getTitle());
            updatePeliculaData.setYoutubeUrl(pelicula.getYoutubeUrl());
            Pelicula PeliculaObject = peliculaRepository.save(updatePeliculaData);
            return PeliculaObject;        
        
    }
}
