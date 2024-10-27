import React from 'react';
import './Cart.css';

function Cart({ cart }) {
  return (
    <div className="cart">
      <h2>Carrito de Compras</h2>
      {cart.length > 0 ? (
        <ul>
          {cart.map((book, index) => (
            <li key={index}>
              <strong>{book.title}</strong> - S/ {book.price.toFixed(2)}
            </li>
          ))}
        </ul>
      ) : (
        <p>El carrito está vacío</p>
      )}
      {cart.length > 0 && <button onClick={() => alert('Compra realizada con éxito')}>Comprar</button>}
    </div>
  );
}

export default Cart;
