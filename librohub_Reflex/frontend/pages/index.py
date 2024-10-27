from reflex import component, html
from .catalogo import CatalogoLibros

@component
def Index():
    return html.div(
        [
            html.header(
                html.h1("Librohub - Catálogo de Libros", style={"color": "white", "text-align": "center"}),
                style={"background-color": "#8B0000", "padding": "10px"}
            ),
            CatalogoLibros(),  # Incluir el catálogo de libros
        ],
    )
