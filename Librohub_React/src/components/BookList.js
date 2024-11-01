import React from 'react';
import '../styles/BookList.css';

const BookList = ({ books, onEdit, onDelete }) => {
  return (
    <div>
      <h2>Lista de Libros</h2>
      <ul>
        {books.map((book) => (
          <li key={book.id}>
            <strong>{book.title}</strong> - {book.author} ({book.year})
            <br />
            Precio: ${book.price} | Categoría: {book.category}
            <button onClick={() => onEdit(book)}>Editar</button>
            <button onClick={() => onDelete(book.id)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BookList;
