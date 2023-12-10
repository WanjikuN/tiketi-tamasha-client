import React, { useState, useEffect } from 'react';

const AdminDashboard = () => {
  const [events, setEvents] = useState([]);
  const [organizers, setOrganizers] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    fetch('https://tiketi-tamasha-backend.onrender.com/events')
      .then(response => response.json())
      .then(data => {
        setEvents(data);
      })
      .catch(error => {
        console.error('Error fetching events:', error);
      });

    fetch('https://tiketi-tamasha-backend.onrender.com/users?role_id=1')
      .then(response => response.json())
      .then(data => {
        setOrganizers(data);
      })
      .catch(error => {
        console.error('Error fetching organizers:', error);
      });

    fetch('https://tiketi-tamasha-backend.onrender.com/users?role_id=2')
      .then(response => response.json())
      .then(data => {
        setCustomers(data);
      })
      .catch(error => {
        console.error('Error fetching customers:', error);
      });

    fetch('https://tiketi-tamasha-backend.onrender.com/payments')
      .then(response => response.json())
      .then(data => {
        setPayments(data);
      })
      .catch(error => {
        console.error('Error fetching payments:', error);
      });
  }, []);

  return (
    <div style={{margin:'80px'}}>
      <h1>Admin Dashboard</h1>

      {/* Display Events, Organizers, Customers, and Payments */}
    </div>
  );
};

export default AdminDashboard;
