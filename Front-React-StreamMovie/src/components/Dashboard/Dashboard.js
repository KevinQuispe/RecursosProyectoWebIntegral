import React from 'react';
import { Link } from 'react-router-dom';
import MovieCarousel from '../Carousel/Carousel';
import MovieCard from '../Tarjetas/MovieCard';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import Banner from '../Banner/Banner';
const spacing = 2;

export default function Dashboard() {
  return (
    <div>
        <Navbar/>
        <div className="container-fluid" style={{background: "#F8F8F8"}}>

        <div className="row">
        <Banner backgroundImage="/images/fondo.jpg" height="300px">
               <h1>Bienvenido</h1>
               <p>Disfruta de nuestras mejores películas</p>
             </Banner>
          <div className="col-md-1 col-lg-1 col-xl-1 mt-5">
          </div>
         <div className="col-md-3 col-lg-3 col-xl-3 mt-5">
    <h2 classname="m-2 text-white">Los Mejores estrenos</h2>
  <p>  Las más vendidas y películas geniales</p>
         </div>


             <div className="col-md-12 col-lg-12 col-xl-12 mt-2">
<MovieCard apiEndpoint="/all"/>
</div>


<div className="col-md-1 col-lg-1 col-xl-1 mt-5">
</div>
 <div className="col-md-4 col-lg-4 col-xl-4 mt-5">
<h2 classname="m-4 text-white">TOP de peliculas en México</h2>
</div>
<div className="col-md-12 col-lg-12 col-xl-12">
<MovieCard apiEndpoint="/top5"/>
</div>

    </div>
    </div>
<Footer/>
    </div>


  );
}
