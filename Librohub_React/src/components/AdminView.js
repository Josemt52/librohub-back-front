import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AdminView.css';

function AdminView() {
  const [books, setBooks] = useState([]);
  const [newBook, setNewBook] = useState({ title: '', author: '', year: '', price: '', category: '', quantity: '' });
  const [editBook, setEditBook] = useState(null);

  // Obtener los libros desde FastAPI
  const getBooks = async () => {
    try {
      const response = await axios.get('http://localhost:5000/books');
      setBooks(response.data);
    } catch (error) {
      console.error("Error al obtener los libros:", error);
    }
  };

  // Agregar un nuevo libro a través de FastAPI
  const addBook = async () => {
    try {
      await axios.post('http://localhost:5000/books', newBook);
      getBooks();  // Refrescar la lista de libros
      setNewBook({ title: '', author: '', year: '', price: '', category: '', quantity: '' });
    } catch (error) {
      console.error("Error al agregar el libro:", error);
    }
  };

  // Eliminar un libro a través de FastAPI
  const deleteBook = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/books/${id}`);
      getBooks();  // Refrescar la lista de libros
    } catch (error) {
      console.error("Error al eliminar el libro:", error);
    }
  };

  // Manejar el cambio en los campos del formulario
  const handleChange = (e) => {
    setNewBook({
      ...newBook,
      [e.target.name]: e.target.value
    });
  };

  // Función para llenar los campos del formulario con el libro a editar
  const handleEdit = (book) => {
    setEditBook(book);
  };

  // Función para actualizar un libro a través de FastAPI
  const updateBook = async () => {
    try {
      await axios.put(`http://localhost:5000/books/${editBook.id}`, editBook);
      getBooks();  // Refrescar la lista de libros
      setEditBook(null);
    } catch (error) {
      console.error("Error al actualizar el libro:", error);
    }
  };

  // Manejar el cambio en los campos del formulario de edición
  const handleEditChange = (e) => {
    setEditBook({
      ...editBook,
      [e.target.name]: e.target.value
    });
  };

  useEffect(() => {
    getBooks();
  }, []);

  return (
    <div>
      <h1>Vista de Administrador - Gestionar Libros</h1>

      <div>
        <h2>Agregar nuevo libro</h2>
        <input type="text" name="title" placeholder="Título" value={newBook.title} onChange={handleChange} />
        <input type="text" name="author" placeholder="Autor" value={newBook.author} onChange={handleChange} />
        <input type="number" name="year" placeholder="Año" value={newBook.year} onChange={handleChange} />
        <input type="number" name="price" placeholder="Precio" value={newBook.price} onChange={handleChange} />
        <input type="text" name="category" placeholder="Categoría" value={newBook.category} onChange={handleChange} />
        <input type="number" name="quantity" placeholder="Cantidad" value={newBook.quantity} onChange={handleChange} />
        <button onClick={addBook}>Agregar Libro</button>
      </div>

      {editBook && (
        <div>
          <h2>Editar libro</h2>
          <input type="text" name="title" placeholder="Título" value={editBook.title} onChange={handleEditChange} />
          <input type="text" name="author" placeholder="Autor" value={editBook.author} onChange={handleEditChange} />
          <input type="number" name="year" placeholder="Año" value={editBook.year} onChange={handleEditChange} />
          <input type="number" name="price" placeholder="Precio" value={editBook.price} onChange={handleEditChange} />
          <input type="text" name="category" placeholder="Categoría" value={editBook.category} onChange={handleEditChange} />
          <input type="number" name="quantity" placeholder="Cantidad" value={editBook.quantity} onChange={handleEditChange} />
          <button onClick={updateBook}>Actualizar Libro</button>
        </div>
      )}
      <h2>Lista de Libros</h2>
      <ul>
        {books.map((book) => (
          <li key={book.id}>
            <strong>{book.title}</strong> - {book.author} ({book.year}) - ${book.price} - [{book.category}] - Cantidad: {book.quantity}
            <button onClick={() => handleEdit(book)}>Editar</button>
            <button onClick={() => deleteBook(book.id)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
export default AdminView;
