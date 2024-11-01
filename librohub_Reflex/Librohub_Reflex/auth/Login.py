# auth/Login.py
import reflex as rx
import requests

class Login(rx.Component):
    username = rx.Var("")
    password = rx.Var("")

    @staticmethod
    def login():
        data = {"username": Login.username.get(), "password": Login.password.get()}
        response = requests.post("http://localhost:8000/login", json=data)
        if response.status_code == 200:
            print("Login exitoso")
        else:
            print("Error de login:", response.status_code)

    def render(self):
        return rx.form(
            rx.input(placeholder="Nombre de usuario", on_change=lambda text: Login.username.set(text)),
            rx.input(placeholder="Contraseña", type="password", on_change=lambda text: Login.password.set(text)),
            rx.button("Iniciar Sesión", on_click=Login.login)
        )
