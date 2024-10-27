from reflex import Component, html

import requests

API_BASE_URL = "http://127.0.0.1:8000"  
@component
def CatalogoLibros():
    libros = []
    categorias = []
    categoria_seleccionada = ("Todas las Categorías")

    # Función para cargar los libros de la API
    def cargar_libros():
        response = requests.get(f"{API_BASE_URL}/books")
        if response.status_code == 200:
            libros.set(response.json())

    # Función para cargar las categorías de la API
    def cargar_categorias():
        response = requests.get(f"{API_BASE_URL}/categories")
        if response.status_code == 200:
            categorias.set(response.json())

    # Función para filtrar libros por categoría
    def filtrar_libros(categoria):
        categoria_seleccionada.set(categoria)
        if categoria == "Todas las Categorías":
            cargar_libros()
        else:
            response = requests.get(f"{API_BASE_URL}/books/category/{categoria}")
            if response.status_code == 200:
                libros.set(response.json())

    # Cargar datos al iniciar el componente
    cargar_libros()
    cargar_categorias()

    return html.div(
        [
            html.h1("Catálogo de Libros", style={"color": "white", "text-align": "center"}),
            # Filtros de categorías
            html.div(
                [
                    html.button("Todas las Categorías", on_click=lambda: filtrar_libros("Todas las Categorías")),
                    *[html.button(categoria, on_click=lambda categoria=categoria: filtrar_libros(categoria)) for categoria in categorias.get()]
                ],
                style={
                    "display": "flex",
                    "gap": "10px",
                    "justify-content": "center",
                    "margin-bottom": "20px",
                }
            ),
            # Lista de libros
            html.div(
                [
                    html.div(
                        [
                            html.h3(libro["title"], style={"font-weight": "bold", "color": "white"}),
                            html.p(f"Autor: {libro['author']}", style={"color": "lightgray"}),
                            html.p(f"Precio: S/ {libro['price']}", style={"color": "lightgray"}),
                            html.p(f"Categoría: {libro['category']}", style={"color": "lightgray"}),
                            html.button("Agregar al Carrito", style={"margin-top": "10px"})
                        ],
                        style={
                            "background-color": "#2d2d45",
                            "padding": "15px",
                            "border-radius": "8px",
                            "box-shadow": "0px 4px 10px rgba(0, 0, 0, 0.2)",
                            "margin": "10px",
                        }
                    )
                    for libro in libros.get()
                ],
                style={
                    "display": "grid",
                    "grid-template-columns": "repeat(auto-fill, minmax(200px, 1fr))",
                    "gap": "20px",
                }
            )
        ],
        style={
            "text-align": "center",
            "padding": "20px",
            "background-color": "#1a1a2e",
            "min-height": "100vh"
        }
    )
