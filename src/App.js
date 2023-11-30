import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Authentication from './components/Authentication';
import LandingPage from './components/LandingPage';
import Checkout from './components/checkout';
import EventDetails from './components/EventDetails';
import { useCart } from './components/CartContext';
import ShoppingCart from './components/cart';
import OrdersHistory from './components/OrdersHistory';

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
      <Navbar cartLength={cart.length} cart={cart} removeFromCart={removeFromCart} isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<Authentication setIsLoggedIn={setIsLoggedIn} isLoggedIn={isLoggedIn} />} />
        <Route path="/events/:eventId" element={<EventDetails carts={cart} removeFromCart={removeFromCart} />} />
        <Route path="/cart" element={<ShoppingCart cart={cart} addToCart={addToCart} removeFromCart={removeFromCart} />} />

        <Route
          path="/checkout"
          element={<PrivateRoute path="/checkout" element={<Checkout  />} />}
        />
        <Route
          path="/orders"
          element={<PrivateRoute path="/orders" element={<OrdersHistory />} />}
        />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
