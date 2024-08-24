/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.example.microservicioPeliculas.entity;

import jakarta.persistence.*;
import lombok.*;

/**
 * Entity
 * @author KEVIN
 */
@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
@ToString
@Table(name="user")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(name = "name", nullable = false, length = 50)
    private String name;
    @Column(name = "email", nullable = false, length = 50)
    private String email;
    @Column(name = "password", nullable = false)
    private String password;
    @Column(name = "idRol", nullable = false, length = 50)
    private Long idRol;

}
