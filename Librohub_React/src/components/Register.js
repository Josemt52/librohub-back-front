import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/register', { username, password });
      alert('Usuario registrado con éxito');
      navigate('/login');
    } catch (error) {
      alert('Error al registrar usuario');
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <h2 className="text-center mb-4">Registrarse</h2>
          <form onSubmit={handleRegister} className="card p-4 shadow">
            <div className="form-group mb-3">
              <label>Nombre de usuario</label>
              <input
                type="text"
                placeholder="Nombre de usuario"
                className="form-control"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="form-group mb-3">
              <label>Contraseña</label>
              <input
                type="password"
                placeholder="Contraseña"
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button className="btn btn-primary w-100">Registrarse</button>
          </form>

          <div className="text-center mt-3">
            <Link to="/login" className="text-primary">¿Ya tienes cuenta? Inicia sesión aquí</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
