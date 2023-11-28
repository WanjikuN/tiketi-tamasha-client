import React from 'react';
import './App.css'; 
import { useState } from 'react';
import ShoppingCart from './cart';

const Navbar = ({cartLength,cart, removeFromCart}) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const handleOpenCart = () => {
    setIsCartOpen(true);
  };
  const handleCloseCart = () => {
    console.log(cart)
    setIsCartOpen(false);
  };
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <img src="./Tamasha.png" alt="Tiketi Tamasha" />
        <p>Tiketi Tamasha</p>
      </div>
      <ul className="navbar-nav">
        <li className="nav-item">
          <a href="/about-us" className="nav-link">About Us</a>
        </li>
        <li className="nav-item">
          <a href="/login" className="nav-link">Login</a>
        </li>
        <li className="nav-item-cart">
          
          <a onClick={handleOpenCart}className="nav-link">
            <img src="./Cart.png" alt="Cart" className="cart-icon" />
            <p id="count">{cartLength}</p>
          </a>
            {isCartOpen && (
              <ShoppingCart cart={cart} onClose={handleCloseCart} removeFromCart={removeFromCart}/>
            )}
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
