import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Toast, ToastContainer } from 'react-bootstrap';
import ReactPaginate from 'react-paginate';
import { FaSearch } from 'react-icons/fa';

function UserView({ addToCart }) {
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(0);
  const booksPerPage = 10;
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  useEffect(() => {
    getBooks();
  }, []);

  const getBooks = async () => {
    try {
      const response = await axios.get('http://localhost:5000/books');
      setBooks(response.data);
      setFilteredBooks(response.data);
    } catch (error) {
      console.error("Error al obtener los libros:", error);
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    const filtered = books.filter(book => 
      book.title.toLowerCase().includes(e.target.value.toLowerCase()) || 
      book.author.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFilteredBooks(filtered);
    setCurrentPage(0);
  };

  const offset = currentPage * booksPerPage;
  const currentBooks = filteredBooks.slice(offset, offset + booksPerPage);
  const pageCount = Math.ceil(filteredBooks.length / booksPerPage);

  const handlePageClick = (data) => {
    setCurrentPage(data.selected);
  };

  const handleAddToCart = (book) => {
    const added = addToCart(book);
    if (added) {
      setToastMessage(`${book.title} agregado al carrito`);
      setShowToast(true);
    }
  };

  return (
    <div className="container my-4">
      <h1 className="text-center">Catálogo de Libros</h1>
      <div className="input-group mb-4">
        <input 
          type="text"
          placeholder="Buscar libros..."
          className="form-control"
          value={searchTerm}
          onChange={handleSearch}
        />
        <button className="btn btn-outline-secondary" type="button">
          <FaSearch />
        </button>
      </div>
      <div className="row">
        {currentBooks.map((book) => (
          <div className="col-md-3 mb-4" key={book.id}>
            <div className="card h-100 text-center">
              <div className="card-body">
                <h5 className="card-title">{book.title}</h5>
                <p className="card-text">{book.author}</p>
                <p className="text-primary">S/ {Number(book.price || 0).toFixed(2)}</p>
                <button className="btn btn-primary" onClick={() => handleAddToCart(book)}>Agregar al Carrito</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <ReactPaginate
        previousLabel={"Anterior"}
        nextLabel={"Siguiente"}
        breakLabel={"..."}
        breakClassName={"break-me"}
        pageCount={pageCount}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={handlePageClick}
        containerClassName={"pagination justify-content-center"}
        pageClassName={"page-item"}
        pageLinkClassName={"page-link"}
        previousClassName={"page-item"}
        previousLinkClassName={"page-link"}
        nextClassName={"page-item"}
        nextLinkClassName={"page-link"}
        activeClassName={"active"}
      />

      <ToastContainer position="top-end" className="p-3">
        <Toast onClose={() => setShowToast(false)} show={showToast} delay={3000} autohide>
          <Toast.Header>
            <strong className="me-auto">Notificación</strong>
          </Toast.Header>
          <Toast.Body>{toastMessage}</Toast.Body>
        </Toast>
      </ToastContainer>
    </div>
  );
}

export default UserView;
