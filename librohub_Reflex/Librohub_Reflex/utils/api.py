from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI, HTTPException, Depends
from pydantic import BaseModel
import mysql.connector
from typing import List, Dict, Any

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  
    allow_credentials=True,
    allow_methods=["*"],  
    allow_headers=["*"],  
)

def get_db_cursor():
    conn = mysql.connector.connect(
        host="127.0.0.1",
        user="root", 
        password="jmtm", 
        database="librohub"
    )
    cursor = conn.cursor()
    return conn, cursor

class LoginData(BaseModel):
    username: str
    password: str

@app.post("/login")
def login(data: LoginData):
    conn, cursor = get_db_cursor()
    query = "SELECT role FROM users WHERE username = %s AND password = %s"
    cursor.execute(query, (data.username, data.password))
    result = cursor.fetchone()
    conn.close()

    if result:
        role = result[0]
        return {"message": "Login exitoso", "role": role}
    else:
        raise HTTPException(status_code=401, detail="Credenciales inválidas")

class RegisterData(BaseModel):
    username: str
    password: str

@app.post("/register")
def register(data: RegisterData):
    conn, cursor = get_db_cursor()
    query = "SELECT * FROM users WHERE username = %s"
    cursor.execute(query, (data.username,))
    existing_user = cursor.fetchone()
    
    if existing_user:
        conn.close()
        raise HTTPException(status_code=400, detail="El nombre de usuario ya está en uso")

    query = "INSERT INTO users (username, password, role) VALUES (%s, %s, 'user')"
    cursor.execute(query, (data.username, data.password))
    conn.commit()
    conn.close()
    
    return {"message": "Usuario registrado con éxito"}

class Book(BaseModel):
    title: str
    author: str
    year: int
    price: float
    category: str

@app.get("/books/category/{category}", response_model=List[Dict[str, Any]])
def get_books_by_category(category: str):
    conn, cursor = get_db_cursor()
    query = "SELECT * FROM books WHERE category = %s"
    cursor.execute(query, (category,))
    books = cursor.fetchall()
    conn.close()
    return [{"id": row[0], "title": row[1], "author": row[2], "year": row[3], "price": row[4], "category": row[5], "quantity": row[6]} for row in books]

@app.get("/categories", response_model=List[str])
def get_categories():
    conn, cursor = get_db_cursor()
    query = "SELECT DISTINCT category FROM books"
    cursor.execute(query)
    categories = cursor.fetchall()
    conn.close()
    return [category[0] for category in categories]  

@app.get("/books", response_model=List[Dict[str, Any]])
def get_books():
    conn, cursor = get_db_cursor()
    cursor.execute("SELECT * FROM books")
    books = cursor.fetchall()
    conn.close()
    return [{"id": row[0], "title": row[1], "author": row[2], "year": row[3], "price": row[4], "category": row[5], "quantity": row[6]} for row in books]

@app.post("/books")
def add_book(book: Book):
    conn, cursor = get_db_cursor()
    query = "INSERT INTO books (title, author, year, price, category) VALUES (%s, %s, %s, %s, %s)"
    values = (book.title, book.author, book.year, book.price, book.category)
    cursor.execute(query, values)
    conn.commit()
    conn.close()
    return {"message": "Libro agregado con éxito"}

@app.put("/books/{book_id}")
def update_book(book_id: int, book: Book):
    conn, cursor = get_db_cursor()
    query = "UPDATE books SET title = %s, author = %s, year = %s, price = %s, category = %s WHERE id = %s"
    values = (book.title, book.author, book.year, book.price, book.category, book_id)
    cursor.execute(query, values)
    conn.commit()
    conn.close()
    return {"message": "Libro actualizado con éxito"}

@app.delete("/books/{book_id}")
def delete_book(book_id: int):
    conn, cursor = get_db_cursor()
    query = "DELETE FROM books WHERE id = %s"
    cursor.execute(query, (book_id,))
    conn.commit()
    conn.close()
    return {"message": "Libro eliminado con éxito"}
