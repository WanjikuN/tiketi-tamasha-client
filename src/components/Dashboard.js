import React, { useState, useEffect } from 'react';
import Filter from "./Filter";
import UserProfile from './UserProfile';
import './Dashboard.css';

const OrdersTable = ({orders}) => {
  const [tname, setTname] = useState("");


  //  const ordersDisplay = orders.filter((ticket) => {
  //     if (ticket === "") return true;
  //     const eventNameMatch = ticket.event_name
  //       .toLowerCase()
  //       .includes(tname.toLowerCase());
  //     const locationMatch = ticket.location
  //       .toLowerCase()
  //       .includes(tname.toLowerCase());
  
  //     return eventNameMatch || locationMatch;
  //   });
    function handleName(e) {
      e.preventDefault();
      setTname(e.target.value);
    }
  return (
    <div className="table-container">
      <Filter handlename={handleName} showTicketFilter={false} showEventFilter={true}/>

      <table className="orders-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Event Name</th>
            <th>Amount</th>
            <th>Phone number</th>
            <th>Payment Date</th>
            <th>Payment Type</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>{order.event_name}</td>
              <td>{order.amount}</td>
              <td>{order.payer_phone}</td>
              <td>{order.payment_date}</td>
              <td>{order.payment_type}</td>
              <td>{order.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const Dashboard = ({userData}) => {
  const [events, setEvents] = useState([]);
  const [isCreateEventFormVisible, setIsCreateEventFormVisible] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [categoryOptions, setCategoryOptions] = useState([]);
  const [tname, setTname] = useState("");
  const [isViewEventsVisible, setIsViewEventsVisible] = useState(false);
  const[orders, setOrders] =useState([])
  const [isEditing, setIsEditing] = useState(false);
  const [editedEvent, setEditedEvent] = useState({});
  // console.log(userData)
  const [isUserProfileModalOpen, setIsUserProfileModalOpen] = useState(false);
  const handleUserProfileClick = () => {
    setIsUserProfileModalOpen(true);
  };

  const handleDeleteEvent = async (eventId) => {
    try {
      const response = await fetch(`http://localhost:5000/events/${eventId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setEvents(events.filter((event) => event.id !== eventId));
      } else {
        console.error('Failed to delete event:', response.statusText);
      }
    } catch (error) {
      console.error('Error deleting event:', error);
    }
  };

  const handleCloseUserProfileModal = () => {
    setIsUserProfileModalOpen(false);
  };
  // Create a single formData state to hold all form data
  const [formData, setFormData] = useState({
    event_name: '',
    description: '',
    tags: '',
    location: '',
    start_time: '',
    end_time: '',
    early_booking_price: '',
    regular_price: '',
    MVP_price: '',
    available_tickets: '',
    images: '',
    category_id: '',
    user_id:userData.id
  });

  const handleCreateEventButtonClick = () => {
    setIsCreateEventFormVisible(true);
    setIsViewEventsVisible(false);
    setEvents([])
  };

  
  const formatDateTime = (dateTimeString) => {
    const date = new Date(dateTimeString);
  
    // Format as 'YYYY-MM-DD HH:mm:ss.SSSSSS'
    const formattedDateTime = date.toISOString().replace('T', ' ').replace('Z', '');
  
    return formattedDateTime;
  };
  const handleCreateEventFormSubmit = async (event) => {
    event.preventDefault();

    // Use the values directly from formData
    const newEvent = {
      event_name: formData.event_name,
      description: formData.description,
      tags: formData.tags.split(','),
      location: formData.location,
      start_time: formatDateTime(formData.start_time),
      end_time: formatDateTime(formData.end_time),
      early_booking_price: formData.early_booking_price,
      regular_price: formData.regular_price,
      MVP_price: formData.MVP_price,
      category_id: formData.category_id,
      available_tickets: formData.available_tickets,
      images: formData.images,
      user_id:userData.id
    };
    console.log(newEvent)
    try {
      const response = await fetch('http://localhost:5000/events', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newEvent),
      }
      );
  
      if (response.ok) {
        const responseData = await response.json();
        setEvents([...events, responseData]); 
        setIsCreateEventFormVisible(false);

      }
      else {
        console.error('Failed to create event:', response.statusText);
      }
    }catch (error) {
      console.error('Error creating event:', error);
    }
    
    };

  const handleCancelCreateEventForm = () => {
    setIsCreateEventFormVisible(false);
  };

  const handleEventSummaryClick = (event) => {
    const selectedEvent = events.find((e) => e.event_name === event.event_name);
    setSelectedEvent(selectedEvent);
    // setIsViewEventsVisible(false);
    setEvents([])
  };

  const handleCloseEventDetails = () => {
    setSelectedEvent(null);
    setIsViewEventsVisible(true);
    fetchEvents();
  };
  function handleName(e) {
    e.preventDefault();
    setTname(e.target.value);
  }
  const eventsDisplay = events.filter((ticket) => {
    if (ticket === "") return true;
    const eventNameMatch = ticket.event_name
      .toLowerCase()
      .includes(tname.toLowerCase());
    const locationMatch = ticket.location
      .toLowerCase()
      .includes(tname.toLowerCase());

    return eventNameMatch || locationMatch;
  });
  
  const fetchEvents = async () => {
      try {
        const user_id = userData.id;
        const response = await fetch(`http://localhost:5000/events?user_id=${user_id}`);
        const data = await response.json();
        if (response.ok) {
          setEvents(data);
        } else {
          console.error('Failed to fetch events:', data.error);
        }
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

  const handleViewEventsButtonClick = () => {
    setIsViewEventsVisible(true);  
    setIsCreateEventFormVisible(false);
    fetchEvents();
      
    };
  const handleCancelViewEventsButtonClick = () => {
      setIsViewEventsVisible(false);
      setEvents([])
      } 
  
   
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('http://localhost:5000/categories');
        const data = await response.json();
        if (response.ok) {
          setCategoryOptions(data);
        } else {
          console.error('Failed to fetch categories:', data.error);
        }
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);
  useEffect(() => {
    fetch("http://localhost:5000/payments")
      .then((res) => res.json())
      .then((data) => {
        setOrders(data);
      });
  }, []);
  console.log(orders)
  const handleOrdersButtonClick = () => {
    setIsCreateEventFormVisible(false);
    setIsViewEventsVisible(false);
    setEvents([])
  };
  const handleEditEventButtonClick = () => {
    setIsEditing(true);
    setEditedEvent(selectedEvent);
  };
  const handleEditEventFormSubmit = async () => {
    try {
      const response = await fetch(`http://localhost:5000/events/${selectedEvent.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editedEvent),
      });
      
      if (response.ok) {
        const updatedEvent = await response.json();
        console.log(updatedEvent)
        setEvents(events.map((event) => (event.id === updatedEvent.id ? updatedEvent : event)));

        setIsEditing(false);
        handleCloseEventDetails()
      } else {
        console.error('Failed to update event:', response.statusText);
      }
    } catch (error) {
      console.error('Error updating event:', error);
    }
  
  };
    return (
      <div id="dashboard">
        <div id='left_nav'>

            <button className='left_nav' onClick={handleUserProfileClick}>Profile</button>
            <button className='left_nav' onClick={handleCreateEventButtonClick}>Create Event</button>
            <button className='left_nav'onClick={handleViewEventsButtonClick}>View Events</button>
            <button className='left_nav' onClick={handleOrdersButtonClick}>Orders</button>
        </div>
      
        <div className="dashboard-container">
          <h2>Event Management Dashboard</h2>
        
          <div className="button-container">
            <button onClick={handleCreateEventButtonClick}>Create Event</button>
            {!isViewEventsVisible && (
              <button onClick={handleViewEventsButtonClick}>View Events</button>
            )}
            {isViewEventsVisible && (
              <button onClick={handleCancelViewEventsButtonClick}>Cancel View</button>
            )}      </div>
            {!isCreateEventFormVisible && !isViewEventsVisible && (
            <div id='orders'>
            <h4>Orders</h4>
              <div id='order_details'>
                  
              <OrdersTable orders={orders} />
                      
            </div>
            </div>
            )}   

          {isCreateEventFormVisible && (
            <form className="create-event-form" onSubmit={handleCreateEventFormSubmit}>
              <label>Event Name:</label>
              <input type="text" name="event_name" onChange={(e) => setFormData({ ...formData, event_name: e.target.value })}
    required />

              <label>Description:</label>
              <textarea name="description" onChange={(e) => setFormData({ ...formData, description: e.target.value })}
    required></textarea>

              <label>Tags (separate with commas):</label>
              <input type="text" name="tags" onChange={(e) => setFormData({ ...formData, tags: e.target.value })} required />

              <label>Location:</label>
              <input type="text" name="location" onChange={(e) => setFormData({ ...formData, location: e.target.value })}required />

              <select
                  value={formData.category_id}
                  onChange={(e) => setFormData({ ...formData, category_id: e.target.value })}
                  className="input-field"
                >
                  <option value="" disabled>Select a Category</option>
                        {categoryOptions.map((category) => (
                            
                            <option key={category.id} value={category.id}>
                            {category.name}
                </option>))}
                </select>

              <label>Start Time:</label>
              <input type="datetime-local" name="start_time"  onChange={(e) => setFormData({ ...formData, start_time: e.target.value })} required />

              <label>End Time:</label>
              <input type="datetime-local" name="end_time" onChange={(e) => setFormData({ ...formData, end_time: e.target.value })}
    required />

              <label>Booking Prices:</label>
              <div className='book'>
                <label>Early Booking Price:</label>
                <input type="number" name="early_booking_price" onChange={(e) => setFormData({ ...formData, early_booking_price: e.target.value })}
    required />
              </div>
              <div className='book'>
                <label>Regular Price:</label>
                <input type="number" name="regular_price"  onChange={(e) => setFormData({ ...formData, regular_price: e.target.value })}
    required />
              </div>
              <div className='book'>
                <label>MVP Price:</label>
                <input type="number" name="MVP_price" onChange={(e) => setFormData({ ...formData, MVP_price: e.target.value })}
    required />
              </div>

              <label>Available Tickets:</label>
              <input type="number" name="available_tickets" onChange={(e) => setFormData({ ...formData, available_tickets: e.target.value })}
    required />

              <label>Event Image:</label>
              <input type="file" name="images" onChange={(e) => setFormData({ ...formData, images: e.target.value })}required />
              <div className='btn_event'>
              <button type="submit">Create Event</button>
              <button onClick={handleCancelCreateEventForm}>Cancel</button>
              </div>
              </form>
          )}

          {selectedEvent && (
            <div className="event-details">
              <h2>Event Details</h2>
              {!isEditing ? (
            <>
              <p>
                <strong>Event Name:</strong> {selectedEvent.event_name}
              </p>
              <p>
                <strong>Description:</strong> {selectedEvent.description}
              </p>
              <p>
                <strong>Tags:</strong> {selectedEvent.tags}
              </p>
              <p>
                <strong>Location:</strong> {selectedEvent.location}
              </p>
              <p>
                <strong>Start Time:</strong> {selectedEvent.start_time}
              </p>
              <p>
                <strong>End Time:</strong> {selectedEvent.end_time}
              </p>
              <p>
                <strong>Booking Prices:</strong>{' '}
                {`${selectedEvent.early_booking_price}, ${selectedEvent.regular_price}, ${selectedEvent.MVP_price}`}
              </p>
              <p>
                <strong>Available Tickets:</strong> {selectedEvent.available_tickets}
              </p>
              {/* <img src={selectedEvent.images} alt="Event Image" /> */}
              <div className='btn_event'>
              <button onClick={handleEditEventButtonClick}>Edit Event</button>
              <button onClick={handleCloseEventDetails}>Close Details</button>
              </div></>
          ) : (
            <div className="create-event-form" >
              <p>
                <strong>Event Name:</strong> <input
                type="text"
                value={editedEvent.event_name}
                onChange={(e) => setEditedEvent({ ...editedEvent, event_name: e.target.value })}
                required
              />
              </p>
              <p>
                <strong>Description:</strong> <input
                type="text"
                value={editedEvent.description}
                onChange={(e) => setEditedEvent({ ...editedEvent, description: e.target.value })}
                required
              />
              </p>
              <p>
                <strong>Tags:</strong> <input
                type="text"
                value={editedEvent.tags}
                onChange={(e) => setEditedEvent({ ...editedEvent, tags: e.target.value })}
                required
              />
              </p>
              <p>
                <strong>Location:</strong> <input
                type="text"
                value={editedEvent.location}
                onChange={(e) => setEditedEvent({ ...editedEvent, location: e.target.value })}
                required
              />
              </p>
              <div className='btn_event'>
                <button onClick={handleEditEventFormSubmit}>Save Changes</button>
              <button onClick={() => setIsEditing(false)}>Cancel</button>
              </div>
            </div>
          )}
            </div>
          )}

          {events.length > 0 && (
            <div id='listy'>
              <div className="event-list">
            

              <h2>Event List</h2>
              <Filter handlename={handleName} showTicketFilter={false} showEventFilter={true}/>
              <ul>
                {eventsDisplay.map((event, index) => (
                  <li key={index} onClick={() => handleEventSummaryClick(event)}>
                    {event.event_name}
                    <button onClick={() => handleDeleteEvent(event.id)}>Delete Event</button>
                  </li>
                ))}
              </ul>
            </div></div>
          )}
        </div>
        {isUserProfileModalOpen && (
        <UserProfile userData={userData} onClose={handleCloseUserProfileModal} />
      )}
        </div>
    
    );
  }

export default Dashboard;