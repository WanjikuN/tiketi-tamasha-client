import React, { useState, useEffect } from 'react';
import '../styles/dashboard.css';
import UserProfile from './UserProfile';

const AdminDashboard = ({userData}) => {
  const [activeTab, setActiveTab] = useState('Events');
  const [events, setEvents] = useState([]);
  const [payments, setPayments] = useState([]);
  const [isUserProfileModalOpen, setIsUserProfileModalOpen] = useState(false);
  const [users, setUsers] = useState([]);
  const fetchUsers = async () => {
    try {
      const usersResponse = await fetch('http://localhost:5000/users');
      const usersData = await usersResponse.json();
      setUsers(usersData);
    } catch (error) {
      console.error('Error fetching users data:', error);
    }
  };
  const [categories, setCategories] = useState([]);
  const fetchCategories = async () => {
    try {
      const categoriesResponse = await fetch('http://localhost:5000/categories');
      const categoriesData = await categoriesResponse.json();
      setCategories(categoriesData);
    } catch (error) {
      console.error('Error fetching categories data:', error);
    }
  };
  const handleUserProfileClick = () => {
    setIsUserProfileModalOpen(true);
  };
  const [roles, setRoles] = useState([]);
  const fetchRoles = async () => {
    try {
      const rolesResponse = await fetch('http://localhost:5000/roles');
      const rolesData = await rolesResponse.json();
      setRoles(rolesData);
    } catch (error) {
      console.error('Error fetching roles data:', error);
    }
  };
  const handleCloseUserProfileModal = () => {
    setIsUserProfileModalOpen(false);
  };
  const [newEventData, setNewEventData] = useState({
    event_name: '',
    location: '',
    start_time: '',
    end_time: '',
    available_tickets: 0,
  });
  const [newPaymentData, setNewPaymentData] = useState({
    amount: 0,
    payment_type: '',
    status: '',
    payment_date: '',
  });

  const itemsPerPage = 10;
  const [eventsCurrentPage, setEventsCurrentPage] = useState(1);
  const [eventsTotalPages, setEventsTotalPages] = useState(1);
  const [paymentsCurrentPage, setPaymentsCurrentPage] = useState(1);
  const [paymentsTotalPages, setPaymentsTotalPages] = useState(1);

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

  useEffect(() => {
    fetchEvents();
    fetchPayments();
    fetchRoles();
    fetchCategories();
    fetchUsers();
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

  const handleEventInputChange = (e) => {
    const { name, value } = e.target;
    setNewEventData({
      ...newEventData,
      [name]: value,
    });
  };

  const handlePaymentInputChange = (e) => {
    const { name, value } = e.target;
    setNewPaymentData({
      ...newPaymentData,
      [name]: value,
    });
  };

  const createEvent = async () => {
    try {
      const response = await fetch('http://localhost:5000/events', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newEventData),
      });

      if (response.ok) {
        setNewEventData({
          event_name: '',
          location: '',
          start_time: '',
          end_time: '',
          available_tickets: 0,
        });
        setEventsCurrentPage(1);
      } else {
        console.error('Failed to create event');
      }
    } catch (error) {
      console.error('Error creating event:', error);
    }
  };

  const createPayment = async () => {
    try {
      const response = await fetch('http://localhost:5000/payments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newPaymentData),
      });

      if (response.ok) {
        setNewPaymentData({
          amount: 0,
          payment_type: '',
          status: '',
          payment_date: '',
        });
        setPaymentsCurrentPage(1);
      } else {
        console.error('Failed to create payment');
      }
    } catch (error) {
      console.error('Error creating payment:', error);
    }
  };

  const deleteEvent = async (eventId) => {
    try {
      const response = await fetch(`http://localhost:5000/events/${eventId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setEventsCurrentPage(1);
      } else {
        console.error('Failed to delete event');
      }
    } catch (error) {
      console.error('Error deleting event:', error);
    }
  };

  const deletePayment = async (paymentId) => {
    try {
      const response = await fetch(`http://localhost:5000/payments/${paymentId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setPaymentsCurrentPage(1);
      } else {
        console.error('Failed to delete payment');
      }
    } catch (error) {
      console.error('Error deleting payment:', error);
    }
  };
  
  return (
    <div id="dashboard">
      <div id="left_nav">
        
        <button className='left_nav' onClick={handleUserProfileClick}>Profile</button>
        <button className='left_nav' onClick={() => setActiveTab('Organizers')}>Organizers</button>
        <button className='left_nav' onClick={() => setActiveTab('Users')}>Users</button>
        <button className='left_nav' onClick={() => setActiveTab('Categories')}>Categories</button>
        <button className='left_nav' onClick={() => setActiveTab('Roles')}>Roles</button>

          <button className='left_nav' onClick={() => setActiveTab('Events')}>Events</button>
          <button className='left_nav' onClick={() => setActiveTab('Payments')}>Payments</button>
        
      </div>
      <div className="dashboard-container">
          <h2>Admin Dashboard</h2>
          {activeTab === 'Users' && (
            <div>
              <h2>Users</h2>
              <table>
                <thead>
                  <tr>
                    <th>User</th>
                    <th>Email</th>
                    <th>Phone Number</th>
                   
                  </tr>
                </thead>
                <tbody>
                  {users.filter(user => user.role_id === 3)
                  .map(user => (
                    <tr key={user.id}>
                      <td>{user.username}</td>
                      <td>{user.email}</td>
                      <td>{user.phone_number}</td>
                      
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          {activeTab === 'Organizers' && (
            <div>
              <h2>Organizers</h2>
              <table>
                <thead>
                  <tr>
                    <th>Organizer</th>
                    <th>Email</th>
                    <th>Phone Number</th>
                   
                  </tr>
                </thead>
                <tbody>
                  {users.filter(user => user.role_id === 2)
                  .map(user => (
                    <tr key={user.id}>
                      <td>{user.username}</td>
                      <td>{user.email}</td>
                      <td>{user.phone_number}</td>
                      
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          {activeTab === 'Categories' && (
              <div>
                <h2>Categories</h2>
                <table>
                  <thead>
                    <tr>
                      <th>Category Name</th>
                    </tr>
                  </thead>
                  <tbody>
                    {categories.map(category => (
                      <tr key={category.id}>
                        <td>{category.name}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          {activeTab === 'Roles' && (
              <div>
                <h2>Roles</h2>
                <table>
                  <thead>
                    <tr>
                      <th>Role Name</th>
                    </tr>
                  </thead>
                  <tbody>
                    {roles.filter((role) => role.id !== 1) 
                    .map(role => (
                      <tr key={role.id}>
                        <td>{role.name}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
      {activeTab === 'Events' && (
      
      <div className="dashboard-cont">
        <h2>Events</h2>
          <table >
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
        )}
      
    

      {activeTab === 'Payments' && (
      
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
        <div className="pagination">
          <button onClick={handlePreviousPagePayments} disabled={paymentsCurrentPage === 1}>
            Previous Page
          </button>
          <span>Page {paymentsCurrentPage} of {paymentsTotalPages}</span>
          <button onClick={handleNextPagePayments} disabled={paymentsCurrentPage === paymentsTotalPages}>
            Next Page
          </button>
        </div>
      </div>)}
    </div>
    {isUserProfileModalOpen && (
        <UserProfile userData={userData} onClose={handleCloseUserProfileModal} />
      )}
    </div>
  );
};

export default AdminDashboard;
