import React from 'react';
import { Link } from 'react-router-dom';

function Cart({ cart, setCart }) {
  const IGV_RATE = 0.18;

  // Calcular el precio total
  const totalPrice = cart.reduce((sum, item) => sum + parseFloat(item.price), 0);
  const igv = totalPrice * IGV_RATE;
  const totalWithIgv = totalPrice + igv;

  // Eliminar un libro del carrito
  const removeFromCart = (index) => {
    const updatedCart = [...cart];
    updatedCart.splice(index, 1);
    setCart(updatedCart);
  };

  // Función de compra (simulada)
  const handlePurchase = () => {
    alert("¡Compra realizada con éxito! Gracias por tu compra.");
    setCart([]); // Vaciamos el carrito después de la compra
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Carrito de Compras</h2>
      {cart.length === 0 ? (
        <p className="text-center">Tu carrito está vacío. <Link to="/">¡Continúa comprando!</Link></p>
      ) : (
        <>
          <ul className="list-group mb-4">
            {cart.map((item, index) => (
              <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                <div>
                  <strong>{item.title}</strong> - S/ {parseFloat(item.price).toFixed(2)}
                </div>
                <button className="btn btn-danger btn-sm" onClick={() => removeFromCart(index)}>
                  Eliminar
                </button>
              </li>
            ))}
          </ul>

          <div className="text-end mb-4">
            <p>Subtotal: S/ {totalPrice.toFixed(2)}</p>
            <p>IGV (18%): S/ {igv.toFixed(2)}</p>
            <h5>Total: S/ {totalWithIgv.toFixed(2)}</h5>
          </div>

          <div className="d-flex justify-content-between">
            <Link to="/" className="btn btn-secondary">Continuar Comprando</Link>
            <button className="btn btn-success" onClick={handlePurchase}>Comprar</button>
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;
