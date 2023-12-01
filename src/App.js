import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Authentication from './components/Authentication';
import SignUp from './components/SignUp';
import AboutUs from './components/AboutUs';
import LandingPage from './components/LandingPage';
import Checkout from './components/checkout';
import EventDetails from './components/EventDetails';
import { useCart } from './components/CartContext';
import ShoppingCart from './components/cart';
import OrdersHistory from './components/OrdersHistory';
import Dashboard from './components/Dashboard';

const App = () => {
  const { cart, addToCart, removeFromCart, emptyCart } = useCart();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    document.title = 'Tiketi Tamasha';
  }, []);
  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  const PrivateRoute = ({ path, element }) => {
    return isLoggedIn ? (
      element
    ) : (
      <Navigate to="/signup" />
    );
  };

  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route exact path='/' element={<LandingPage />} />
        <Route exact path='signup/' element={<SignUp />} />
        <Route path='about-us' element={<AboutUs />} />
        <Route path='dashboard/' element={<Dashboard />} />
        <Route exact path='login/' element={<Login />} />
        <Route path="/checkout" element={<Checkout />} />       
        <Route path="/events/:eventId" element={<EventDetails/>} />

      
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
