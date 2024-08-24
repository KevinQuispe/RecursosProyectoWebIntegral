import React, { useState,useEffect } from 'react';
import { Link } from 'react-router-dom';
import MovieCarousel from '../Carousel/Carousel';
import Footer from '../Footer/Footer';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import '../Tarjetas/MovieCard.css';
import { BsFillStarFill } from "react-icons/bs";
import { FaHome,FaInfoCircle,FaSearch, FaBook, FaPhone,FaUserAstronaut, FaPlay } from "react-icons/fa";
import Banner from '../Banner/Banner';
import { Card, Button } from 'react-bootstrap';
const Buscador = () => {
//const API_URL = process.env.REACT_APP_API_URL ||
const API_URL ="https://backend-gateway-production.up.railway.app/api/buscador/buscar"||'http://localhost:8083/api/buscador/buscar';
  const [searchTerm, setSearchTerm] = useState('');
  const [movies, setMovies] = useState([]);
  const [resultados, setResultados] = useState('');
  const navigate = useNavigate();

  const handleBuy = (id) => {
    navigate(`/movie/${id}`);
  };

  const handleSearch = async (event) => {
    const term = event.target.value;
    setResultados(term);
    setSearchTerm(term);

    if (term.trim() === '') {
      setMovies([]); // Limpia los resultados si no hay búsqueda
    } else {
      try {
        const response = await fetch(`${API_URL}?query=${term}`);
        const data = await response.json();
        setMovies(data); // Ajusta este paso según la estructura de tu respuesta
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    }
  };

  return (
    <div>
      <Navbar />
      <div className="container-fluid" style={{ background: "#F8F8F8" }}>
        <div className="row flex-nowrap">
          <form className="card card-sm">
            <div className="row">
              <Banner backgroundImage="/images/banner9.png" height="200px">
                <h1>Buscador</h1>
              </Banner>
              <div className="card-body row no-gutters align-items-center">
                <h3 style={{ color: "##087196" }}>Encuentra la pelicula que mejor se acople a ti ...</h3>
              </div>
              <div style={{ position: 'relative', display: 'inline-block' }}>
                <input type="text" class="form-control" value={searchTerm} onChange={handleSearch} placeholder="Buscar..." aria-label="Buscar" aria-describedby="basic-addon2" style={{ paddingLeft: '30px' }} />
                <span style={{ position: 'absolute', left: '20px', top: '40%', transform: 'translateY(-50%)', pointerEvents: 'none', }}><FaSearch /></span>
              </div>
              <div className="row">
                <div className="col-md-12 col-lg-12 col-xl-12 mt-3 mb-4">
                  <h4>  Resultados de:<strong>{resultados} </strong></h4>
                </div>
                {movies.map((movie) => (
                  <div className="col-md-2 col-lg-2 col-xl-2">
                    <div className="custom-card">
                      <Card>
                        <Card.Img variant="top" src={movie.image} alt={movie.title} height="210" onClick={() => handleBuy(movie.id)} />
                        <Card.Body>
                          <Card.Title>{movie.title}</Card.Title>
                          <Card.Text>
                            <div className="d-flex justify-content-between">$ {movie.price}          <span>  <BsFillStarFill className="icono" /> {movie.rating}</span></div>
                          </Card.Text>
                        </Card.Body>
                      </Card>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};
export default Buscador;
