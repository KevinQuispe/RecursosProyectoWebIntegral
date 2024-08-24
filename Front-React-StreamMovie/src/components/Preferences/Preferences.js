import React, { useState, useEffect } from 'react';
import CompraCard from '../Compra/cardCompra';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import Banner from '../Banner/Banner';
import { useNavigate } from 'react-router-dom';


const user = JSON.parse(localStorage.getItem('user'));
export default function Preferences() {
  console.log(user);
  return(
    <div>
        <Navbar/>
        <div className="container-fluid" style={{background: "#F8F8F8"}}>
        <div className="row">
          <div className="col-md-12 col-lg-12 col-xl-12">
          <Banner backgroundImage="/images/banner6.gif" height="220px">
                 <h1>Mis Compras</h1>
                 <p>Disfruta de tus peliculas cuando tu quieras</p>
               </Banner>
          </div>
         <div className="col-md-3 col-lg-3 col-xl-3 mt-5">


         </div>
          <div className="col-md-12 col-lg-12 col-xl-12 mt-2">
          <CompraCard apiEndpoint={`/getComprasByUserId/${user.id}`}/>
          </div>

        </div>
        </div>
      <Footer/>
        </div>


  );
}
