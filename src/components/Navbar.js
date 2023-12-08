import React from 'react';
import './App.css'; 
import { useState , useEffect} from 'react';
import ShoppingCart from './cart';
import { Link,useLocation } from 'react-router-dom';
import { NavLink } from "react-router-dom";
import { useSnackbar } from "notistack"; 

const Navbar = ({ cartLength, cart, removeFromCart, isLoggedIn, setIsLoggedIn, userType }) => {
  const { enqueueSnackbar } = useSnackbar();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const location = useLocation();

  const handleLogout = async () => {
    try {
      const response = await fetch('http://localhost:5000/logout', {
        method: 'DELETE',
        credentials: 'include',
      });

      if (response.ok) {
        setIsLoggedIn(false);
        enqueueSnackbar('User logged out successfully', { variant: 'success' });
      } else {
        enqueueSnackbar('Logout failed', { variant: 'error' });
      }
    } catch (error) {
      console.error('Error during logout:', error);
      enqueueSnackbar('Error during logout', { variant: 'error' });
    }
  };

  const handleOpenCart = () => {
    setIsCartOpen(true);
  };

  const handleCloseCart = () => {
    setIsCartOpen(false);
  };

  const isDashboard = location.pathname === '/dashboard';
  const isAdmin = location.pathname === '/admin';

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <img src="./Tamasha.png" alt="Tiketi Tamasha" />
        {(isDashboard || isAdmin) && 
        <Link to="/">Tiketi Tamasha</Link>}
      </div>
      <ul className="navbar-nav">
        {isDashboard && (
          <>
            <li>
              <NavLink to="/about-us" render={() => userType === 'organizer' && <span>About Us</span>} />
            </li>
            {/* <li>
              <NavLink to "/about-us">About us</NavLink>
            </li> */}
            <li>
              <NavLink to="/about-us">About Us</NavLink>
            </li>
          </>
        )}

        {isAdmin && (
          <>
            <li>
            <Link to="/">Home</Link>
            </li>
            <li>
              <NavLink to="/about-us" render={() => userType === 'admin' && <span>About Us</span>} />
            </li>
            <li>
              <NavLink to="/orders">Orders</NavLink>
            </li>
            <li>
              <NavLink to="/history">History</NavLink>
            </li>
            
            <li>
              <NavLink to="/login">Login</NavLink>
            </li>
          </>
        )}

        {!isDashboard && !isAdmin && (
          <>
            
            <li>
              <NavLink to="/about-us">About Us</NavLink>
            </li>
            <li>
              <NavLink to="/orders">Orders</NavLink>
            </li>
            <li>
              <NavLink to="/">Home</NavLink>
            </li>
            <li>
              <a onClick={handleOpenCart}>
                <p id="count">
                  <img src="./Cart.png" alt="Cart" />
                  {cartLength}
                </p>
              </a>
              {isCartOpen && <ShoppingCart cart={cart} onClose={handleCloseCart} removeFromCart={removeFromCart} />}
            </li>
          </>
        )}

        {isLoggedIn && !isDashboard && (
          <>
            
            <li>
              <NavLink to="/orders">Orders</NavLink>
            </li>
            <li>
              <a onClick={handleOpenCart}>
                <p id="count">
                  <img src="./Cart.png" alt="Cart" />
                  {cartLength}
                </p>
              </a>
              {isCartOpen && <ShoppingCart cart={cart} onClose={handleCloseCart} removeFromCart={removeFromCart} />}
            </li>
          </>
        )}

        {isLoggedIn && !isDashboard && userType === 'user' && (
          <>

            <li>
              <NavLink to="/home">Home</NavLink>
            </li>
            <li>
              <NavLink to="/about-us" render={() => userType === 'user' && <span>About Us</span>} />
            </li>
            <li>
              <NavLink to="/login">Login</NavLink>
            </li>
            <li>
              <NavLink to="/order">Order</NavLink>
            </li>
          </>
        )}

        {isLoggedIn && !isDashboard && userType === 'organizer' && (
          <>
            
            <li>
              <NavLink to="/dashboard">Dashboard</NavLink>
            </li>
          </>
        )}

        <li>
          <NavLink to="/signup" onClick={handleLogout}>
            {isLoggedIn ? 'Logout' : 'Login'}
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;