import React, { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import { Button, Modal, Form } from 'react-bootstrap';
import Alert from '../sweetAlert/sweetAlert';
import Banner from '../Banner/Banner';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
const API_URL = "https://backend-gateway-production.up.railway.app/api/user"||'http://localhost:8082/api/user';

const UserCatalog = () => {
  const [users, setUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentUser, setCurrentUser] = useState({ id: '', name: '', email: '', idRol: 2 }); // Default to Cliente (2)
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const response = await fetch(`${API_URL}/getAllUsers`);
    const data = await response.json();
    setUsers(data);
  };


  const handleShowModal = (user = { id: '', name: '', email: '', idRol: 2 }) => { // Default to Cliente (2)
    setCurrentUser(user);
    setIsEditing(!!user.id);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setCurrentUser({ id: '', name: '', email: '', idRol: 2 }); // Reset to default Cliente (2)
  };

  const handleDeleteUser = async (id) => {
    const response = await fetch(`${API_URL}/deleteUserById/${id}`, { method: 'DELETE' });
    if (response.ok) {
      Alert({
        title: 'Usuario eliminado',
        text: 'El usuario ha sido eliminado con éxito.',
        icon: 'success',
        timer: 3000,
      });
      fetchUsers();
    } else {
      Alert({
        title: 'Error',
        text: 'Hubo un problema al eliminar el usuario.',
        icon: 'error',
        timer: 3000,
      });
    }
  };

  const handleSaveUser = async () => {
    const method =  'POST';
    const url = isEditing ? `${API_URL}/updateUser/${currentUser.id}` : `${API_URL}/createUser`;
    if (!currentUser.name || !currentUser.email || !currentUser.password) {
       alert("Por favor completa todos los campos requeridos.");
       return;
     }
    const response = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(currentUser)
    });

    if (response.ok) {
      Alert({
        title: isEditing ? 'Usuario actualizado' : 'Usuario creado',
        text: isEditing ? 'El usuario ha sido actualizado con éxito.' : 'El usuario ha sido creado con éxito.',
        icon: 'success',
        timer: 3000,
      });
      fetchUsers();
      handleCloseModal();
    } else {
      Alert({
        title: 'Error',
        text: 'Hubo un problema al guardar el usuario.',
        icon: 'error',
        timer: 3000,
      });
    }
  };

  const columns = [
    { name: 'Id', selector: row => row.id, sortable: true },
    { name: 'Nombre', selector: row => row.name, sortable: true },
    { name: 'Email', selector: row => row.email, sortable: true },
    { name: 'Rol', selector: row => (row.idRol === 1 ? 'Administrador' : 'Cliente'), sortable: true },
    {
      name: 'Acciones',
      cell: row => (
        <div>
          <Button variant="dark" size="sm" onClick={() => handleShowModal(row)}>Editar</Button>{' '}
          <Button variant="danger" size="sm" onClick={() => handleDeleteUser(row.id)}>Eliminar</Button>
        </div>
      ),
    },
  ];

  return (
    <div>
    <Navbar/>

      <div className="container-fluid" style={{background: "#F8F8F8"}}>
        <div className="row flex-nowrap">
        <Banner backgroundImage="/images/fondogestion.jpg" height="200px">
               <h1>Catálogo de Usuarios</h1>

             </Banner>
        </div>
      </div>
        <div className="container mt-4">
      <Button variant="success" onClick={() => handleShowModal()}>Agregar Usuario</Button>


      <DataTable
        columns={columns}
        data={users}
        pagination
      /></div>
      <Footer/>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>{isEditing ? 'Editar Usuario' : 'Agregar Usuario'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formName">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="text"
                value={currentUser.name}
                onChange={e => setCurrentUser({ ...currentUser, name: e.target.value })}
              />
            </Form.Group>
            <Form.Group controlId="formEmail" className="mt-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                value={currentUser.email}
                onChange={e => setCurrentUser({ ...currentUser, email: e.target.value })}
              />
            </Form.Group>
            <Form.Group controlId="formRole" className="mt-3">
              <Form.Label>Rol</Form.Label>
              <div>
                <Form.Check
                  type="radio"
                  label="Administrador"
                  name="roleOptions"
                  value={1}
                  checked={currentUser.idRol === 1}
                  onChange={() => setCurrentUser({ ...currentUser, idRol: 1 })}
                />
                <Form.Check
                  type="radio"
                  label="Cliente"
                  name="roleOptions"
                  value={2}
                  checked={currentUser.idRol === 2}
                  onChange={() => setCurrentUser({ ...currentUser, idRol: 2 })}
                />
              </div>
            </Form.Group>
            <Form.Group controlId="formPassword" className="mt-3">
              <Form.Label>Contraseña</Form.Label>
              <Form.Control
                type="password"
                value={currentUser.password || ''}
                onChange={e => setCurrentUser({ ...currentUser, password: e.target.value })}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleCloseModal}>Cancelar</Button>
          <Button variant="success" onClick={handleSaveUser}>{isEditing ? 'Actualizar' : 'Guardar'}</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default UserCatalog;
