import React from 'react';
import './components/App.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import LandingPage from './components/LandingPage';

const App = () => {
  return (
    <div className="App">
      <Navbar />
      <Footer />
      <LandingPage />
    </div>
  );
};

export default App;
