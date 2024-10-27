const mysql = require('mysql2');

const db = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: 'jmtm',
  database: 'librohub',
  port: 3306,
});

db.connect((err) => {
  if (err) {
    console.error('Error al conectar a MySQL:', err);
  } else {
    console.log('Conexión a MySQL exitosa');
  }
  db.end(); // Cerrar la conexión después de probar
});
