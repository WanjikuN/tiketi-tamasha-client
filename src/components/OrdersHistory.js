import React, { useState, useEffect } from 'react';
import './OrderHistory.css';



const OrderHistory = () => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        // Fetch processed events from the backend
        fetch('http://localhost:5000/payments')
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
                            <b>Event ID</b>: {order.event_id}<br />
                            <b>Event Name</b>: {order.event_name}<br /> 
                            <b>Payment Date</b>: {order.payment_date}<br />
                            <b>Payment Type</b>: {order.payment_type}<br />
                            <b>Payer Phone</b>: {order.payer_phone}<br />
                            <b>Amount</b>: Kshs {order.amount}<br />
                            <b>Status</b>: {order.status}<br />
                      </li>
                  ))
              ) : (
                  <p>No processed orders available.</p>
              )}
          </ul>
      </div>
  );
};

export default OrderHistory;


