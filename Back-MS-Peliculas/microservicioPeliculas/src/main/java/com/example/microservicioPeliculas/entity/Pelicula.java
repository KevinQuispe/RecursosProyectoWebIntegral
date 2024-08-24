package com.example.microservicioPeliculas.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
@ToString
@Table(name="pelicula")
public class Pelicula {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column
    private String title;
    @Column(name = "description", length = 2000)
    private String description;
    @Column
    private String image;
    @Column
    private double price;
    @Column
    private double rating;
    @Column
    private String idiomas;
    @Column
    private String youtubeUrl;

}
