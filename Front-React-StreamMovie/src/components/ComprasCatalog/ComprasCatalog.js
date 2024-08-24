import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DataTable from 'react-data-table-component';
import { Button, Modal, Form } from 'react-bootstrap';
import Alert from '../sweetAlert/sweetAlert';
import Banner from '../Banner/Banner';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';

const API_URL = "https://backend-gateway-production.up.railway.app/api/" ||'http://localhost:8082/api/';

const CompraCatalog = () => {

    const [nombre, setNombre] = useState('');
    const [tarjeta, setTarjeta] = useState('');
    const [cvv, setCvv] = useState('');
    const [usuarios, setUsuarios] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [fechaVencimiento, setFechaVencimiento] = useState('');
    const [peliculas, setPeliculas] = useState([]);
    const [selectedMovie, setSelectedMovie] = useState(null);
    const [compras, setCompras] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [currentCompra, setCurrentCompra] = useState({
        id: '',
        nombre: '',
        numTarjeta: '',
        cvv: '',
        fechaVencimiento: '',
        total: '',
        idMovie: '',
        idUser: ''
    });

    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('user'));

    useEffect(() => {
        const fetchPeliculas = async () => {
            const response = await fetch(`${API_URL}peliculas/all`);
            const data = await response.json();
            setPeliculas(data);
        };
        const fetchUsuarios = async () => {
           const response = await fetch(`${API_URL}user/getAllUsers`); // Cambia el endpoint según tu API
           const data = await response.json();
           setUsuarios(data);
       };
        fetchPeliculas();
        fetchUsuarios();
    }, []);

    useEffect(() => {
        fetchCompras();
    }, []);

    const fetchCompras = async () => {
        const response = await fetch(`${API_URL}compras/getAllCompras`);
        if (response.status === 204) { // Si el estado es 204, no hay contenido.
         setCompras([]); // Asigna un array vacío a movies.
       } else {
        const data = await response.json();
        setCompras(data);
        }
    };

    const handleShowModal = (compra = {
        id: '',
        nombre: '',
        numTarjeta: '',

        cvv: '',
        fechaVencimiento: '',
        total: '',
        idMovie: '',
        idUser: ''
    }) => {
        setCurrentCompra(compra);
        console.log(compra);
        setIsEditing(!!compra.id);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setCurrentCompra({
            id: '',
            nombre: '',
            numTarjeta: '',
            cvv: '',
            fechaVencimiento: '',
            total: '',
            idMovie: '',
            idUser: ''
        });
    };

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

        if (!selectedMovie) {
            Alert({
                title: 'Selección de Película',
                text: 'Por favor, selecciona una película.',
                icon: 'warning',
                timer: 3000,
            });
            return;
        }

        const venta = {
        nombre: nombre,
        numTarjeta: tarjeta, // 'numTarjeta' instead of just 'tarjeta'
        cvv: cvv,
        fechaVencimiento: fechaVencimiento,
        idMovie: currentCompra.idMovie, // Explicitly define the key as 'idMovie'
        total: currentCompra.price, // Explicitly define the key as 'total'
        idUser: user.id // Explicitly define the key as 'idUser'
    };

        console.log(venta);

        try {
            const response = await fetch(`${API_URL}compras/createCompra`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(venta),
            });

            if (!response.ok) {
                throw new Error('Error al registrar la compra');
            }

            Alert({
                title: 'Compra Realizada con Éxito',
                text: `Ya cuentas con la película ${selectedMovie.title} para verla las veces que quieras.`,
                icon: 'success',
                timer: 3000,
            });

            navigate('/Dashboard');
            handleCloseModal();
        } catch (error) {
            console.error(error);
            Alert({
                title: 'Error en la Compra',
                text: 'Se ha producido un error en la compra, intenta más tarde.',
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
    };

    const handleNumeroTarjeta = (e) => {
        let input = e.target.value.replace(/\D/g, '');
        if (input.length > 16) {
            input = input.slice(0, 16);
        }
        input = input.match(/.{1,4}/g)?.join(' ') || input;
        setTarjeta(input);
    };

    const handleMovieSelect = (e) => {
    const movieId = parseInt(e.target.value, 10);
    const movie = peliculas.find(pelicula => pelicula.id === movieId);
    setSelectedMovie(movie);
    setCurrentCompra({
        ...currentCompra,
        idMovie: movie?.id || '',
        total: movie?.price || 0,
    });
};

const handleUserSelect = (e) => {
        const userId = parseInt(e.target.value, 10);
        const user = usuarios.find(usuario => usuario.id === userId);
        setSelectedUser(user);
        setCurrentCompra({
            ...currentCompra,
            idUser: user?.id || ''
        });
    };
    const handleDeleteCompra = async (id) => {
        const response = await fetch(`${API_URL}compras/deleteCompra/${id}`, { method: 'DELETE' });
        if (response.ok) {
            Alert({
                title: 'Compra eliminada',
                text: 'La compra ha sido eliminada con éxito.',
                icon: 'success',
                timer: 3000,
            });
            fetchCompras();
        } else {
            Alert({
                title: 'Error',
                text: 'Hubo un problema al eliminar la compra.',
                icon: 'error',
                timer: 3000,
            });
        }
    };

    const handleSaveCompra = async () => {
        const method ='POST';
        const url = isEditing ? `${API_URL}updateCompra/${currentCompra.id}` : `${API_URL}compras/createCompra`;
        const venta = {
        nombre: currentCompra.nombre,
        numTarjeta: tarjeta, // 'numTarjeta' instead of just 'tarjeta'
        cvv: currentCompra.cvv,
        total:currentCompra.total,
        fechaVencimiento: fechaVencimiento,
        pelicula: { id: currentCompra.idMovie }, // Nested object for "pelicula"
        usuario:{ id: selectedUser?.id || user.id } // Nested object for "usuario"
    };
        const response = await fetch(url, {
            method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(venta)
        });

        if (response.ok) {
            Alert({
                title: isEditing ? 'Compra actualizada' : 'Compra creada',
                text: isEditing ? 'La compra ha sido actualizada con éxito.' : 'La compra ha sido creada con éxito.',
                icon: 'success',
                timer: 3000,
            });
            fetchCompras();
            handleCloseModal();
        } else {
            Alert({
                title: 'Error',
                text: 'Hubo un problema al guardar la compra.',
                icon: 'error',
                timer: 3000,
            });
        }
    };

    const columns = [
      {
          name: '',

          cell: row => (
              <div>
                  <img
                      src={row.pelicula.image}
                      alt={row.pelicula.title}
                      style={{ width: '50px', height: 'auto' }}
                  />
                  <div></div>
              </div>
          ),
          sortable: true,
      },
      { name: 'Pelicula', selector: row => row.pelicula.title, sortable: true },
        { name: 'Id', selector: row => row.id, sortable: true },
        { name: 'Nombre', selector: row => row.nombre, sortable: true },
        { name: 'Número de Tarjeta', selector: row => row.numTarjeta, sortable: true },
        { name: 'CVV', selector: row => row.cvv, sortable: true },
        { name: 'Fecha de Vencimiento', selector: row => row.fechaVencimiento, sortable: true },
        { name: 'Total', selector: row => row.total, sortable: true },

        { name: 'Usuario', selector: row => row.usuario.name, sortable: true },
        {
            name: 'Acciones',
            cell: row => (
                <div>

                    <Button variant="danger" size="sm" onClick={() => handleDeleteCompra(row.id)}>Eliminar</Button>
                </div>
            ),
        },
    ];

    return (
        <div>
            <Navbar />
            <div className="container-fluid" style={{ background: "#F8F8F8" }}>
                <div className="row flex-nowrap">
                    <Banner backgroundImage="/images/compras2.jpg" height="200px">
                        <h1>Catálogo de Compras</h1>
                    </Banner>
                </div>
            </div>
            <div className="container mt-4">
                <Button variant="success" onClick={() => handleShowModal()}>Agregar Compra</Button>
                <DataTable columns={columns} data={compras} pagination />
            </div>
            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>{isEditing ? 'Editar Compra' : 'Nueva Compra'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                    <Form.Group controlId="formUsuario">
                                                <Form.Label>Usuario</Form.Label>
                                                <Form.Control
                                                    as="select"
                                                    value={currentCompra.idUser}
                                                    onChange={handleUserSelect}
                                                >
                                                    <option value="">Seleccionar Usuario</option>
                                                    {usuarios.map(usuario => (
                                                        <option key={usuario.id} value={usuario.id}>
                                                            {usuario.name} ({usuario.email})
                                                        </option>
                                                    ))}
                                                </Form.Control>
                                            </Form.Group>
                        <Form.Group controlId="formNombre">
                            <Form.Label>Nombre</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Ingresa el nombre"
                                value={currentCompra.nombre}
                                onChange={e => setCurrentCompra({ ...currentCompra, nombre: e.target.value })}
                            />
                        </Form.Group>
                        <Form.Group controlId="formNumeroTarjeta">
                        <Form.Label>Número de Tarjeta</Form.Label>
                        <Form.Control
                            type="text"
                            value={tarjeta}
                            onChange={handleNumeroTarjeta}
                            placeholder="XXXX XXXX XXXX XXXX"
                            maxLength="19" // 16 dígitos + 3 espacios
                        />
                    </Form.Group>
                        <Form.Group controlId="formCvv">
                            <Form.Label>CVV</Form.Label>
                            <Form.Control
                                type="password"
                                maxLength="3"
                                placeholder="Ingresa el CVV"
                                value={currentCompra.cvv}
                                onChange={e => setCurrentCompra({ ...currentCompra, cvv: e.target.value })}
                            />
                        </Form.Group>
                        <Form.Group controlId="formFechaVencimiento">
                            <Form.Label>Fecha de Vencimiento</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="MM/AA"
                                value={fechaVencimiento}
                                onChange={handleFechaVencimientoChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="formPelicula">
      <Form.Label>Película</Form.Label>
      <Form.Control
          as="select"
          value={currentCompra.idMovie}
          onChange={e => {
              const selectedMovie = peliculas.find(pelicula => pelicula.id === parseInt(e.target.value));
              setCurrentCompra({
                  ...currentCompra,
                  idMovie: selectedMovie?.id || '',
                  total: selectedMovie?.price || 0
              });
          }}
      >
          <option value="">Seleccione una película</option>
          {peliculas.map(pelicula => (
              <option key={pelicula.id} value={pelicula.id}>
                  {pelicula.title}
              </option>
          ))}
      </Form.Control>
  </Form.Group>

  {currentCompra.total > 0 && (
      <div className="mt-3">

          <h5>Total: ${currentCompra.total}.00</h5>

      </div>
  )}

                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={handleCloseModal}>Cerrar</Button>
                    <Button variant="success" onClick={handleSaveCompra}>{isEditing ? 'Guardar Cambios' : 'Guardar Compra'}</Button>
                </Modal.Footer>
            </Modal>
            <Footer />
        </div>
    );
};

export default CompraCatalog;
