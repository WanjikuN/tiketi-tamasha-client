import React from 'react';
import './ShoppingCart.css';
import { useState } from 'react';
import {  NavLink } from "react-router-dom"

export default function ShoppingCart({ cart, onClose, removeFromCart }) {
  console.log('Cart items:', cart);
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
    return cart.reduce((total, item) => total + calculateAmount(item), 0);
};
  return (
    <div className="shopping-cart">
      <div className="cart-header">
        <h3>Shopping Cart</h3>
        <button id="close" onClick={onClose}>X</button>
      </div>
      <div className="cart-items">
      <h2 id="total">Total: $ {calculateTotalPrice().toFixed(2)}</h2>
      {
           cart.length === 0 ? null: <NavLink to="/checkout" style={{color: "black"}}><h2>Proceed to Checkout</h2></NavLink> 
            }
        {cart.length === 0 ? (
          <p>Cart is empty</p>
        ) : (
          cart.map((item) => (
            <div id="cart_details" key={item.id+item.ticketType}>
              <div id="cart_img">
                <img id="c_img" src={item.images} alt={item.event_name} />
              </div>
              <div id="cart_dets">
                <h4>{item.event_name}</h4>
                <p>{item.ticketType}</p>
                <p>${calculateAmount(item).toFixed(2)}</p>
              </div>
              <div id="inc">
              </div>
              <div id="delete">
              <button id="close" style={{ backgroundColor: "white", color: "black" }} onClick={() => removeFromCart(item.cartItemId)}>X</button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
