# navigation/Navbar.py
import reflex as rx

def Navbar() -> rx.Component:
    return rx.box(
        rx.hstack(
            rx.link("Inicio", href="/", padding="10px", font_weight="bold"),
            rx.link("Libros", href="/books", padding="10px"),
            rx.link("Carrito", href="/cart", padding="10px"),
            rx.link("Iniciar sesión", href="/login", padding="10px"),
            rx.link("Registrarse", href="/register", padding="10px"),
            spacing="20px",
        ),
        padding="10px",
        background_color="lightgray",
        width="100%",
    )
