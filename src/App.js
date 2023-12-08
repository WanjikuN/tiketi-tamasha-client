import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Authentication from './components/Authentication';
import AboutUs from './components/AboutUs';
import LandingPage from './components/LandingPage';
import Checkout from './components/checkout';
import EventDetails from './components/EventDetails';
import { useCart } from './components/CartContext';
import ShoppingCart from './components/cart';
import OrdersHistory from './components/OrdersHistory';
import Dashboard from './components/Dashboard';
import AdminDashboard from './components/AdminDashboard';

const App = () => {
  const { cart, addToCart, removeFromCart, emptyCart } = useCart();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    document.title = 'Tiketi Tamasha';
  }, []);
 
  const updateUserData = (data) => {
    setUserData(data);
  };
  const PrivateRoute = ({ path, element }) => {
    return isLoggedIn ? (
      element
    ) : (
      setSuccessMessage('Redirecting to Login/signup...'),
      <Navigate to="/signup" />
    );
  };

  return (
    <div className="App">
      <Navbar setIsLoggedIn={setIsLoggedIn} isLoggedIn={isLoggedIn} cartLength={cart.length} cart={cart} removeFromCart={removeFromCart} />
      <Routes>
        <Route exact path="/" element={<LandingPage />} />
        <Route path="/signup" element={<Authentication setIsLoggedIn={setIsLoggedIn} isLoggedIn={isLoggedIn} updateUserData={updateUserData}/>} />
        <Route path="/events/:eventId" element={<EventDetails carts={cart} removeFromCart={removeFromCart} />} />
        <Route path="/cart" element={<ShoppingCart cart={cart} addToCart={addToCart} removeFromCart={removeFromCart} successMessage={successMessage} />} />
        <Route path="/dashboard" element={<Dashboard userData={userData} />}  />
        <Route path="/admin" element={<AdminDashboard />} />

        <Route
          path="/checkout"
          element={<PrivateRoute path="/checkout" element={<Checkout  userData={userData} emptyCart={emptyCart} />} />}
        />
        
        <Route
          path="/admin"
          element={<PrivateRoute path="/admin"element={<AdminDashboard/>} />}
        />
       
        <Route
          path="/dashboard"
          element={<PrivateRoute path="/dashboard" element={<Dashboard />} />}
        />
        <Route
          path="/orders"
          element={<PrivateRoute path="/orders" element={<OrdersHistory />} />}
        />
        <Route path='about-us' element={<AboutUs />} />
      
      
      
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
