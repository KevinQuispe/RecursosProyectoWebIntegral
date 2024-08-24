package com.example.microservicioPeliculas.repository;


import com.example.microservicioPeliculas.entity.Pelicula;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PeliculaRepository extends JpaRepository<Pelicula, Long> {
    List<Pelicula> findTop5ByOrderByRatingDesc();
}
