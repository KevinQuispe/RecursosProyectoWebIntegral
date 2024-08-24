package com.example.buscador.controller;

import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.buscador.entity.Pelicula;
import com.example.buscador.service.PeliculaService;

@RestController
@RequestMapping("/api/buscador")
public class PeliculaController {

    private final PeliculaService peliculaService;

    @Autowired
    public PeliculaController(PeliculaService peliculaService) {
        this.peliculaService = peliculaService;
    }

    @GetMapping("/buscar")

    public List<Pelicula> buscar(@RequestParam String query) throws IOException {
        return peliculaService.buscarConFacetas(query);
    }

    @GetMapping("/buscarCamposMultiples")
  
    public List<Pelicula> buscarPorCamposMultiples(@RequestParam String query) throws IOException {
        return peliculaService.buscarPorCamposMultiples(query);
    }
}
