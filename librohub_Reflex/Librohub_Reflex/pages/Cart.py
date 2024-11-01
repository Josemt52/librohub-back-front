# pages/Cart.py
import reflex as rx

class Cart(rx.Component):
    def render(self):
        return rx.container(
            rx.heading("Carrito de Compras", size="2"),
            # Más elementos aquí
        )
