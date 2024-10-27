import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, Navigate } from 'react-router-dom';
import UserView from './components/UserView';
import Login from './components/Login';
import Register from './components/Register';
import AdminView from './components/AdminView';
import Cart from './components/Cart';
import './App.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [cart, setCart] = useState([]);

  const handleLogin = (role) => {
    setIsLoggedIn(true);
    if (role === "admin") {
      setIsAdmin(true);
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setIsAdmin(false);
  };

  const addToCart = (book) => {
    if (!isLoggedIn) {
      alert('Por favor, inicie sesión para agregar al carrito');
    } else {
      setCart([...cart, book]);
    }
  };

  return (
    <Router>
      <header className="header">
        <h1>Catálogo de Libros</h1>
        <div className="header-actions">
          <Link to="/cart">Carrito ({cart.length})</Link>
          {isLoggedIn ? (
            <button onClick={handleLogout}>Cerrar sesión</button>
          ) : (
            <>
              <Link to="/login">Ingresar</Link>
              <Link to="/register">Registrarse</Link>
            </>
          )}
        </div>
      </header>
      <Routes>
        <Route path="/" element={<UserView addToCart={addToCart} />} />
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/cart" element={isLoggedIn ? <Cart cart={cart} /> : <Navigate to="/login" />} />
        <Route path="/admin-login" element={<Login onLogin={(role) => handleLogin("admin")} isAdmin />} />
        <Route path="/admin" element={isAdmin ? <AdminView /> : <Navigate to="/admin-login" />} />
      </Routes>
    </Router>
  );
}

export default App;

