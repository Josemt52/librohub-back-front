import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Register.css';

function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/register', { username, password });
      alert('Usuario registrado con éxito');
      navigate('/login');
    } catch (error) {
      alert('Error al registrar usuario. Intente con otro nombre de usuario.');
    }
  };

  return (
    <div className="register">
      <h2>Registro de Usuario</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Usuario" required />
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Contraseña" required />
        <button type="submit">Registrarse</button>
      </form>
    </div>
  );
}

export default Register;
