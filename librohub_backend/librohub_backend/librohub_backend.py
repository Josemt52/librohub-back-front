from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import mysql.connector

# Crear la aplicación FastAPI

app = FastAPI() 

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Dominios permitidos para hacer solicitudes
    allow_credentials=True,
    allow_methods=["*"],  # Permitir todos los métodos HTTP (GET, POST, PUT, DELETE)
    allow_headers=["*"],  # Permitir todos los encabezados
)
# Conectar a la base de datos MySQL
conn = mysql.connector.connect(
    host="127.0.0.1",
    user="root",  # Cambia esto
    password="jmtm",  # Cambia esto
    database="librohub"  # Nombre de tu base de datos
)
cursor = conn.cursor()

# Modelo de datos para login
class LoginData(BaseModel):
    username: str
    password: str

# Endpoint para manejar el login
@app.post("/login")
def login(data: LoginData):
    query = "SELECT role FROM users WHERE username = %s AND password = %s"
    cursor.execute(query, (data.username, data.password))
    result = cursor.fetchone()

    if result:
        role = result[0]
        return {"message": "Login exitoso", "role": role}
    else:
        raise HTTPException(status_code=401, detail="Credenciales inválidas")

# Modelo de datos para el registro
class RegisterData(BaseModel):
    username: str
    password: str

# Endpoint para registrar nuevos usuarios
@app.post("/register")
def register(data: RegisterData):
    # Verificar si el nombre de usuario ya existe
    query = "SELECT * FROM users WHERE username = %s"
    cursor.execute(query, (data.username,))
    existing_user = cursor.fetchone()
    
    if existing_user:
        raise HTTPException(status_code=400, detail="El nombre de usuario ya está en uso")

    # Insertar el nuevo usuario con el rol de "user"
    query = "INSERT INTO users (username, password, role) VALUES (%s, %s, 'user')"
    cursor.execute(query, (data.username, data.password))
    conn.commit()
    
    return {"message": "Usuario registrado con éxito"}

class Book(BaseModel):
    title: str
    author: str
    year: int
    price: float
    category: str

# Endpoint para buscar libros por categoría
@app.get("/books/category/{category}")
def get_books_by_category(category: str):
    query = "SELECT * FROM books WHERE category = %s"
    cursor.execute(query, (category,))
    books = cursor.fetchall()
    return [
        {
            "id": row[0],"title": row[1],"author": row[2],"year": row[3],"price": row[4],"category": row[5],"quantity": row[6]}for row in books]

@app.get("/categories")
def get_categories():
    query = "SELECT DISTINCT category FROM books"
    cursor.execute(query)
    categories = cursor.fetchall()
    return [category[0] for category in categories]  # Devolver una lista con las categorías

@app.get("/books")
def get_books():
    cursor.execute("SELECT * FROM books")
    books = cursor.fetchall()
    return [{"id": row[0], "title": row[1], "author": row[2], "year": row[3], "price": row[4], "category": row[5],"quantity": row[6]} for row in books]


@app.post("/books")
def add_book(book: Book):
    query = "INSERT INTO books (title, author, year, price, category) VALUES (%s, %s, %s, %s, %s)"
    values = (book.title, book.author, book.year, book.price, book.category)
    cursor.execute(query, values)
    conn.commit()
    return {"message": "Libro agregado con éxito"}


@app.put("/books/{book_id}")
def update_book(book_id: int, book: Book):
    query = "UPDATE books SET title = %s, author = %s, year = %s, price = %s, category = %s WHERE id = %s"
    values = (book.title, book.author, book.year, book.price, book.category, book_id)
    cursor.execute(query, values)
    conn.commit()
    return {"message": "Libro actualizado con éxito"}

@app.delete("/books/{book_id}")
def delete_book(book_id: int):
    query = "DELETE FROM books WHERE id = %s"
    cursor.execute(query, (book_id,))
    conn.commit()
    return {"message": "Libro eliminado con éxito"}
    

