import React, { useState, useEffect } from 'react';
import './styles/dashboard.css';

const AdminDashboard = () => {
  const [events, setEvents] = useState([]);
  const [organizers, setOrganizers] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [payments, setPayments] = useState([]);

  const itemsPerPage = 10;
  const [eventsCurrentPage, setEventsCurrentPage] = useState(1);
  const [eventsTotalPages, setEventsTotalPages] = useState(1);

  const [paymentsCurrentPage, setPaymentsCurrentPage] = useState(1);
  const [paymentsTotalPages, setPaymentsTotalPages] = useState(1);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const eventsResponse = await fetch(`http://localhost:5000/events?page=${eventsCurrentPage}&limit=${itemsPerPage}`);
        const eventsData = await eventsResponse.json();
        setEvents(eventsData);
        const totalPagesFromEvents = Math.ceil(eventsData.length / itemsPerPage);
        setEventsTotalPages(totalPagesFromEvents);
      } catch (error) {
        console.error('Error fetching events data:', error);
      }
    };

    const fetchPayments = async () => {
      try {
        const paymentsResponse = await fetch(`http://localhost:5000/payments?page=${paymentsCurrentPage}&limit=${itemsPerPage}`);
        const paymentsData = await paymentsResponse.json();
        setPayments(paymentsData);
        const totalPagesFromPayments = Math.ceil(paymentsData.length / itemsPerPage);
        setPaymentsTotalPages(totalPagesFromPayments);
      } catch (error) {
        console.error('Error fetching payments data:', error);
      }
    };

    fetchEvents();
    fetchPayments();
  }, [eventsCurrentPage, paymentsCurrentPage]);

  const handleNextPageEvents = () => {
    if (eventsCurrentPage < eventsTotalPages) {
      setEventsCurrentPage(eventsCurrentPage + 1);
    }
  };

  const handlePreviousPageEvents = () => {
    if (eventsCurrentPage > 1) {
      setEventsCurrentPage(eventsCurrentPage - 1);
    }
  };

  const handleNextPagePayments = () => {
    if (paymentsCurrentPage < paymentsTotalPages) {
      setPaymentsCurrentPage(paymentsCurrentPage + 1);
    }
  };

  const handlePreviousPagePayments = () => {
    if (paymentsCurrentPage > 1) {
      setPaymentsCurrentPage(paymentsCurrentPage - 1);
    }
  };

  return (
    <div>
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
        {/* Pagination Controls for Events */}
        <div className="pagination">
          <button onClick={handlePreviousPageEvents} disabled={eventsCurrentPage === 1}>
            Previous Page
          </button>
          <span>Page {eventsCurrentPage} of {eventsTotalPages}</span>
          <button onClick={handleNextPageEvents} disabled={eventsCurrentPage === eventsTotalPages}>
            Next Page
          </button>
        </div>
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
        {/* Pagination Controls for Payments */}
        <div className="pagination">
          <button onClick={handlePreviousPagePayments} disabled={paymentsCurrentPage === 1}>
            Previous Page
          </button>
          <span>Page {paymentsCurrentPage} of {paymentsTotalPages}</span>
          <button onClick={handleNextPagePayments} disabled={paymentsCurrentPage === paymentsTotalPages}>
            Next Page
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
