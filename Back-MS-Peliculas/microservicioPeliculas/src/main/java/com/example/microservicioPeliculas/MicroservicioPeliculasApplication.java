package com.example.microservicioPeliculas;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;

@SpringBootApplication
@EnableDiscoveryClient
public class MicroservicioPeliculasApplication {

	public static void main(String[] args) {
		SpringApplication.run(MicroservicioPeliculasApplication.class, args);
	}

}
