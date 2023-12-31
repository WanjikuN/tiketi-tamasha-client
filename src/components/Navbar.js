import React from 'react';
import './App.css'; 
import { useState , useEffect} from 'react';
import ShoppingCart from './cart';
import { Link } from 'react-router-dom';
import { NavLink } from "react-router-dom";
import { useSnackbar } from "notistack"; 
const Navbar = ({ cartLength, cart, removeFromCart, isLoggedIn ,setIsLoggedIn,userData, updateUserData}) => {
  const { enqueueSnackbar } = useSnackbar(); 
  const [isCartOpen, setIsCartOpen] = useState(false);
  // console.log(userData.userData.role_id)

  const handleLogout = async () => {
    try {
      const response = await fetch("http://127.0.0.1:5000/logout", {
        method: "DELETE",
        credentials: "include",
      });
  
      if (response.ok) {
        
        setIsLoggedIn(false);
        updateUserData(null)
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
  // useEffect(() => {
  //   // Check if there's a user in local storage when the component mounts
  //   const userFromStorage = JSON.parse(localStorage.getItem('user'));
  //   setIsLoggedIn(!!userFromStorage); // Set isLoggedIn to true if there's a user, otherwise false
  // }, []); // Empty dependency array to run this effect only once when the component mounts

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <img src="./Tamasha.png" alt="Tiketi Tamasha" />
       
        <Link style={{padding:"2px", fontSize: "20px",fontWeight: "bolder",color:"white", textDecoration: "none","&:hover": {borderBottom:"1px-solid-white"}}} to="/" >Tiketi Tamasha</Link>


      </div>
          <ul className="navbar-nav">
            
            {userData && userData.userData && userData.userData.role_id === 1 && (
              <>
                <Link className="nav-item nav-link" to='/about-us'>
                  About Us
                </Link>
                <Link to="/admin" className="nav-link">Dashboard</Link>

                <li className="nav-item">
                <NavLink style={{padding:"20px", color:"white", textDecoration: "none","&:hover": {borderBottom:"1px-solid-white"}}} to="/signup" onClick={handleLogout}>{isLoggedIn? "Logout":"Login"}</NavLink>
              
                </li>
              </>
            )}
            {userData && userData.userData && userData.userData.role_id === 2 && isLoggedIn &&(
              <>
               
                <Link className="nav-item nav-link" to='/about-us'>
                  About Us
                </Link>
                <Link to="/dashboard" className="nav-link">Dashboard</Link>
                
                
                <li className="nav-item">
                <NavLink style={{padding:"20px", color:"white", textDecoration: "none","&:hover": {borderBottom:"1px-solid-white"}}} to="/signup" onClick={handleLogout}>{isLoggedIn? "Logout":"Login"}</NavLink>
                </li>
               
              </>
            )}
            {(userData && userData.userData && userData.userData.role_id === 3 && isLoggedIn)  && (
              <>
                     
              <Link to='/' className="nav-item nav-link"> Home</Link>
                <li className="nav-item">
                  <Link to="/orders" className="nav-link">Orders</Link>
                  
                </li>
                <Link className="nav-item nav-link" to='/about-us'>
                  About Us
                </Link>
                <li className="nav-item-cart">
                  <a onClick={handleOpenCart} className="nav-link">
                    <p id="count"> <img src="./Cart.png" alt="Cart" className="cart-icon" />
                      {cartLength}</p>
                  </a>
                  {isCartOpen && (
                    <ShoppingCart cart={cart} onClose={handleCloseCart} removeFromCart={removeFromCart} />
                  )}
                </li>
                
                <li className="nav-item">
                  <NavLink style={{padding:"20px", color:"white", textDecoration: "none","&:hover": {borderBottom:"1px-solid-white"}}} to="/signup" onClick={handleLogout}>{isLoggedIn? "Logout":"Login"}</NavLink>
                  </li>
                
              </>
            )}
            {(!userData || !userData.userData || !isLoggedIn ) &&(
              <>
               
              <Link to='/' className="nav-item nav-link"> Home</Link>
                <li className="nav-item">
                  <Link to="/orders" className="nav-link">Orders</Link>
                  
                </li>
                <Link className="nav-item nav-link" to='/about-us'>
                  About Us
                </Link>
                <li className="nav-item-cart">
                  <a onClick={handleOpenCart} className="nav-link">
                    <p id="count"> <img src="./Cart.png" alt="Cart" className="cart-icon" />
                      {cartLength}</p>
                  </a>
                  {isCartOpen && (
                    <ShoppingCart cart={cart} onClose={handleCloseCart} removeFromCart={removeFromCart} />
                  )}
                </li>
                
                <li className="nav-item">
                  <NavLink style={{padding:"20px", color:"white", textDecoration: "none","&:hover": {borderBottom:"1px-solid-white"}}} to="/signup" onClick={handleLogout}>{isLoggedIn? "Logout":"Login"}</NavLink>
                  </li>
                
              </>
            )}
          </ul>

    </nav>
  );
};

export default Navbar;