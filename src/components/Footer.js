import React from 'react';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h2>Contact Us</h2>
          <p>Email: info@ticket.tamasha.com</p>
          <p>Phone: +254 123-456-789</p>
        </div>
        <div className="footer-section">
          <h2>Quick Links</h2>
          <ul>
            <li><a href="#">Home</a></li>
            <li><a href="#">About Us</a></li>
            <li><a href="#">Services</a></li>
            <li><a href="#">Contact</a></li>
          </ul>
        </div>
        <div className="footer-section">
          <h2>Follow Us</h2>
          <div className="social-icons">
            <a href="#" className="icon-link"><img src="/Facebook.png" alt="Facebook" /></a>
            <a href="#" className="icon-link"><img src="/Twitter.png" alt="Twitter" /></a>
            <a href="#" className="icon-link"><img src="/Instagram.png" alt="Instagram" /></a>
          </div>
        </div>
      </div>
      
    </footer>
  );
};

export default Footer;
