import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';


function Login({ onLogin, isAdminLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/login', { username, password });
      if (response.data) {
        onLogin(response.data.role);
        if (response.data.role === 'admin' && isAdminLogin) {
          navigate('/admin');
        } else if (response.data.role !== 'admin') {
          navigate('/');
        } else {
          alert('Solo los administradores pueden acceder a esta página');
        }
      }
    } catch (error) {
      alert('Credenciales incorrectas');
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <h2 className="text-center mb-4">Iniciar Sesión</h2>
          <form onSubmit={handleSubmit} className="card p-4 shadow">
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
            <button className="btn btn-primary w-100">Iniciar sesión</button>
          </form>
          
          <div className="text-center mt-3">
            <Link to="/register" className="text-primary">¿No tienes cuenta? Regístrate aquí</Link>
          </div>
          <div className="text-center mt-2">
            <Link to="/admin-login" className="text-muted" style={{ fontSize: '0.9em' }}>
              Login de Administrador
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
