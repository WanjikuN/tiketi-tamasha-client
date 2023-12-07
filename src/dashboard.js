import React, { useState, useEffect } from 'react';
import './styles/dashboard.css';

const AdminDashboard = () => {
  const [events, setEvents] = useState([]);
  const [organizers, setOrganizers] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [payments, setPayments] = useState([]);

  const itemsPerPage = 10; // Number of items per page
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1); // To store total available pages

  useEffect(() => {
    const fetchData = async () => {
      try {
        const eventsResponse = await fetch(`http://localhost:5000/events?page=${currentPage}&limit=${itemsPerPage}`);
        const eventsData = await eventsResponse.json();
        setEvents(eventsData);

        const organizersResponse = await fetch(`http://localhost:5000/users?role_id=1&page=${currentPage}&limit=${itemsPerPage}`);
        const organizersData = await organizersResponse.json();
        setOrganizers(Array.isArray(organizersData) ? organizersData : []);

        const customersResponse = await fetch(`http://localhost:5000/users?role_id=2&page=${currentPage}&limit=${itemsPerPage}`);
        const customersData = await customersResponse.json();
        setCustomers(Array.isArray(customersData) ? customersData : []);

        const paymentsResponse = await fetch(`http://localhost:5000/payments?page=${currentPage}&limit=${itemsPerPage}`);
        const paymentsData = await paymentsResponse.json();
        setPayments(paymentsData);

       
        const totalPagesFromData = Math.ceil(eventsData.length / itemsPerPage);
        setTotalPages(totalPagesFromData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [currentPage]);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };


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
      
      {/* Pagination Controls */}
      <div className="pagination">
        <button onClick={handlePreviousPage} disabled={currentPage === 1}>
          Previous Page
        </button>
        <span>Page {currentPage} of {totalPages}</span>
        <button onClick={handleNextPage} disabled={currentPage === totalPages}>
          Next Page
        </button>
      </div>
    </div>
  );
};

export default AdminDashboard;