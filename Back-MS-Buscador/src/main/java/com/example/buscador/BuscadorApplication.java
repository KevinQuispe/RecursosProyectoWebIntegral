package com.example.buscador;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.data.elasticsearch.repository.config.EnableElasticsearchRepositories;

@SpringBootApplication
@EnableDiscoveryClient  
@EnableElasticsearchRepositories(basePackages = "com.example.buscador.repository")
public class BuscadorApplication {

    public static void main(String[] args) {
        SpringApplication.run(BuscadorApplication.class, args);
    }

}
