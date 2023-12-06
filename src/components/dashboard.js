import React, { useState, useEffect } from 'react';

const AdminDashboard = () => {
  const [events, setEvents] = useState([]);
  const [organizers, setOrganizers] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/events')
      .then(response => response.json())
      .then(data => {
        setEvents(data);
      })
      .catch(error => {
        console.error('Error fetching events:', error);
      });

    fetch('http://localhost:5000/users?role_id=1')
      .then(response => response.json())
      .then(data => {
        setOrganizers(data);
      })
      .catch(error => {
        console.error('Error fetching organizers:', error);
      });

    fetch('http://localhost:5000/users?role_id=2')
      .then(response => response.json())
      .then(data => {
        setCustomers(data);
      })
      .catch(error => {
        console.error('Error fetching customers:', error);
      });

    fetch('http://localhost:5000/payments')
      .then(response => response.json())
      .then(data => {
        setPayments(data);
      })
      .catch(error => {
        console.error('Error fetching payments:', error);
      });
  }, []);

  return (
    <div>
      <h1>Admin Dashboard</h1>

      {/* Display Events, Organizers, Customers, and Payments */}
    </div>
  );
};

export default AdminDashboard;
