package com.example.buscador.service;

import java.io.IOException;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.buscador.entity.Pelicula;
import com.fasterxml.jackson.databind.ObjectMapper;

import co.elastic.clients.elasticsearch.ElasticsearchClient;
import co.elastic.clients.elasticsearch._types.aggregations.AggregationRange;
import co.elastic.clients.elasticsearch.core.SearchRequest;
import co.elastic.clients.elasticsearch.core.SearchResponse;
import co.elastic.clients.elasticsearch.core.search.Hit;


@Service
public class PeliculaService {

    private final ElasticsearchClient client;
    private final ObjectMapper objectMapper;

    @Autowired
    public PeliculaService(ElasticsearchClient client, ObjectMapper objectMapper) {
        this.client = client;
        this.objectMapper = objectMapper;
    }

    public List<Pelicula> buscarConFacetas(String query) throws IOException {
        SearchRequest searchRequest = SearchRequest.of(s -> s
            .index("peliculas")
            .query(q -> q
                .multiMatch(m -> m
                    .query(query)
                    .fields("title", "description", "idiomas")
                   // .fuzziness("AUTO") 
                    .type(co.elastic.clients.elasticsearch._types.query_dsl.TextQueryType.PhrasePrefix)  
                )
            )
            .aggregations("por_idioma", a -> a
                .terms(t -> t
                    .field("idiomas.keyword")
                )
            )
            .aggregations("por_rating", a -> a
                .range(r -> r
                    .field("rating")
                    .ranges(
                        AggregationRange.of(ar -> ar.to("3.0")),
                        AggregationRange.of(ar -> ar.from("3.0").to("4.0")),
                        AggregationRange.of(ar -> ar.from("4.0"))
                    )
                )
            )
        );

        SearchResponse<Pelicula> searchResponse = client.search(searchRequest, Pelicula.class);

        return searchResponse.hits().hits()
            .stream()
            .map(Hit::source)
            .collect(Collectors.toList());
    }
  
    public List<Pelicula> buscarPorCamposMultiples(String query) throws IOException {
        SearchRequest searchRequest = SearchRequest.of(s -> s
            .index("peliculas")
            .query(q -> q
                .multiMatch(m -> m
                    .query(query)
                    .fields("title", "description", "idiomas")
                  //  .fuzziness("AUTO")
                    .type(co.elastic.clients.elasticsearch._types.query_dsl.TextQueryType.PhrasePrefix)
                    
                )
            )
        );

        SearchResponse<Pelicula> searchResponse = client.search(searchRequest, Pelicula.class);

        return searchResponse.hits().hits()
            .stream()
            .map(Hit::source)
            .collect(Collectors.toList());
    }
}
