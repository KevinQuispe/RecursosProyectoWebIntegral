import React from 'react';
import { Navbar, Nav, Form, FormControl, Button, Container, Row, Col, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
const SidebarNavbar = () => {
    return (


              <div className="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-dark">
                  <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
                      <a href="/" className="d-flex align-items-center pb-3 mb-md-0 me-md-auto text-white text-decoration-none">
                          <span className="fs-5 d-none d-sm-inline">StreamMovies</span>
                      </a>
                      <ul className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start" id="menu">
                      <li className="nav-item">
                          <a href="#" className="nav-link align-middle px-0">
                            <Link to="/dashboard">
                              <i className="fs-4 bi-house"></i> <span className="ms-1 d-none d-sm-inline">Inicio</span></Link>
                          </a>
                      </li>
                          <li className="nav-item">
                              <a href="#" className="nav-link align-middle px-0">
                                  <i className="fs-4 bi-house"></i> <span className="ms-1 d-none d-sm-inline">Buscador</span>
                              </a>
                          </li>
                          <li className="nav-item">
                              <a href="#" className="nav-link align-middle px-0">
                                  <Link to="/logout">
                                  <i className="fs-4 bi-house"></i> <span className="ms-1 d-none d-sm-inline">Cerrar Sesión</span></Link>
                              </a>
                          </li>


                      </ul>
                      <hr />
                      <div className="dropdown pb-4">
                          <a href="#" className="d-flex align-items-center text-white text-decoration-none dropdown-toggle" id="dropdownUser1" data-bs-toggle="dropdown" aria-expanded="false">
                              <img src="https://github.com/mdo.png" alt="hugenerd" width="30" height="30" className="rounded-circle" />
                              <span className="d-none d-sm-inline mx-1">loser</span>
                          </a>
                          <ul className="dropdown-menu dropdown-menu-dark text-small shadow">
                            
                              <li>
                                  <hr className="dropdown-divider" />
                              </li>
                              <li><a className="dropdown-item" href="#">Cerrar Sesión</a></li>
                          </ul>
                      </div>
                  </div>
              </div>


    );
};

export default SidebarNavbar;
