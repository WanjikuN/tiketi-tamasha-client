import React from 'react';
import './components/App.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import SignUp from './components/SignUp';
import LandingPage from './components/LandingPage';


const App = () => {
  return (
    <div className="App">
      <Navbar />
      <Footer />

      <SignUp/>

      <LandingPage />

     </div>
  );
};

export default App;
