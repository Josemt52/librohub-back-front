# ui/Button.py
import reflex as rx

def Button(text: str, on_click):
    return rx.button(text, on_click=on_click, style={"padding": "10px", "backgroundColor": "#007BFF", "color": "white"})
