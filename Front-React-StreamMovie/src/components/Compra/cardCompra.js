import React, { useState, useEffect } from 'react';
import { Card, Button } from 'react-bootstrap';
import './CardCompra.css';
import { BsFillStarFill } from "react-icons/bs";
import { useNavigate } from 'react-router-dom';
import Flag from 'react-world-flags'
const API_URL ="https://backend-gateway-production.up.railway.app/api/compras" || 'http://localhost:8082/api/compras';

//const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080';


const CompraCard = ({ apiEndpoint }) => {
  const [movies, setMovies] = useState([]);
  const navigate = useNavigate();
  const defaultImage = '/images/descarga2.jpg';
  useEffect(() => {
  const fetchMovies = async () => {
    const response = await fetch(`${API_URL}${apiEndpoint}`);
    if (response.status === 204) { // Si el estado es 204, no hay contenido.
     setMovies([]); // Asigna un array vacío a movies.
   } else {
     const data = await response.json();
     setMovies(data);
   }
  };

  fetchMovies();
}, [apiEndpoint]);

return (
  <div className="container">
      <div className="row">
        {movies.length > 0 ? (
          movies.map((movie, index) => (
            <div key={index} className="col-md-3 col-lg-3 col-xl-3 ">
              <div className="custom-card">
                <Card>
                  <Card.Img
                    variant="top"
                    className="img-fluid rounded-start"
                    src={movie.pelicula.image || defaultImage}
                    alt={movie.pelicula.title}
                  />
                  <Card.Body>
                    <Card.Title>
                      <div className="">{movie.pelicula.title}</div>
                    </Card.Title>
                    <Card.Text>
                      <div className="d-flex justify-content-between">
                        <span>{movie.nombre}</span>
                        <span>Total: ${movie.total.toFixed(2)}</span>
                      </div>
                    </Card.Text>
                  </Card.Body>
                </Card>
              </div>
            </div>
          ))
        ) : (
          <div className="col-12">
          <center>
            <p><strong>No haz hecho compras aún</strong></p>
            <img
              src="../images/resultados.svg"

              height="200"
              alt="Sample image"
            />
            </center>
          </div>
        )}
      </div>
    </div>
  );
};
export default CompraCard;
