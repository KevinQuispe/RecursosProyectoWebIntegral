package com.example.buscador.entity;

import org.springframework.data.annotation.Id;
import org.springframework.data.elasticsearch.annotations.Document;
import org.springframework.data.elasticsearch.annotations.Field;
import org.springframework.data.elasticsearch.annotations.FieldType;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
@ToString
@Document(indexName = "peliculas")
public class Pelicula {

    @Id
    private Long id;

    @Field(type = FieldType.Search_As_You_Type)
    private String title;
    
    @Field(type = FieldType.Text, analyzer = "english")
    private String description;
    
    @Field(type = FieldType.Text, searchAnalyzer = "standard", analyzer = "standard")
    private String idiomas;

    @Field(type = FieldType.Text)
    private String image;

    @Field(type = FieldType.Double)
    private double price;

    @Field(type = FieldType.Double)
    private double rating;

    @Field(type = FieldType.Text)
    @JsonProperty("youtube_url")
    private String youtubeUrl;

}
