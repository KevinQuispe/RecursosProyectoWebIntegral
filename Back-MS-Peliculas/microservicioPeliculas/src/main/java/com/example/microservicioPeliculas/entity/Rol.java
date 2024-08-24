package com.example.microservicioPeliculas.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.List;


@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
@ToString
@Table(name="rol")
public class Rol {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(name = "idRol", nullable = false, length = 1)
    private Long IdRol;
    @Column(name = "rol", nullable = false, length = 50)
    private String rol;
}
