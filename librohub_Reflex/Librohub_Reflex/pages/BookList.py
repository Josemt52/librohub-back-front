# pages/BookList.py
import reflex as rx
import requests

class BookList(rx.Component):
    books = rx.Var([])

    @staticmethod
    def fetch_books():
        response = requests.get("http://localhost:8000/books")
        if response.status_code == 200:
            BookList.books.set(response.json())

    def render(self):
        self.fetch_books()
        return rx.container(
            rx.vstack(
                *[rx.box(
                    rx.text(f"Título: {book['title']}"),
                    rx.text(f"Autor: {book['author']}"),
                    padding="5",
                    border="1px solid #ddd",
                    margin="10px"
                ) for book in BookList.books.get()],
            ),
        )
