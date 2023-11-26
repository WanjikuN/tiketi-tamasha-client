import React from 'react';
import './components/App.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import SignUp from './components/SignUp';
import LandingPage from './components/LandingPage';
import { Routes, Route, Link} from 'react-router-dom';
import Login from './components/login';
import Checkout from './components/checkout';
const App = () => {
  return (
    <div className="App">
       <Navbar />
      <Routes>
        <Route exact path='/' element={<LandingPage />} />
        <Route exact path='signup/' element={<SignUp />} />
        <Route exact path='login/' element={<Login />} />
        <Route path="/checkout" element={<Checkout />} /> 
      

      

      
      </Routes>
      <Footer />
     </div>
  );
};

export default App;
