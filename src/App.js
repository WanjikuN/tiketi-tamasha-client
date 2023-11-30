import React from 'react';
import './components/App.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import SignUp from './components/SignUp';
import AboutUs from './components/AboutUs';
import LandingPage from './components/LandingPage';
import { Routes, Route, Link} from 'react-router-dom';
import Login from './components/login';
import Checkout from './components/checkout';
import EventDetails from './components/EventDetails';
import Dashboard from './components/Dashboard';

const App = () => {
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
