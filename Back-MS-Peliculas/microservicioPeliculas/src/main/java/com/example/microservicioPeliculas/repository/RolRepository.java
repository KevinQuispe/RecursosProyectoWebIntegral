package com.example.microservicioPeliculas.repository;

import com.example.microservicioPeliculas.entity.Rol;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 *
 * @author KEVIN
 */
@Repository
public interface RolRepository extends JpaRepository<Rol, Long> {

}
