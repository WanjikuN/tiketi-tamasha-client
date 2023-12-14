import React, { useState, useEffect } from 'react';
import '../styles/dashboard.css';
import UserProfile from './UserProfile';


const AdminDashboard = ({userData}) => {
  const [activeTab, setActiveTab] = useState('Events');
  const [events, setEvents] = useState([]);
  const [payments, setPayments] = useState([]);
  const [isUserProfileModalOpen, setIsUserProfileModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [userEvents, setUserEvents] = useState([]);
  const [isUserEventsModalOpen, setIsUserEventsModalOpen] = useState(false);
  const [userFilters, setUserFilters] = useState({ name: '', email: '' });
  const [organizerFilters, setOrganizerFilters] = useState({ name: '', email: '' });
  const [categoryFilters, setCategoryFilters] = useState({ name: '' });
  const [roleFilters, setRoleFilters] = useState({ name: '' });
  const handleUserFilterChange = (filterName, value) => {
    setUserFilters((prevFilters) => ({ ...prevFilters, [filterName]: value }));
  };
  
  const handleOrganizerFilterChange = (filterName, value) => {
    setOrganizerFilters((prevFilters) => ({ ...prevFilters, [filterName]: value }));
  };
  
  const handleCategoryFilterChange = (filterName, value) => {
    setCategoryFilters((prevFilters) => ({ ...prevFilters, [filterName]: value }));
  };
  
  const handleRoleFilterChange = (filterName, value) => {
    setRoleFilters((prevFilters) => ({ ...prevFilters, [filterName]: value }));
  };
  
  const fetchUserEvents = async (userId) => {
    try {
      const userEventsResponse = await fetch(`http://127.0.0.1:5000/events?user_id=${userId}`);
      const userEventsData = await userEventsResponse.json();
      setUserEvents(userEventsData);
      setIsUserEventsModalOpen(true);
    } catch (error) {
      console.error('Error fetching user events:', error);
    }
  };

  const closeUserEventsModal = () => {
    setIsUserEventsModalOpen(false);
    setSelectedUser(null);
    setUserEvents([]);
  };

  const handleUserClick = (userId) => {
    setSelectedUser(userId);
    fetchUserEvents(userId);
  };
  const [users, setUsers] = useState([]);
  const itemsPerPage = 5;
  const fetchUsers = async () => {
    try {
      const usersResponse = await fetch('http://localhost:5000/users');
      const usersData = await usersResponse.json();
      setUsers(usersData);
    } catch (error) {
      console.error('Error fetching users data:', error);
    }
  };
  const[newCategoryData,setNewCategoryData] = useState('')
  const [isAddCategoryModalOpen, setIsAddCategoryModalOpen] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState('');
  const openAddCategoryModal = () => {
    setIsAddCategoryModalOpen(true);
  };
 
  const closeAddCategoryModal = () => {
    setIsAddCategoryModalOpen(false);
    setNewCategoryName('');
  };
  
 
  const handleNewCategoryNameChange = (e) => {
    setNewCategoryName(e.target.value);
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
  const handleNewCategoryInputChange = (e) => {
    const { value } = e.target;
    setNewCategoryData(value);
  };
  const addCategory = async () => {
    try {
      console.log('adding category: ' + newCategoryName);
      const response = await fetch('http://localhost:5000/categories', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: newCategoryName }),
      });

      if (response.ok) {
        setIsAddCategoryModalOpen(false)
        setNewCategoryData('')
        fetchCategories();
        
      } else {
        console.error('Failed to add category');
      }
    } catch (error) {
      console.error('Error adding category:', error);
    }
  };
  const [editRoleId, setEditRoleId] = useState(null);
  const handleEditRole = (roleId) => {
    setEditRoleId(roleId);
    console.log(roleId)
  };
  const [editCategoryId, setEditCategoryId] = useState(null);
  const handleEditCategory = (categoryId) => {
    setEditCategoryId(categoryId);
    console.log(categoryId)
  };
  const handleSaveCategory = async (categoryId, updatedCategory) => {
    try {
      console.log('Updating category:', updatedCategory);
      const response = await fetch(`http://localhost:5000/categories/${categoryId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedCategory),
      });
  
      if (response.ok) {
        setEditCategoryId(null);
        fetchCategories();
      } else {
        console.error('Failed to update category');
      }
    } catch (error) {
      console.error('Error updating category:', error);
    }
  };
  const handleSaveRole= async (roleId, updatedRole) => {
    try {
      console.log('Updating role:', updatedRole);
      const response = await fetch(`http://localhost:5000/roles/${roleId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedRole),
      });
  
      if (response.ok) {
        setEditRoleId(null);
        fetchRoles();
      } else {
        console.error('Failed to update role');
      }
    } catch (error) {
      console.error('Error updating role:', error);
    }
  };
  const handleCategoryInputChange = (categoryId, value) => {
    setCategories((prevCategories) => {
      return prevCategories.map((category) => {
        if (category.id === categoryId) {
          return { ...category, name: value };
        }
        return category;
      });
    });
  };
  const handleRoleInputChange = (roleId, value) => {
    setRoles((prevRoles) => {
      return prevRoles.map((role) => {
        if (role.id === roleId) {
          return { ...role, name: value };
        }
        return role;
      });
    });
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
  const [eventFilters, setEventFilters] = useState({
    eventName: '',
    location: '',
    startTime: '',
    endTime: '',
    
  });
  
  const handleEventFilterChange = (field, value) => {
    setEventFilters((prevFilters) => ({
      ...prevFilters,
      [field]: value,
    }));
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
          {/* <h2>Admin Dashboard</h2> */}
          {activeTab === 'Users' && (
            <div>
              <h2>Users</h2>
              <div id="event-filters">
                <label>
                  Name:
                  <input
                    type="text"
                    value={userFilters.name}
                    onChange={(e) => handleUserFilterChange('name', e.target.value)}
                  />
                </label>
                <label>
                  Email:
                  <input
                    type="text"
                    value={userFilters.email}
                    onChange={(e) => handleUserFilterChange('email', e.target.value)}
                  />
                </label>
              </div>
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
                  .filter((user) => {
                    const userNameMatch = user.username.toLowerCase().includes(userFilters.name.toLowerCase());
                    const userEmailMatch = user.email.toLowerCase().includes(userFilters.email.toLowerCase());
                    return userNameMatch && userEmailMatch;
                  })
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
          {isUserEventsModalOpen && (
          <div className="modal">
            <div className="modal-content">
              <span className="close" onClick={closeUserEventsModal}>
                &times;
              </span>
              <h2>Events</h2>
              <table>
                <thead>
                  <tr>
                    <th>Event Name</th>
                  </tr>
                </thead>
                <tbody>
                  {userEvents.map(event => (
                    <tr key={event.id}>
                      <td>{event.event_name}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
          {activeTab === 'Organizers' && (
            <div>
              <h2>Organizers</h2>
              <div id="event-filters">
                <label>
                  Name:
                  <input
                    type="text"
                    value={organizerFilters.name}
                    onChange={(e) => handleOrganizerFilterChange('name', e.target.value)}
                  />
                </label>
                <label>
                  Email:
                  <input
                    type="text"
                    value={organizerFilters.email}
                    onChange={(e) => handleOrganizerFilterChange('email', e.target.value)}
                  />
                </label>
              </div>
              <table>
                <thead>
                  <tr>
                    <th>Organizer</th>
                    <th>Email</th>
                    <th>Phone Number</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.filter(user => user.role_id === 2)
                  .filter((organizer) => {
                    const organizerNameMatch = organizer.username.toLowerCase().includes(organizerFilters.name.toLowerCase());
                    const orgEmailMatch = organizer.email.toLowerCase().includes(organizerFilters.email.toLowerCase());
                    return organizerNameMatch && orgEmailMatch;
                  })
                  .map(user => (
                    <tr key={user.id}>
                      <td>{user.username}</td>
                      <td>{user.email}</td>
                      <td>{user.phone_number}</td>
                      <td><button onClick={() => handleUserClick(user.id)}>View Events</button></td>


                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          {activeTab === 'Categories' && (
              <div>
                <h2>Categories</h2>
                <div id="event-filters">
                  <label>
                    Name:
                    <input
                      type="text"
                      value={categoryFilters.name}
                      onChange={(e) => handleCategoryFilterChange('name', e.target.value)}
                    />
                  </label>
                  <button onClick={openAddCategoryModal} style={{marginBottom:"5px", float:'right'}}>Add Category</button>

                </div>
                            {isAddCategoryModalOpen && (
                        <div className="modal">
                          <div className="modal-content">
                            <span className="close" onClick={closeAddCategoryModal}>
                              &times;
                            </span>
                            <h2>Add Category</h2>
                            <label>
                              Category Name:
                              <input
                                type="text"
                                value={newCategoryName}
                                onChange={handleNewCategoryNameChange}
                              />
                            </label>
                            <div id="add_cat">
                              <button onClick={() => addCategory()}>Save</button>
                              <button onClick={closeAddCategoryModal}>Cancel</button>
                            </div>
                          </div>
                        </div>
                      )}
                    
                <table>
                  <thead>
                    <tr>
                      <th>Category Name</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {categories
                    .filter((category) => {
                      const categoryNameMatch = category.name.toLowerCase().includes(categoryFilters.name.toLowerCase());
                     
                      return categoryNameMatch ;
                    })
                    .map(category => (
                      <tr key={category.id}>
                      <td>
                        {editCategoryId === category.id ? (
                          
                          <input
                            type="text"
                            value={editCategoryId === category.id ? category.name : ''}
                            onChange={(e) => handleCategoryInputChange(category.id, e.target.value)}
                          />
                        ) : (
                          
                          category.name
                        )}
                      </td>
                      <td>
                        {editCategoryId === category.id ? (
                          
                          <button onClick={() => handleSaveCategory(category.id, category)}>
                            Save
                          </button>
                        ) : (
                         
                          <button onClick={() => handleEditCategory(category.id)}>Edit</button>
                        )}
                      </td>
                    </tr>
                  ))}
                  </tbody>
                </table>
              </div>
            )}
          {activeTab === 'Roles' && (
              <div>
                <h2>Roles</h2>
                <div id="event-filters">
                    <label>
                      Name:
                      <input
                        type="text"
                        value={roleFilters.name}
                        onChange={(e) => handleRoleFilterChange('name', e.target.value)}
                      />
                    </label>
                  </div>
                <table>
                  <thead>
                    <tr>
                      <th>Role Name</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {roles.filter((role) => role.id !== 1)
                    .filter((role) => {
                      const roleNameMatch = role.name.toLowerCase().includes(roleFilters.name.toLowerCase());
                     
                      return roleNameMatch ;
                    })
                    .map(role => (
                      <tr key={role.id}>
                        <td>
                        {editRoleId === role.id ? (
                          
                          <input
                            type="text"
                            value={editRoleId === role.id ? role.name : ''}
                            onChange={(e) => handleRoleInputChange(role.id, e.target.value)}
                          />
                        ) : (
                        
                          role.name
                        )}
                      </td>
                      <td>
                        {editRoleId === role.id ? (
                        
                          <button onClick={() => handleSaveRole(role.id, role)}>
                            Save
                          </button>
                        ) : (
                          
                          <button onClick={() => handleEditRole(role.id)}>Edit</button>
                        )}
                      </td>
                    </tr>
                  ))}
                  </tbody>
                </table>
              </div>
            )}
      {activeTab === 'Events' && (
      
      <div className="dashboard-cont">
        <h2>Events</h2>
            <div id="event-filters">
          <label>
            Event Name:
            <input
              type="text"
              value={eventFilters.eventName}
              onChange={(e) => handleEventFilterChange('eventName', e.target.value)}
            />
          </label>
          <label>
            Location:
            <input
              type="text"
              value={eventFilters.location}
              onChange={(e) => handleEventFilterChange('location', e.target.value)}
            />
          </label>
          <label>
            Start Time:
            <input
              type="text"
              value={eventFilters.startTime}
              onChange={(e) => handleEventFilterChange('startTime', e.target.value)}
            />
          </label>
          <label>
            End Time:
            <input
              type="text"
              value={eventFilters.endTime}
              onChange={(e) => handleEventFilterChange('endTime', e.target.value)}
            />
          </label>
        </div>
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
              {events
              .filter((event) => {
                const eventNameMatch = event.event_name.toLowerCase().includes(eventFilters.eventName.toLowerCase());
                const locationMatch = event.location.toLowerCase().includes(eventFilters.location.toLowerCase());
                const startTimeMatch = event.start_time.includes(eventFilters.startTime);
                const endTimeMatch = event.end_time.includes(eventFilters.endTime);
    
                return eventNameMatch && locationMatch && startTimeMatch && endTimeMatch;
              })
              .map(event => (
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
        
      </div>)}
    </div>
    {isUserProfileModalOpen && (
        <UserProfile userData={userData} onClose={handleCloseUserProfileModal} />
      )}
    </div>
  );
};

export default AdminDashboard;
