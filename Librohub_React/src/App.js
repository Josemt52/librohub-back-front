import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import UserView from './components/UserView';
import Login from './components/Login';
import Register from './components/Register';
import AdminView from './components/AdminView';
import Cart from './components/Cart';
import Header from './components/Header';

import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart'));
    if (storedCart) {
      setCart(storedCart);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const handleLogin = (role) => {
    setIsLoggedIn(true);
    if (role === "admin") {
      setIsAdmin(true);
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setIsAdmin(false);
    setCart([]);
    localStorage.removeItem('cart');
  };

  return (
    <Router>
      <Header isAdmin={isAdmin} cart={cart} isLoggedIn={isLoggedIn} onLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<UserView addToCart={(book) => setCart([...cart, book])} />} />
        <Route path="/login" element={<Login onLogin={handleLogin} isAdminLogin={false} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/cart" element={<Cart cart={cart} setCart={setCart} />} />
        <Route path="/admin-login" element={<Login onLogin={handleLogin} isAdminLogin={true} />} />
        <Route path="/admin" element={isAdmin ? <AdminView /> : <Navigate to="/admin-login" />} />
      </Routes>
    </Router>
  );
}

export default App;
