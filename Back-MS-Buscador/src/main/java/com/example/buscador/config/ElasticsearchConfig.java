package com.example.buscador.config;

import org.apache.http.HttpHost;
import org.apache.http.auth.AuthScope;
import org.apache.http.auth.UsernamePasswordCredentials;
import org.apache.http.impl.client.BasicCredentialsProvider;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.elasticsearch.client.RestClient;
import org.elasticsearch.client.RestClientBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import co.elastic.clients.elasticsearch.ElasticsearchClient;
import co.elastic.clients.json.jackson.JacksonJsonpMapper;
import co.elastic.clients.transport.ElasticsearchTransport;
import co.elastic.clients.transport.rest_client.RestClientTransport;

@Configuration
public class ElasticsearchConfig {

    @Bean
    public ElasticsearchClient elasticsearchClient() {
        // Configurar las credenciales básicas
        BasicCredentialsProvider credentialsProvider = new BasicCredentialsProvider();
        credentialsProvider.setCredentials(
                AuthScope.ANY,
                new UsernamePasswordCredentials("elastic", "fswcwlh7pqz8bfaar37d2362wq2lrkv9s"));


        // Configurar el cliente HTTP con autenticación
        CloseableHttpClient httpClient = HttpClients.custom()
                .setDefaultCredentialsProvider(credentialsProvider)
                .build();

        // Configurar el RestClientBuilder con autenticación
        String esHost = System.getenv("ELASTICSEARCH_HOST"); 
        System.err.println("Conectando a elastic....");
        RestClientBuilder builder = RestClient.builder(
                HttpHost.create("https://elasticsearch-production-7b9e.up.railway.app")
            ).setHttpClientConfigCallback(httpClientBuilder -> 
                httpClientBuilder.setDefaultCredentialsProvider(credentialsProvider)
            );
            

        // Configurar el transporte y el cliente de Elasticsearch
        ElasticsearchTransport transport = new RestClientTransport(
                builder.build(), new JacksonJsonpMapper());
        return new ElasticsearchClient(transport);
    }
}
