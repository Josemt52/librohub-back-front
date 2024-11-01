import reflex as rx
from Librohub_Reflex import State

def register_page():
    return rx.container(
        rx.input(
            placeholder="Nombre de usuario",
            on_change=lambda text: State.username.set(text),  # Usar `State.username.set`
            margin_bottom="10px"
        ),
        rx.input(
            placeholder="Contraseña",
            type="password",
            on_change=lambda text: State.password.set(text),  # Si tienes un estado `password`
            margin_bottom="10px"
        ),
        rx.button(
            "Registrarse",
            on_click=register_user,  # Suponiendo que `register_user` es la función para registrar al usuario
            margin_top="10px"
        ),
    )
