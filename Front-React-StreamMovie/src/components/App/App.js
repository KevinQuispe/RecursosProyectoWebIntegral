import React from 'react';
import { useEffect, useState } from 'react'
import {  Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Dashboard from '../Dashboard/Dashboard';
import Login from '../Login/Login';
import Register from '../Register/Register';
import Buscador from '../Buscador/Buscador';
import UsuariosAdmins from '../Usuarios/UserCatalog';
import MovieDetails from '../Compra/MovieDetails'
import ComprasAdmin from '../ComprasCatalog/ComprasCatalog'
//import useToken from './useToken';
import Logout from '../Logout/Logout';

import Preferences from '../Preferences/Preferences';

import PeliculaCatalog from '../Peliculas/CatalogoPeliculas';

function setUserSession(user) {
  sessionStorage.setItem('user', JSON.stringify(user));
}

function getUserSession() {
  const userString = sessionStorage.getItem('user');
  const user = JSON.parse(userString);
  return user;
}

const handleLogout = () => {
  setUserSession(null);
  sessionStorage.removeItem('user');
};

function App() {
  const [user, setUser] = useState(getUserSession());

  useEffect(() => {
    if (user) {
      setUserSession(user);
    }
  }, [user]);



  return (
    <div className="wrapper">




          <Routes>
                  {/* Public Routes */}
                  <Route path="/auth" element={<Login setUser={setUser} />} />
                  <Route path="/register" element={<Register setUser={setUser} />} />

                  {/* Protected Routes */}
                  <Route path="/" element={user && user.token ? <Dashboard /> : <Navigate to="/auth" />} />
                  <Route path="/logout" element={<Logout onLogout={handleLogout} />} />
                  <Route path="/compras" element={user && user.token ? <Preferences /> : <Navigate to="/auth" />} />
                  <Route path="/buscador" element={user && user.token ? <Buscador /> : <Navigate to="/auth" />} />
                  <Route path="/peliculas" element={user && user.token ? <PeliculaCatalog /> : <Navigate to="/auth" />} />
                  <Route path="/ComprasAdmin" element={user && user.token ? <ComprasAdmin /> : <Navigate to="/auth" />} />
                  <Route path="/UsersAdmin" element={user && user.token ? <UsuariosAdmins /> : <Navigate to="/auth" />} />
                  <Route path="/movie/:id" element={user && user.token ? <MovieDetails /> : <Navigate to="/auth" />} />
                  <Route path="*" element={<Navigate to="/" />} />
                </Routes>

      </div>
  );
}

export default App;
