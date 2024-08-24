import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Modal, Button } from 'react-bootstrap';
import Alert from '../sweetAlert/sweetAlert';
const ComprasModal = ({ show, handleClose, movie }) => {
  const API_URL = "https://backend-gateway-production.up.railway.app/api/compras" || 'http://localhost:8082/api/compras';
//const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080';
 const [nombre, setNombre] = useState('');
 const [tarjeta, setTarjeta] = useState('');
 const [cvv, setCvv] = useState('');
 const [fechaVencimiento, setFechaVencimiento] = useState('');
 const navigate = useNavigate();
 const user = JSON.parse(localStorage.getItem('user'));
 const handlePagar = async () => {
   // Validar el formato de fecha de vencimiento MM/AA
   const regex = /^(0[1-9]|1[0-2])\/\d{2}$/;
   if (!regex.test(fechaVencimiento)) {
     Alert({
     title: 'Datos Erroneos',
     text: 'Formato de fecha de vencimiento inválido. Debe ser MM/AA.',
     icon: 'warning',
     timer: 3000,
     });

     return;
   }

 const venta = {
      nombre:nombre,
      numTarjeta:tarjeta,
      cvv:cvv,
      fechaVencimiento:fechaVencimiento,
      pelicula: {id: movie.id},
      total: movie.price,
      usuario:{id:user.id} ,
    };

    console.log(venta);

    try {
      const response = await fetch(`${API_URL}/createCompra`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(venta),
      });

      if (!response.ok) {
        throw new Error('Error al registrar la venta');
      }

      const data = await response.json();
    //  alert('Venta registrada con éxito');
      Alert({
      title: 'Venta Realizada con Exito',
      text: 'Ya cuentas con la pelicula '+movie.title+" para verla la veces que quieras",
      icon: 'success',
      timer: 3000,
      });

     navigate('/compras');
    handleClose();
    } catch (error) {
      console.error(error);
      Alert({
      title: 'Error en la venta',
      text: 'Se ha producido un error en la venta, intent más tarde.',
      icon: 'warning',
      timer: 3000,
      });

    }
  };

  const handleFechaVencimientoChange = (e) => {
    let input = e.target.value.replace(/\D/g, '');
    if (input.length > 2) {
      input = input.slice(0, 2) + '/' + input.slice(2, 4);
    }
    setFechaVencimiento(input);
    console.log(input);
  };

const handleNumeroTarjeta = (e) =>{
  let input = e.target.value.replace(/\D/g, '');
    if (input.length > 16) {
      input = input.slice(0, 16);
    }
    input = input.match(/.{1,4}/g)?.join(' ') || input;
    setTarjeta(input);
  };



  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{movie.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <div className="row">
      <div className="col-md-4">
        <img src={movie.image} alt={movie.title} style={{ width: '100%' }} />
        </div>
        <div className="col-md-7">
        <div className="row">
          <h5>Comprala por tan solo:</h5>
          <div className="col-md-6">
          <Button variant="primary">$ {movie.price}.00  HD</Button>
          </div>
          <form>
          <div className="col-md-12">
          <label for="Nombre">Nombre</label>
          <input type="text" className="form-control"  value={nombre}
                    onChange={(e) => setNombre(e.target.value)}/>
          </div>
          <div className="col-md-12">
          <label for="Tarjeta">Tarjeta</label>
          <input type="text" className="form-control" value={tarjeta}  maxLength="19"
                    onChange={handleNumeroTarjeta} placeholder="XXXX XXXX XXXX XXXX"/>
          </div>
          <div className="col-md-4">
          <label for="Tarjeta">CVV</label>
          <input type="password" className="form-control" value={cvv}
                    onChange={(e) => setCvv(e.target.value)}/>
          </div>
          <div className="col-md-7">
          <label for="Tarjeta">Fecha Vencimiento</label>
          <input type="Text"value={fechaVencimiento} onChange={handleFechaVencimientoChange}  maxLength="5"
                    placeholder="MM/AA" className="form-control"/>
          </div>
          </form>
            </div>
            </div>
        </div>

      </Modal.Body>
      <Modal.Footer>
      <Button variant="success" onClick={handlePagar} >Pagar</Button>
        <Button variant="danger" onClick={handleClose}>
          Cerrar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ComprasModal;
