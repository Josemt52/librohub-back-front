const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();

app.use(cors({
  origin: 'http://localhost:3000',  // Cambia esto a la URL de tu frontend
  credentials: true
}));
app.use(express.json());

// Configuración de conexión a MySQL
const db = mysql.createPool({
  host: '127.0.0.1',
  user: 'root',
  password: 'jmtm',
  database: 'librohub',
  port: 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Ruta de login
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  const query = "SELECT role FROM users WHERE username = ? AND password = ?";
  db.query(query, [username, password], (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Error en el servidor: ' + err.message });
    }

    if (results.length > 0) {
      res.json({ message: 'Login exitoso', role: results[0].role });
    } else {
      res.status(401).json({ error: 'Credenciales inválidas' });
    }
  });
});

// Ruta de registro
app.post('/register', (req, res) => {
  const { username, password } = req.body;

  const checkUserQuery = "SELECT * FROM users WHERE username = ?";
  db.query(checkUserQuery, [username], (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Error en el servidor: ' + err.message });
    }

    if (results.length > 0) {
      return res.status(400).json({ error: 'El nombre de usuario ya está en uso' });
    }

    const insertUserQuery = "INSERT INTO users (username, password, role) VALUES (?, ?, 'user')";
    db.query(insertUserQuery, [username, password], (err) => {
      if (err) {
        return res.status(500).json({ error: 'Error en el servidor: ' + err.message });
      }
      res.json({ message: 'Usuario registrado con éxito' });
    });
  });
});

// Ruta para obtener todos los libros
app.get('/books', (req, res) => {
  const query = "SELECT * FROM books";
  db.query(query, (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Error en el servidor: ' + err.message });
    }
    res.json(results);
  });
});

// Ruta para obtener libros por categoría
app.get('/books/category/:category', (req, res) => {
  const { category } = req.params;

  const query = "SELECT * FROM books WHERE category = ?";
  db.query(query, [category], (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Error en el servidor: ' + err.message });
    }
    res.json(results);
  });
});

// Ruta para obtener todas las categorías
app.get('/categories', (req, res) => {
  const query = "SELECT DISTINCT category FROM books";
  db.query(query, (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Error en el servidor: ' + err.message });
    }
    res.json(results.map(row => row.category));
  });
});

// Ruta para agregar un nuevo libro
app.post('/books', (req, res) => {
  const { title, author, year, price, category } = req.body;

  const query = "INSERT INTO books (title, author, year, price, category) VALUES (?, ?, ?, ?, ?)";
  db.query(query, [title, author, year, price, category], (err) => {
    if (err) {
      return res.status(500).json({ error: 'Error en el servidor: ' + err.message });
    }
    res.json({ message: 'Libro agregado con éxito' });
  });
});

// Ruta para actualizar un libro
app.put('/books/:bookId', (req, res) => {
  const { bookId } = req.params;
  const { title, author, year, price, category } = req.body;

  const query = "UPDATE books SET title = ?, author = ?, year = ?, price = ?, category = ? WHERE id = ?";
  db.query(query, [title, author, year, price, category, bookId], (err) => {
    if (err) {
      return res.status(500).json({ error: 'Error en el servidor: ' + err.message });
    }
    res.json({ message: 'Libro actualizado con éxito' });
  });
});

// Ruta para eliminar un libro
app.delete('/books/:bookId', (req, res) => {
  const { bookId } = req.params;

  const query = "DELETE FROM books WHERE id = ?";
  db.query(query, [bookId], (err) => {
    if (err) {
      return res.status(500).json({ error: 'Error en el servidor: ' + err.message });
    }
    res.json({ message: 'Libro eliminado con éxito' });
  });
});

// Iniciar el servidor en el puerto 3001
app.listen(5000, () => {
  console.log('Servidor corriendo en el puerto 5000');
});
