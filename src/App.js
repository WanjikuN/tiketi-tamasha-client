import React from 'react';
import './components/App.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import SignUp from './components/SignUp';

const App = () => {
  return (
    <div className="App">
      <Navbar />
      <Footer />
      <SignUp/>
    </div>
  );
};

export default App;
