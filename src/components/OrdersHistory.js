import React, { useState, useEffect } from 'react';
import './OrderHistory.css';

const OrderHistory = () => {
    const [orders, setOrders] = useState([]);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [authToken, setAuthToken] = useState(null);

    const sampleOrders = [
        {
            event_id: 5,
            event_name: 'Champee',
            payment_date: '2023-12-01',
            payment_type: 'Card',
            payer_phone: '123-456-7890',
            amount: 100.00,
            status: 'Processed',
        },
        {
            event_id: 2,
            event_name: 'Tamasha',
            payment_date: '2023-12-01',
            payment_type: 'Card',
            payer_phone: '123-456-7890',
            amount: 100.00,
            status: 'Processed',
        },
        {
            event_id: 3,
            event_name: 'Ticket Washa',
            payment_date: '2023-12-01',
            payment_type: 'Card',
            payer_phone: '123-456-7890',
            amount: 100.00,
            status: 'Processed',
        },
        {
            event_id: 4,
            event_name: 'Octobafest',
            payment_date: '2023-12-01',
            payment_type: 'Mpesa',
            payer_phone: '25470078923',
            amount: 1000.00,
            status: 'Processed',
        },
        {
            event_id: 1,
            event_name: 'NovFest',
            payment_date: '2024-12-01',
            payment_type: 'Card',
            payer_phone: '123-456-7890',
            amount: 100.00,
            status: 'Processed',
        },
        {
            event_id: 6,
            event_name: 'Dec Tamasha',
            payment_date: '2023-12-01',
            payment_type: 'Card',
            payer_phone: '123-456-7890',
            amount: 100.00,
            status: 'Processed',
        },
       
    ];

    useEffect(() => {
        // Check if the user is logged in and get the authentication token from localStorage
        const userIsLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
        const userAuthToken = localStorage.getItem('authToken');

        // Set the state based on authentication logic
        setIsLoggedIn(userIsLoggedIn);
        setAuthToken(userAuthToken);

        // Fetch processed events from the backend
        const apiUrl = 'http://localhost:5000/payments';

        console.log('Before fetch:', apiUrl);

        fetch(apiUrl, {
            credentials: 'include',
            headers: {
                Authorization: `Bearer ${authToken}`,
                'Content-Type': 'application/json',
            },
        })
            .then(response => {
                console.log('Fetch response:', response);
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                console.log('Data received from the server:', data);
                setOrders(userIsLoggedIn ? data : sampleOrders);
            })
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





