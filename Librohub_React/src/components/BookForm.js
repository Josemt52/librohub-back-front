import React, { useState, useEffect } from 'react';
import './BookForm.css';

const BookForm = ({ onAddBook, onEditBook, editingBook }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [year, setYear] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');

  // Llenar los campos si estamos editando un libro
  useEffect(() => {
    if (editingBook) {
      setTitle(editingBook.title);
      setAuthor(editingBook.author);
      setYear(editingBook.year);
      setPrice(editingBook.price);
      setCategory(editingBook.category);
    }
  }, [editingBook]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const book = { title, author, year, price, category };
    if (editingBook) {
      onEditBook({ ...editingBook, ...book });
    } else {
      onAddBook(book);
    }

    // Limpiar el formulario
    setTitle('');
    setAuthor('');
    setYear('');
    setPrice('');
    setCategory('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Título: </label>
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
      </div>
      <div>
        <label>Autor: </label>
        <input type="text" value={author} onChange={(e) => setAuthor(e.target.value)} />
      </div>
      <div>
        <label>Año: </label>
        <input type="number" value={year} onChange={(e) => setYear(e.target.value)} />
      </div>
      <div>
        <label>Precio: </label>
        <input type="number" step="0.01" value={price} onChange={(e) => setPrice(e.target.value)} />
      </div>
      <div>
        <label>Categoría: </label>
        <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} />
      </div>
      <button type="submit">{editingBook ? 'Actualizar Libro' : 'Agregar Libro'}</button>
    </form>
  );
};

export default BookForm;
