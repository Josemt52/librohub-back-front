# Librohub_Reflex.py
import reflex as rx
from .navigation.Navbar import Navbar
from .pages.BookList import BookList
from .pages.Cart import Cart
from .auth.Login import Login
from .state import State
from .auth.Register import register_page  
from rxconfig import config

class State(rx.State):
    """El estado global de la aplicación."""
    user = rx.Var(None)  # Estado para el usuario actual
    books = rx.Var([])   # Estado para almacenar la lista de libros

    @staticmethod
    def fetch_books():
        """Método para obtener la lista de libros desde la API."""
        response = requests.get("http://localhost:8000/books")
        if response.status_code == 200:
            State.books.set(response.json())
        else:
            print("Error al obtener libros:", response.status_code)

def index() -> rx.Component:
    """Página de inicio."""
    return rx.container(
        Navbar(),  # Agrega la barra de navegación
        rx.vstack(
            rx.heading("Bienvenido a Librohub", size="8"),
            rx.text("Explora nuestro catálogo de libros."),
            rx.link(
                rx.button("Ver Catálogo"),
                href="/books",
                size="lg",
            ),
            spacing="5",
            justify="center",
            min_height="85vh",
        ),
    )

# Configuración de la aplicación
app = rx.App()

# Añadir páginas a la aplicación usando las funciones de cada página
app.add_page(index)                  # Página de inicio
app.add_page(BookList)               # Página de catálogo de libros
app.add_page(Cart)                   # Página del carrito
app.add_page(Login)                  # Página de inicio de sesión
app.add_page(register_page)          # Página de registro

if __name__ == "__main__":
    app.run()
