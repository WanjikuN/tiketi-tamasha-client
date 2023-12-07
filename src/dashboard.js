import React, { useState, useEffect } from 'react';
import './styles/dashboard.css';

const AdminDashboard = () => {
  const [events, setEvents] = useState([]);
  const [organizers, setOrganizers] = useState([]);
  const [customers, setCustomers] = useState([]); // Define customers state
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const eventsResponse = await fetch('http://localhost:5000/events');
        const eventsData = await eventsResponse.json();
        setEvents(eventsData);

        const organizersResponse = await fetch('http://localhost:5000/users?role_id=1');
        const organizersData = await organizersResponse.json();
        setOrganizers(Array.isArray(organizersData) ? organizersData : []);

        const customersResponse = await fetch('http://localhost:5000/users?role_id=2');
        const customersData = await customersResponse.json();
        setCustomers(Array.isArray(customersData) ? customersData : []);

        const paymentsResponse = await fetch('http://localhost:5000/payments');
        const paymentsData = await paymentsResponse.json();
        setPayments(paymentsData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);


  return (
    <div>
      <h1>Admin Dashboard</h1>
      
      {/* Events Table */}
      <div>
        <h2>Events</h2>
        <table>
          <thead>
            <tr>
              <th>Event Name</th>
              <th>Location</th>
              <th>Start Time</th>
              <th>End Time</th>
              <th>Available Tickets</th>
            </tr>
          </thead>
          <tbody>
            {events.map(event => (
              <tr key={event.id}>
                <td>{event.event_name}</td>
                <td>{event.location}</td>
                <td>{event.start_time}</td>
                <td>{event.end_time}</td>
                <td>{event.available_tickets}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Organizers Table */}
      <div>
        <h2>Organizers</h2>
        <table>
          <thead>
            <tr>
              <th>Email</th>
              <th>Phone Number</th>
            </tr>
          </thead>
          <tbody>
            {organizers.map(organizer => (
              <tr key={organizer.id}>
                <td>{organizer.email}</td>
                <td>{organizer.phone_number}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Customers Table */}
      <div>
        <h2>Customers</h2>
        <table>
          <thead>
            <tr>
              <th>Email</th>
              <th>Phone Number</th>
            </tr>
          </thead>
          <tbody>
            {customers.map(customer => (
              <tr key={customer.id}>
                <td>{customer.email}</td>
                <td>{customer.phone_number}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Payments Table */}
      <div>
        <h2>Payments</h2>
        <table>
          <thead>
            <tr>
              <th>Amount</th>
              <th>Payment Type</th>
              <th>Status</th>
              <th>Payment Date</th>
            </tr>
          </thead>
          <tbody>
            {payments.map(payment => (
              <tr key={payment.id}>
                <td>{payment.amount}</td>
                <td>{payment.payment_type}</td>
                <td>{payment.status}</td>
                <td>{payment.payment_date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminDashboard;