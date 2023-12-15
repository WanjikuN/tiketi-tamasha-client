import React from 'react';
import './About.css';


const AboutUs = () => {
  return (
    <div className="about-us-container">
      <div className="about-us-content">
            <h2>Welcome to Tiketi Tamasha</h2>
            <p>
              Tiketi Tamasha is not just an online ticket-selling platform; we are
              your comprehensive online ticket and event management solution. We
              empower event managers to seamlessly host and sell tickets through
              our platform while providing robust tools to manage every aspect of
              their event, including ticket returns.
            </p>

        <div className='section'>
          <div className='text'>
            <h3>Our Mission</h3>
            <p>
              At Tiketi Tamasha, our mission is to revolutionize the event
              management landscape. We offer a platform that allows event managers
              to showcase their events, sell tickets effortlessly, and manage their
              event logistics, all in one place. We strive to simplify the event
              management process, making it accessible to everyone.
            </p>
          </div>
          <div className='image1'>
            <img src="https://www.scnsoft.com/_default_upload_bucket/automated-ticketing-system.png" alt="Image 2" />
          </div>
        </div>

        <div className='section'>
          <div className='image2'>
            <img src="https://www.cayzu.com/wp-content/uploads/all-features.png" alt="Image 3" />
          </div>
          <div className='text'>
            <h3>The Tiketi Tamasha Experience</h3>
            <p>
              What sets Tiketi Tamasha apart is our commitment to providing a
              seamless and feature-rich experience. Event managers can leverage our
              platform to create and customize their events, set ticket prices, and
              manage attendee data. From the convenience of event creation to
              real-time analytics, we cover every aspect of event management.
            </p>
          </div>
        </div>

        <div className='section'>
          <div className='text'>
            <div className="highlighted-section">
              <h3>Why Choose Tiketi Tamasha?</h3>
              <ul>
                <li>
                  <strong>Comprehensive Event Management:</strong> We offer a
                  one-stop solution for event managers, allowing them to host,
                  sell, and manage events efficiently.
                </li>
                <li>
                  <strong>Effortless Ticket Selling:</strong> Our platform enables
                  seamless ticket sales, providing event managers with tools to set
                  prices, manage inventory, and monitor sales in real time.
                </li>
                <li>
                  <strong>Robust Returns Management:</strong> Tiketi Tamasha allows
                  event managers to handle ticket returns with ease, ensuring
                  flexibility and convenience in managing attendee changes.
                </li>
                <li>
                  <strong>Analytics and Insights:</strong> Gain valuable insights
                  into your event's performance with our analytics tools, helping
                  you make informed decisions for future events.
                </li>
              </ul>
            </div>
          </div>
          <div className='image3'>
            <img src="https://www.itarian.com/images/simple-ticketing-system.png" alt="Image 2" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
