import React from 'react';
import { Carousel } from 'react-bootstrap';


const MovieCarousel = () => {
  return (
    <Carousel style={{ maxWidth: '100%', margin: 'auto' }}>
      <Carousel.Item>
        <img
          className="d-block w-100 mx-auto"

          alt="First slide"
        />
        <Carousel.Caption>
          <h3>StreamMovies</h3>
          <p>Encuentra la pelicula que estabas buscando</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100 mx-auto"

          alt="Second slide"
        />
        <Carousel.Caption>
          <h3>Segunda película</h3>
          <p>Descripción de la segunda película</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100 mx-auto"
  
          alt="Third slide"
        />
        <Carousel.Caption>
          <h3>Tercera película</h3>
          <p>Descripción de la tercera película</p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
};

export default MovieCarousel;
