import React, { useState, useEffect } from 'react';
import './components/App.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Authentication from './components/Authentication';
import LandingPage from './components/LandingPage';
import { Routes, Route, Link } from 'react-router-dom';
import Checkout from './components/checkout';
import EventDetails from './components/EventDetails';
import { useCart } from './components/CartContext';
import ShoppingCart from './components/cart';
import OrdersHistory from './components/OrdersHistory';
const App = () => {
  
  const { cart, addToCart, removeFromCart, emptyCart } = useCart();
  console.log(cart)
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    document.title = 'Tiketi Tamasha';
  }, []);

  return (
    <div className="App">
      <Navbar cartLength={cart.length} cart={cart} removeFromCart={removeFromCart}/>
      <Routes>
        <Route exact path="/" element={<LandingPage />} />
        <Route path="/signup" element={<Authentication setIsLoggedIn={setIsLoggedIn}  isLoggedIn={isLoggedIn}/>} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/orders" element={< OrdersHistory />} />
        <Route path="/events/:eventId" element={<EventDetails carts={cart} removeFromCart={removeFromCart}/>} />
        <Route
          path="/cart"
          element={<ShoppingCart cart={cart} addToCart={addToCart} removeFromCart={removeFromCart} />}
        />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
