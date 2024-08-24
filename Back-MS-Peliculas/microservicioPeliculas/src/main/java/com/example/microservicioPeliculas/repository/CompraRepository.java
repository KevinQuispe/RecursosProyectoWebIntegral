package com.example.microservicioPeliculas.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.microservicioPeliculas.entity.Compra;

/**
 *
 * @author KEVIN
 */
@Repository
public interface CompraRepository extends JpaRepository<Compra, Long> {
    List<Compra> findByUsuarioId(Long userId);
}
