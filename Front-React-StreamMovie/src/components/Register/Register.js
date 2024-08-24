import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import Alert from '../sweetAlert/sweetAlert';
import { Card, Button, Form } from 'react-bootstrap';
import '../Login/Login.css';
//const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080' || 'http://localhost:8080' ;
const API_URL = "https://backend-gateway-production.up.railway.app/api/user" || 'http://localhost:8082/api/user' ;

async function loginUser(credentials) {
  return fetch(`${API_URL}/createUser`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(credentials)
  })
    .then(data => data.json());
}

function Register({ setUser }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');

  const handleSubmit = async e => {
    e.preventDefault();

    if (!name || !email || !password || !confirmPassword) {
      Alert({
        title: 'Campos incompletos',
        text: 'Por favor, complete todos los campos.',
        icon: 'warning',
        timer: 3000,
      });
      return;
    }

    // Validar que las contraseñas coincidan
    if (password !== confirmPassword) {
      Alert({
        title: 'Contraseñas no coinciden',
        text: 'Las contraseñas no coinciden. Por favor, verifíquelas.',
        icon: 'warning',
        timer: 3000,
      });
      return;
    }
    const response = await loginUser({
      email,
      password,
      name,
      idRol:2,

    });
    if (response) {
      Alert({
      title: 'Usuario Registrado',
      text: 'El usuario se ha registrado con éxito, Solo resta iniciar sesión.',
      icon: 'success',
      timer: 3000,
      });

      console.log("Registrado con Éxito");
      navigate('/auth');
    } else {
      Alert({
        title: 'Error al registrar',
        text: 'Se presentó un error al intentar registrar al usuario.',
        icon: 'warning',
        timer: 3000,
      });
    }
  };

  return (
    <section className="vh-100">
      <div className="container-fluid h-custom custom-bg">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-md-3 col-lg-3 col-xl-5">
            <img
              src="../images/fondo5.gif"
              className="img-fluid"
              alt="Sample image"
            />
          </div>
          <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
            <Card className="shadow custom-carde">
              <Card.Body>
                <h1 style={{ color: "#0096C4" }}>Stream <img
                  src="../images/fondo6.svg"
                  className=""
                  alt="Sample image"
                  height="80px"
                /> <strong style={{ color: "Dark-blue" }}>Movies</strong></h1>
                <Form onSubmit={handleSubmit}>
                  <center><h2>Registrate</h2></center>
                  <Form.Group controlId="formUsername" className="mb-3">
                    <Form.Label>Nombre de Usuario</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Nombre de Usuario"
                      onChange={e => setName(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group controlId="formUsername" className="mb-3">
                    <Form.Label>Usuario</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Usuario"
                      onChange={e => setEmail(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group controlId="formPassword" className="mb-4">
                    <Form.Label>Contraseña</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Contraseña"
                      onChange={e => setPassword(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group controlId="formPassword" className="mb-4">
                    <Form.Label>Confirmar Contraseña</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Contraseña"
                      onChange={e => setConfirmPassword(e.target.value)}
                    />
                  </Form.Group>
                  <div className="text-center text-lg-start">
                    <Button
                      type="submit"
                      className="btn btn-primary btn-lg"
                      style={{ paddingLeft: '2.5rem', paddingRight: '2.5rem', backgroundColor: "#0096C4" }}
                    >
                      Registrate
                    </Button>
                    <br/>
                    <center><p>¿Ya tienes una cuenta?, <a href="/login" className="enlace">Inicia sesión</a></p></center>
                  </div>
                </Form>
              </Card.Body>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Register;
