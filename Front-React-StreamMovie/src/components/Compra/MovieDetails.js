import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import './MovieDetails.css';
import { BsFillStarFill } from "react-icons/bs";
import Footer from '../Footer/Footer';
import Flag from 'react-world-flags'
import CompraModal from './CompraModal';
const MovieDetails = () => {
  const API_URL ="https://backend-gateway-production.up.railway.app/api/peliculas"|| 'http://localhost:8082/api/peliculas' ;
//  const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080';
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const defaultImage = '/images/descarga2.jpg'; // Ruta de la imagen por defecto

  const handleImageError = (e) => {
    e.target.src = defaultImage;
  };

  useEffect(() => {
    const fetchMovie = async () => {
      const response = await fetch(`${API_URL}/getMovieById/${id}`);
      const data = await response.json();
      setMovie(data);
    };

    fetchMovie();
  }, [id]);

  if (!movie) {
    return <div>Loading...</div>;
  }

  const handleShowModal = () => setShowModal(true);
 const handleCloseModal = () => setShowModal(false);

  return (
    <div>
  <Navbar />
    <div className="container my-4">
    <div className="row">
      <div className="col-md-4">

        <img src={movie.image || defaultImage} className="img-fluid mt-4" alt={movie.title} />

        <button className="btn btn-primary" onClick={handleShowModal}>Comprar/Alquilar</button>

      </div>
      <div className="col-md-8">
        <h1 style={{color:"#0096C4"}}>{movie.title}</h1>

        <div className="d-flex justify-content-between">
          <span><strong>Fecha:</strong> 2024 {movie.duration} </span>


          <span><strong>Calificación: </strong>{movie.raiting}/5 <BsFillStarFill className="icono"/></span>
          <span>{movie.suitable}</span>
        </div>
        <p>{movie.description}</p>
        <h5>Idiomas disponibles:</h5>
  <ul>
    <li>
      {movie.idiomas.includes('Español') && (
        <>
          <Flag code="MEX" height="15" /> Español
        </>
      )}
    </li>
    <li>
      {movie.idiomas.includes('Ingles') && (
        <>
          <Flag code="USA" height="14" /> Inglés
        </>
      )}
    </li>
  </ul>
        {movie.youtubeUrl && (
    <div className="mt-4">
      <h5>Trailer</h5>
      <div className="embed-responsive embed-responsive-16by9">
        <iframe
          className="embed-responsive-item"
          src={`https://www.youtube.com/embed/${new URL(movie.youtubeUrl).searchParams.get('v')}`}
          allowFullScreen
          title="YouTube video player"
        ></iframe>
      </div>
    </div>
  )}
              <CompraModal show={showModal} handleClose={handleCloseModal} movie={movie} />
      </div>
    </div>
</div>
  <Footer />
</div>

  );
};

export default MovieDetails;
