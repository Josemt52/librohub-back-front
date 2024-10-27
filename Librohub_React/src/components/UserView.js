import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './UserView.css';

function UserView({ addToCart }) {
  const [books, setBooks] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');

  useEffect(() => {
    getBooks();
    getCategories();
  }, []);

  const getBooks = async () => {
    try {
      const response = await axios.get('http://localhost:5000/books');
      console.log("Libros obtenidos:", response.data); // Verifica los datos recibidos
      setBooks(response.data);
    } catch (error) {
      console.error("Error al obtener los libros:", error);
    }
  };

  const getCategories = async () => {
    try {
      const response = await axios.get('http://localhost:5000/categories');
      console.log("Categorías obtenidas:", response.data); // Verifica los datos recibidos
      setCategories(response.data);
    } catch (error) {
      console.error("Error al obtener las categorías:", error);
    }
  };

  const filterByCategory = async (category) => {
    setSelectedCategory(category);
    if (category) {
      try {
        const response = await axios.get(`http://localhost:5000/books/category/${category}`);
        console.log(`Libros en categoría ${category}:`, response.data); // Verifica los datos filtrados
        setBooks(response.data);
      } catch (error) {
        console.error(`Error al filtrar por categoría ${category}:`, error);
      }
    } else {
      getBooks();
    }
  };

  return (
    <div className="container">
      <h1>Catálogo de Libros</h1>

      <div className="category-buttons">
        <button onClick={() => filterByCategory('')}>Todas las Categorías</button>
        {categories.map((category) => (
          <button key={category} onClick={() => filterByCategory(category)}>
            {category}
          </button>
        ))}
      </div>

      <div className="book-list">
        {books.map((book) => (
          <div className="book-card" key={book.id}>
            <div className="book-info">
              <h3>{book.title}</h3>
              <p>{book.author}</p>
              <p className="book-price">S/ {Number(book.price || 0).toFixed(2)}</p>
              <p className="book-category">{book.category}</p>
              <button onClick={() => addToCart(book)}>Agregar al Carrito</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default UserView;
