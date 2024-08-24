import React, { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import { Button, Modal, Form } from 'react-bootstrap';
import Alert from '../sweetAlert/sweetAlert';
import Banner from '../Banner/Banner';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
const API_URL = "https://backend-gateway-production.up.railway.app/api/peliculas"||'http://localhost:8082/api/peliculas';

const PeliculaCatalog = () => {

    const [peliculas, setPeliculas] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [currenPeliculas, setCurrentPeliculas] = useState
    ({ id: '', title: '', description: '', idiomas:'',price: '',rating:'',image:'',youtubeUrl:'' });
    const [isEditing, setIsEditing] = useState(false);

     useEffect(() => {
          fetchPeliculas();
}, []);

  // metodo to call endPoint
  const fetchPeliculas = async () => {
    const response = await fetch(`${API_URL}/all`);
    const data = await response.json();
    setPeliculas(data);
    //document.write("hola mundo");
  };
  //mostrar modal
  const handleShowModal = (peliculas =
    { id: '', title: '', description: '', idiomas: '',rating:'',image:'', youtubeUrl:'' }) => {
    setCurrentPeliculas(peliculas);
    setIsEditing(!!peliculas.id);
    setShowModal(true);
  };

  //cerrar modal
  const handleCloseModal = () => {
    setShowModal(false);
    setCurrentPeliculas({id: '', title: '', description: '', idiomas: '',rating:'',image:'', youtubeUrl:''});
  };

  //guardar Pelicula
  const handleSavePelicula = async () => {
    const method =  'POST';
    const url = isEditing ? `${API_URL}/update/${currenPeliculas.id}` : `${API_URL}/create`;
    if (!currenPeliculas.title || !currenPeliculas.description || !currenPeliculas.price
      || !currenPeliculas.rating || !currenPeliculas.youtubeUrl) {
       alert("Por favor completa todos los campos requeridos.");
       return;
     }
    const response = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(currenPeliculas)
    });

    if (response.ok) {
      Alert({
        title: isEditing ? 'Pelicula actualizada' : 'Pelicula creada',
        text: isEditing ? 'La pelicula ha sido actualizada con éxito.' : 'La pelicula ha sido creada con éxito.',
        icon: 'success',
        timer: 3000,
      });
      fetchPeliculas();
      handleCloseModal();
    } else {
      Alert({
        title: 'Error',
        text: 'Hubo un problema al guardar la pelicula',
        icon: 'error',
        timer: 3000,
      });
    }
  };

  //elimniar Pelicula
  const handleDeletePelicula = async (id) => {
    const response = await fetch(`${API_URL}/delete/${id}`, { method: 'DELETE' });
    if (response.ok) {
      Alert({
        title: 'La pelicula ha sido eliminada',
        text: 'La pelicula ha sido eliminado con éxito.',
        icon: 'success',
        timer: 3000,
      });
      fetchPeliculas();
    } else {
      Alert({
        title: 'Error',
        text: 'Hubo un problema al eliminar la pelicula.',
        icon: 'error',
        timer: 3000,
      });
    }
  };

  //mostrar datos en tabla
  const columns = [
    {
        name: '',

        cell: row => (
            <div>
                <img
                    src={row.image}
                    alt={row.title}
                    style={{ width: '50px', height: 'auto' }}
                />
                <div></div>
            </div>
        ),
        sortable: true,
    },
    { name: 'Id', selector: row => row.id, sortable: true },
    { name: 'Titulo', selector: row => row.title, sortable: true },
    { name: 'Descripciòn', selector: row => row.description, sortable: true },
    { name: 'Idiomas', selector: row => row.idiomas, sortable: true },
    { name: 'Precio', selector: row => row.price, sortable: true },
    { name: 'Rating', selector: row => row.rating, sortable: true },
    { name: 'YoutubeUrl', selector: row => row.youtubeUrl, sortable: true },
    {
      name: 'Acciones',
      cell: row => (
        <div>
          <Button variant="dark" size="sm" onClick={() => handleShowModal(row)}>Editar</Button>{' '}
          <Button variant="danger" size="sm" onClick={() => handleDeletePelicula(row.id)}>Eliminar</Button>
        </div>
      ),
    },
  ];

  //showing table
  return (
    <div>
    <Navbar/>
      <div className="container-fluid" style={{background: "#F8F8F8"}}>
        <div className="row flex-nowrap">
        <Banner backgroundImage="/images/fondopelicula.jpg" height="200px"><h1>Catálogo de Peliculas</h1></Banner>
        </div>
      </div>
      <div className="container mt-4">
        <Button variant="success" onClick={() => handleShowModal()}>Agregar Pelicula</Button>
        <DataTable
        columns={columns}
        data={peliculas}
        pagination/>
      </div>

      <Footer/>
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>{isEditing ? 'Editar Pelicula' : 'Agregar Pelicula'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formTitle">
              <Form.Label>Titulo</Form.Label>
              <Form.Control
                type="text"
                value={currenPeliculas.title}
                onChange={e => setCurrentPeliculas({ ...currenPeliculas, title: e.target.value })}/>
            </Form.Group>
            <Form.Group controlId="formDescription" className="mt-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                value={currenPeliculas.description}
                onChange={e => setCurrentPeliculas({ ...currenPeliculas, description: e.target.value })}/>
            </Form.Group>
            <Form.Group controlId="formIdiomas" className="mt-3">
              <Form.Label>Idiomas</Form.Label>
              <Form.Control
                type="text"
                value={currenPeliculas.idiomas}
                onChange={e => setCurrentPeliculas({ ...currenPeliculas, idiomas: e.target.value })}/>
            </Form.Group>

            <Form.Group controlId="formRating" className="mt-3">
              <Form.Label>Rating</Form.Label>
              <Form.Control
                type="text"
                value={currenPeliculas.rating}
                onChange={e => setCurrentPeliculas({ ...currenPeliculas, rating: e.target.value })}/>
            </Form.Group>
            <Form.Group controlId="formPrice" className="mt-3">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="text"
                value={currenPeliculas.price}
                onChange={e => setCurrentPeliculas({ ...currenPeliculas, price: e.target.value })}/>
            </Form.Group>
            <Form.Group controlId="formYoutube" className="mt-3">
              <Form.Label>Youtube Url</Form.Label>
              <Form.Control
                type="text"
                value={currenPeliculas.youtubeUrl}
                onChange={e => setCurrentPeliculas({ ...currenPeliculas, youtubeUrl: e.target.value })}/>
            </Form.Group>
            <Form.Group controlId="formImage" className="mt-3">
              <Form.Label>Imagen</Form.Label>
              <Form.Control
                type="text"
                value={currenPeliculas.image}
                onChange={e => setCurrentPeliculas({ ...currenPeliculas, image: e.target.value })}/>
            </Form.Group>

          </Form>
        </Modal.Body>
        <Modal.Footer>
        <Button variant="success" onClick={handleSavePelicula}>{isEditing ? 'Actualizar' : 'Guardar'}</Button>
          <Button variant="danger" onClick={handleCloseModal}>Cancelar</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );

};

export default PeliculaCatalog;
