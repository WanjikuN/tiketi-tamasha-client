import React, { useState, useEffect } from 'react';
import './OrderHistory.css';

const OrderHistory = () => {
    // State variables for orders, login status, and authentication token
    const [orders, setOrders] = useState([]);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [authToken, setAuthToken] = useState(null);

    useEffect(() => {
        // Check if the user is logged in and get the authentication token from localStorage
        const userIsLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
        const userAuthToken = localStorage.getItem('authToken');

        // Set the state based on authentication logic
        setIsLoggedIn(userIsLoggedIn);
        setAuthToken(userAuthToken);

        // Fetch processed events from the backend
        const apiUrl = isLoggedIn ? 'http://localhost:5000/payments' : 'http://localhost:5000/payments';

        fetch(apiUrl, {
            credentials: 'include',
            headers: {
                Authorization: `Bearer ${authToken}`,
                'Content-Type': 'application/json',
            },
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => setOrders(data))
            .catch(error => console.error('Error fetching processed events:', error));
    }, [isLoggedIn, authToken]);

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



