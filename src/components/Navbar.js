import React from 'react';
import './App.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <img src="./Tamasha.png" alt="Tiketi Tamasha" />
        <p>Tiketi Tamasha</p>
      </div>
      <ul className="navbar-nav">
      <li className="nav-item">
          <a href="/" className="nav-link">Dashboard</a>
        </li>
        <li className="nav-item">
          <a href="/" className="nav-link">Home</a>
        </li>
        <li className="nav-item">
          <a href="/about-us" className="nav-link">About Us</a>
        </li>
        <li className="nav-item">
          <a href="/login" className="nav-link">Login</a>
        </li>
        <li className="nav-item-cart">
          <a href="/cart" className="nav-link">
            <img src="./Cart.png" alt="Cart" className="cart-icon" />
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
