import React from 'react';
import './App.css'; 
import { useState } from 'react';
import ShoppingCart from './cart';
import { Link } from 'react-router-dom';
import { NavLink } from "react-router-dom";
const Navbar = ({ cartLength, cart, removeFromCart, isLoggedIn ,setIsLoggedIn}) => {
  const [isCartOpen, setIsCartOpen] = useState(false);

  const handleLogout = () => {
    if (isLoggedIn ) {
      setIsLoggedIn(!isLoggedIn)
    }
  };

  const handleOpenCart = () => {
    setIsCartOpen(true);
  };

  const handleCloseCart = () => {
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
        
       
          <>
            <li className="nav-item">
              <Link to="/orders" className="nav-link">Orders</Link>
            </li>
            <li className="nav-item-cart">
              <a onClick={handleOpenCart} className="nav-link">
                <img src="./Cart.png" alt="Cart" className="cart-icon" />
                <p id="count">{cartLength}</p>
              </a>
              {isCartOpen && (
                <ShoppingCart cart={cart} onClose={handleCloseCart} removeFromCart={removeFromCart}/>
              )}
            </li>
          </>
        
          <li className="nav-item">
          <NavLink style={{padding:"20px", color:"white", textDecoration: "none","&:hover": {borderBottom:"1px-solid-white"}}} to="/signup" onClick={handleLogout}>{isLoggedIn? "Logout":"Login"}</NavLink>
          </li>
       
      </ul>
    </nav>
  );
};

export default Navbar;
