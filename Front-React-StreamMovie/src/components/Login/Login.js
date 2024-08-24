import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import Alert from '../sweetAlert/sweetAlert';
import { Card, Button, Form } from 'react-bootstrap';
import './Login.css';

const API_URL = "https://backend-gateway-production.up.railway.app/api/auth"||'http://localhost:8083/api/auth';

async function loginUser(credentials) {
    //const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
  try {
    const response = await fetch(`${API_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
    //    'Accept': 'application/json',
      //  'X-CSRF-TOKEN': csrfToken,
      },
      body: JSON.stringify(credentials),

    });

    if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error(`Error ${response.status}: ${errorMessage}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Login failed:', error.message);
    throw error;
  }
}

export default function Login({ setUser }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await loginUser({ email, password });

      if (response) {
        const user = {
          token: response.token,
          name: response.user.name,
          idRol: response.user.idRol,
          email: response.user.email,
          id: response.user.id
        };
        console.log(user);

        setUser(user);
        localStorage.setItem('user', JSON.stringify(user));
        navigate('/Dashboard');
      } else {
        Alert({
          title: 'Credenciales incorrectas',
          text: 'El usuario o contraseña ingresado es incorrecto.',
          icon: 'warning',
          timer: 3000,
        });
      }
    } catch (error) {
      Alert({
        title: 'Error de autenticación',
        text: error.message,
        icon: 'error',
        timer: 3000,
      });
    }
  };

  return (
    <section className="vh-100">
    <meta name="csrf-token" content="${_csrf.token}"/>
      <div className="container-fluid h-custom custom-bg">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-md-3 col-lg-3 col-xl-5">
            <img src="../images/fondo7.gif" className="img-fluid" alt="Sample image" />
          </div>
          <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
            <Card className="shadow custom-carde">
              <Card.Body>
                <h1>Stream <img src="../images/fondo6.svg" alt="Sample image" height="80px" /> <strong>Movies</strong></h1>
                <Form onSubmit={handleSubmit}>
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
                  <div className="text-center text-lg-start mt-4 pt-2">
                    <center>  <p className="">¿No tienes una cuenta?, <a href="/Register" className="enlace">Registrate</a></p> </center>
                    <Button
                      type="submit"
                      className="btn btn-primary btn-lg"
                    >
                      Iniciar Sesión
                    </Button>
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

Login.propTypes = {
  setUser: PropTypes.func.isRequired
};
