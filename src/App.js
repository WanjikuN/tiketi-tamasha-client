import React from 'react';
import './components/App.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
<<<<<<< HEAD
import AboutUs from './components/AboutUs';
=======
import SignUp from './components/SignUp';
import LandingPage from './components/LandingPage';
import { Routes, Route, Link} from 'react-router-dom';
import Login from './components/login';
import Checkout from './components/checkout';
import EventDetails from './components/EventDetails';
>>>>>>> origin/develop

const App = () => {
  return (
    <div className="App">
<<<<<<< HEAD
      <Navbar />
      <AboutUs />
=======
       <Navbar />
      <Routes>
        <Route exact path='/' element={<LandingPage />} />
        <Route exact path='signup/' element={<SignUp />} />
        <Route exact path='login/' element={<Login />} />
        <Route path="/checkout" element={<Checkout />} />       
        <Route path="/events/:eventId" element={<EventDetails/>} />

      
      </Routes>
>>>>>>> origin/develop
      <Footer />
     </div>
  );
};

export default App;
