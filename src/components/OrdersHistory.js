import React, { useState, useEffect } from 'react';
import './OrderHistory.css';



const OrderHistory = () => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        // Fetch processed events from the backend
        fetch('https://tiketi-tamasha-backend.onrender.com/lnmo')
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => setOrders(data))
            .catch(error => console.error('Error fetching processed events:', error));
    }, []);

    return (
      <div className="order-history-container">
          <h2>Processed Orders</h2>
          <ul>
              {Array.isArray(orders) && orders.length > 0 ? (
                  orders.map(order => (
                      <li key={order.event_id} className="order-card">
                          Event Name: {order.event_name}<br />
                          Amount: {order.amount}<br />
                          Phone: {order.phone}<br />
                      </li>
                  ))
              ) : (
                  <p>No processed events available.</p>
              )}
          </ul>
      </div>
  );
};

export default OrderHistory;


