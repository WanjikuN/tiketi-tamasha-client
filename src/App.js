import React from 'react';
import './components/App.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AboutUs from './components/AboutUs';

const App = () => {
  return (
    <div className="App">
      <Navbar />
      <AboutUs />
      <Footer />
    </div>
  );
};

export default App;
