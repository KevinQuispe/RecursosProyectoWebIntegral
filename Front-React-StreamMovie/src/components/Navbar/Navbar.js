import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import { NavItem } from 'react-bootstrap';
import Navbar from 'react-bootstrap/Navbar';
import { BsDisplayFill } from "react-icons/bs";
import NavDropdown from 'react-bootstrap/NavDropdown';
import './Navbar.css';
import { AiOutlineShopping } from "react-icons/ai";
import { Link } from 'react-router-dom';
import { FaHome, FaShoppingBag, FaInfoCircle,FaSearch, FaBook, FaPhone,FaUserAstronaut, FaPlay } from "react-icons/fa";

function BasicExample() {
   const user = JSON.parse(localStorage.getItem('user'));
  return (
    <Navbar expand="lg" className=" navbar-bg" style={{background: "#ffffff"}}>
      <Container>
        <Navbar.Brand href="#home"> <h2 style={{color:"#0096C4"}}>  Stream <img
          src="../images/fondo6.svg"
          height="40px"
        /><strong style={{color:"Dark-blue"}}>Movies</strong> </h2></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">

            <Nav.Link href="/dashboard"style={{color:"#0096C4"}}><FaHome /> Inicio</Nav.Link>
            <Nav.Link href="/buscador"style={{color:"#0096C4"}}><FaSearch /> Buscador</Nav.Link>
            <Nav.Link href="/compras"style={{color:"#0096C4"}}><FaShoppingBag /> Mis compras</Nav.Link>

          </Nav>
          <Nav pullRight>
     <NavItem eventKey={1} href="#">
     <NavDropdown
     title={
          <span style={{color:"#0096C4"}}>
          <img
            src="../images/fondo7.svg"
            className=""
            alt="Sample image"  height="30px"
          /> {user.name}
          </span>
        }

        id="basic-nav-dropdown">
        <NavDropdown.Item title="User Menu" id="user-nav-dropdown">
        <div style={{ padding: '3px', textAlign: 'center' }}>
          <img
            src="../images/fondo7.svg"
            alt="User"
            style={{ borderRadius: '50%', width: '50px', height: '50px' }}
          />
          <p style={{ color: "#0096C4" }}>{user.name}
          <br/>
          {user.email}</p>
        </div>
      </NavDropdown.Item>

 <hr style={{ margin: '0' }} />
        {user.idRol === 1 && (
      <>
        <NavDropdown.Item href="/UsersAdmin" style={{ color: "#0096C4" }}>
          Gestión de Usuarios
        </NavDropdown.Item>
         <hr style={{ margin: '0' }} />
        <NavDropdown.Item href="/peliculas" style={{ color: "#0096C4" }}>
          Gestión de Peliculas
        </NavDropdown.Item>
         <hr style={{ margin: '0' }} />
        <NavDropdown.Item href="/ComprasAdmin" style={{ color: "#0096C4" }}>
          Gestión de Compras
        </NavDropdown.Item>
           <hr style={{ margin: '0' }} />
      </>
    )}
       <NavDropdown.Item href="/logout"style={{color:"#0096C4"}}>
       Cerrar Sesión</NavDropdown.Item>


     </NavDropdown>
     </NavItem>

   </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default BasicExample;
