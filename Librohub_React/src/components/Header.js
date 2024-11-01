import React from 'react';
import { Link } from 'react-router-dom';
import { Dropdown, ButtonGroup, OverlayTrigger, Popover } from 'react-bootstrap';
import { FaShoppingCart, FaUserCircle } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';

const Header = ({ isAdmin, cart, isLoggedIn, onLogout }) => {
  const popover = (
    <Popover id="popover-basic">
      <Popover.Header as="h3">Carrito</Popover.Header>
      <Popover.Body>
        {cart.length > 0 ? (
          cart.map((item, index) => (
            <div key={index}>
              <strong>{item.title}</strong> - S/ {item.price}
            </div>
          ))
        ) : (
          <div>Carrito vacío</div>
        )}
      </Popover.Body>
    </Popover>
  );

  return (
    <header className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid d-flex justify-content-between align-items-center">
        <Link to="/" className="navbar-brand">LibroHub</Link>
        <div className="d-flex align-items-center">
          <OverlayTrigger trigger="hover" placement="bottom" overlay={popover}>
            <Link to="/cart" className="btn btn-info me-2">
              <FaShoppingCart /> Carrito ({cart.length})
            </Link>
          </OverlayTrigger>
          <Dropdown as={ButtonGroup}>
            <Dropdown.Toggle variant="outline-light" id="dropdown-basic">
              <FaUserCircle /> {isLoggedIn ? 'Cuenta' : 'Ingresar'}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {isLoggedIn ? (
                <>
                  <Dropdown.Item as={Link} to="/" onClick={onLogout}>Cerrar sesión</Dropdown.Item>
                  {isAdmin && <Dropdown.Item as={Link} to="/admin">Administrar</Dropdown.Item>}
                </>
              ) : (
                <>
                  <Dropdown.Item as={Link} to="/login">Ingresar</Dropdown.Item>
                  <Dropdown.Item as={Link} to="/register">Registrarse</Dropdown.Item>
                </>
              )}
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </div>
    </header>
  );
};

export default Header;
