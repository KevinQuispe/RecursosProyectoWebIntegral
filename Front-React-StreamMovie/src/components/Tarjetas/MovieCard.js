import React, { useState, useEffect } from 'react';
import { Card, Button } from 'react-bootstrap';
import './MovieCard.css';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { BsFillStarFill } from "react-icons/bs";
import { useNavigate } from 'react-router-dom';
import Flag from 'react-world-flags'
const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 1024 },
    items: 5,
    partialVisibilityGutter: 10
  },
  desktop: {
    breakpoint: { max: 1024, min: 768 },
    items: 4,
    partialVisibilityGutter: 10
  },
  tablet: {
    breakpoint: { max: 768, min: 464 },
    items: 2,
    partialVisibilityGutter: 10
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    partialVisibilityGutter: 10
  }
};
const API_URL ="https://backend-gateway-production.up.railway.app/api/peliculas"|| 'http://localhost:8083/api/peliculas' ;

//const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080';
const MovieCards = ({ apiEndpoint }) => {
  const defaultImage = '/images/descarga2.jpg'; // Ruta de la imagen por defecto

  const handleImageError = (e) => {
    e.target.src = defaultImage;
  };
  const [movies, setMovies] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
  const fetchMovies = async () => {
    const response = await fetch(`${API_URL}${apiEndpoint}`);
    const data = await response.json();
    setMovies(data);
  };

  fetchMovies();
}, [apiEndpoint]);

const handleBuy = (id) => {
  navigate(`/movie/${id}`);
};
  return (
    <div className="container">
      <div className="row">
        <Carousel
          responsive={responsive}
          autoPlay={true}
          swipeable={true}
          draggable={true}
          showDots={true}
          infinite={true}
          partialVisible={false}
        >
          {movies.map((movie, index) => (
            <div key={index} className="custom-card">
              <Card>

                <Card.Img variant="top" src={movie.image || defaultImage} alt={movie.title} onError={handleImageError} onClick={() => handleBuy(movie.id)}/>
                <Card.Body>
                  <Card.Title> <div className="">{movie.title} </div> </Card.Title>
                  <Card.Text>    <div className="d-flex justify-content-between">$ {movie.price}     <Flag code="mex" height="15" />   <Flag code="usa" height="14" />           <span>  <BsFillStarFill className="icono"/> {movie.raiting}</span>
                 </div>  </Card.Text>

                </Card.Body>
              </Card>
            </div>
          ))}
        </Carousel>
      </div>
    </div>
  );
};

export default MovieCards;
