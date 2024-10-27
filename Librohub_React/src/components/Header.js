import React from 'react';
import './Header.css';

const Header = () => {
  return (
    <header>
      <h1>LibroHub</h1>
      <nav>
        <ul>
          <li>Home</li>
          <li>Libros</li>
          <li>Agregar Libro</li>
        </ul>
      </nav>
    </header>
  );
};
export default Header;
