package com.example.microservicioPeliculas.entity;


import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;


@Entity
@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
@ToString
@Table(name="compra")
public class Compra {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    @Column(name = "nombre", length = 50)
    private String nombre;
    @Column(name = "numTarjeta", length = 50)
    private String numTarjeta;
    @Column(name = "cvv", length = 3)

    private int cvv;
    @Column(name = "fechaVencimiento", length = 5)
    private String fechaVencimiento;

    @Column(name = "total", length = 50)
    private float total;
    @ManyToOne
    @JoinColumn(name = "idMovie", referencedColumnName = "id")
    private Pelicula pelicula;
    @ManyToOne
    @JoinColumn(name = "idUser", referencedColumnName = "id")
    private User usuario;

}
