package com.example.buscador.repository;

import java.util.List;

import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;
import org.springframework.stereotype.Repository;

import com.example.buscador.entity.Pelicula;

@Repository
public interface PeliculaRepository extends ElasticsearchRepository<Pelicula, Long> {
    
    List<Pelicula> findByTitleContaining(String title);
}
