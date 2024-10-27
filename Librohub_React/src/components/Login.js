import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Login.css';

function Login({ onLogin, isAdmin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const endpoint = isAdmin ? '/admin-login' : '/login';
      const response = await axios.post(`http://localhost:5000${endpoint}`, { username, password });
      if (response.data) {
        onLogin(response.data.role);
        navigate(isAdmin ? '/admin' : '/');
      }
    } catch (error) {
      alert('Credenciales incorrectas');
    }
  };

  return (
    <div className="login">
      <h2>{isAdmin ? 'Admin Login' : 'Iniciar Sesión'}</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Usuario" required />
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Contraseña" required />
        <button type="submit">Ingresar</button>
      </form>
      {!isAdmin && (
        <div className="login-links">
          <p>¿No tienes cuenta? <Link to="/register">Registrarse</Link></p>
          <small><Link to="/admin-login">Admin Login</Link></small>
        </div>
      )}
    </div>
  );
}

export default Login;
