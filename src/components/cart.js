import React, { useState } from 'react';
import './ShoppingCart.css';
import { NavLink } from 'react-router-dom';

export default function ShoppingCart({ cart, onClose, removeFromCart }) {
  const [quantities, setQuantities] = useState({});

  const calculateAmount = (item) => {
    if (item.ticketType === 'Regular') {
      return parseFloat(item.regular_price);
    } else if (item.ticketType === 'VIP') {
      return parseFloat(item.MVP_price);
    } else {
      return parseFloat(item.early_booking_price);
    }
  };

  const calculateTotalPrice = () => {
    return cart.reduce(
      (total, item) => total + (calculateAmount(item)* (quantities[item.cartItemId] || 1)) ,
      0
    );
  };

  const incrementQuantity = (cartItemId) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [cartItemId]: (prevQuantities[cartItemId] || 1) + 1,
    }));
  };

  const decrementQuantity = (cartItemId) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [cartItemId]: Math.max((prevQuantities[cartItemId] || 1) - 1, 0),
    }));
  };

  return (
    <div className="shopping-cart">
      <div className="cart-header">
        <h3>Shopping Cart</h3>
        <button id="close" onClick={onClose}>
          X
        </button>
      </div>
      <div className="cart-items">
        {cart.length !== 0 && (
          <NavLink to="/checkout" style={{ color: 'black' }}>
            <button id="btn">Checkout</button>
          </NavLink>
        )}
        
            <h2 id="total">Total: $ {calculateTotalPrice().toFixed(2)}</h2>

        {cart.length === 0 ? (
          <p>Cart is empty</p>
        ) : (
          cart.map((item) => (
            <div id="cart_details" key={item.id + item.ticketType}>
              <div id="cart_img">
                <img id="c_img" src={item.images} alt={item.event_name} />
              </div>
              <div id="cart_dets">
                <h4>{item.event_name}</h4>
                <p>{item.ticketType}</p>
                <p>${(calculateAmount(item).toFixed(2))* (quantities[item.cartItemId] || 1)}</p>
              </div>
              <div id="quantity-controls">
                <button onClick={() => decrementQuantity(item.cartItemId)}>-</button>
                <span>{quantities[item.cartItemId] || 1}</span>
                <button onClick={() => incrementQuantity(item.cartItemId)}>+</button>
              </div>
              <div id="delete">
                <button
                  id="close"
                  style={{color: 'black' }}
                  onClick={() => removeFromCart(item.cartItemId)}
                >
                  X
                </button>
              </div>
            </div>
          ))
        )}
        
      </div>
    </div>
  );
}
