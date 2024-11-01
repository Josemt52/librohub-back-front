import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Modal, Button, Form } from 'react-bootstrap';

function AdminView() {
  const [books, setBooks] = useState([]);
  const [newBook, setNewBook] = useState({ title: '', author: '', year: '', price: '', category: '', quantity: '' });
  const [editBook, setEditBook] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);

  const getBooks = async () => {
    try {
      const response = await axios.get('http://localhost:5000/books');
      setBooks(response.data);
    } catch (error) {
      console.error("Error al obtener los libros:", error);
    }
  };

  const addBook = async () => {
    try {
      await axios.post('http://localhost:5000/books', newBook);
      getBooks();
      setNewBook({ title: '', author: '', year: '', price: '', category: '', quantity: '' });
    } catch (error) {
      console.error("Error al agregar el libro:", error);
    }
  };

  const deleteBook = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/books/${id}`);
      getBooks();
    } catch (error) {
      console.error("Error al eliminar el libro:", error);
    }
  };

  const handleChange = (e) => {
    setNewBook({
      ...newBook,
      [e.target.name]: e.target.value
    });
  };

  const handleEdit = (book) => {
    setEditBook(book);
    setShowEditModal(true);
  };

  const handleCloseEditModal = () => {
    setShowEditModal(false);
    setEditBook(null);
  };

  const updateBook = async () => {
    try {
      await axios.put(`http://localhost:5000/books/${editBook.id}`, editBook);
      getBooks();
      handleCloseEditModal();
    } catch (error) {
      console.error("Error al actualizar el libro:", error);
    }
  };

  useEffect(() => {
    getBooks();
  }, []);

  return (
    <div className="container mt-4">
      <h1 className="text-center">Vista de Administrador - Gestionar Libros</h1>

      <div className="my-4 p-3 bg-light rounded">
        <h2>Agregar nuevo libro</h2>
        <div className="row">
          <div className="col-md-2">
            <input
              type="text"
              className="form-control"
              placeholder="Título"
              name="title"
              value={newBook.title}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-2">
            <input
              type="text"
              className="form-control"
              placeholder="Autor"
              name="author"
              value={newBook.author}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-1">
            <input
              type="number"
              className="form-control"
              placeholder="Año"
              name="year"
              value={newBook.year}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-1">
            <input
              type="number"
              className="form-control"
              placeholder="Precio"
              name="price"
              value={newBook.price}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-2">
            <input
              type="text"
              className="form-control"
              placeholder="Categoría"
              name="category"
              value={newBook.category}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-1">
            <input
              type="number"
              className="form-control"
              placeholder="Cantidad"
              name="quantity"
              value={newBook.quantity}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-2">
            <button onClick={addBook} className="btn btn-success w-100">Agregar Libro</button>
          </div>
        </div>
      </div>

      <h2>Lista de Libros</h2>
      <ul className="list-group">
        {books.map((book) => (
          <li key={book.id} className="list-group-item d-flex justify-content-between align-items-center">
            <div>
              <strong>{book.title}</strong> - {book.author} ({book.year}) - ${book.price} - [{book.category}] - Cantidad: {book.quantity}
            </div>
            <div>
              <button onClick={() => handleEdit(book)} className="btn btn-primary btn-sm me-2">Editar</button>
              <button onClick={() => deleteBook(book.id)} className="btn btn-danger btn-sm">Eliminar</button>
            </div>
          </li>
        ))}
      </ul>

      {/* Modal de Edición */}
      <Modal show={showEditModal} onHide={handleCloseEditModal}>
        <Modal.Header closeButton>
          <Modal.Title>Editar libro</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Título</Form.Label>
              <Form.Control
                type="text"
                name="title"
                value={editBook?.title || ''}
                onChange={(e) => setEditBook({ ...editBook, title: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Autor</Form.Label>
              <Form.Control
                type="text"
                name="author"
                value={editBook?.author || ''}
                onChange={(e) => setEditBook({ ...editBook, author: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Año</Form.Label>
              <Form.Control
                type="number"
                name="year"
                value={editBook?.year || ''}
                onChange={(e) => setEditBook({ ...editBook, year: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Precio</Form.Label>
              <Form.Control
                type="number"
                name="price"
                value={editBook?.price || ''}
                onChange={(e) => setEditBook({ ...editBook, price: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Categoría</Form.Label>
              <Form.Control
                type="text"
                name="category"
                value={editBook?.category || ''}
                onChange={(e) => setEditBook({ ...editBook, category: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Cantidad</Form.Label>
              <Form.Control
                type="number"
                name="quantity"
                value={editBook?.quantity || ''}
                onChange={(e) => setEditBook({ ...editBook, quantity: e.target.value })}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseEditModal}>Cancelar</Button>
          <Button variant="primary" onClick={updateBook}>Actualizar Libro</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default AdminView;
