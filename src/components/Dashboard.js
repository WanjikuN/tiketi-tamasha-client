import React, { useState } from 'react';

const Dashboard = () => {
  const [events, setEvents] = useState([]);
  const [isCreateEventFormVisible, setIsCreateEventFormVisible] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const handleCreateEventButtonClick = () => {
    setIsCreateEventFormVisible(true);
  };

  const handleViewEventsButtonClick = () => {
    setIsCreateEventFormVisible(false);
  };

  const handleCreateEventFormSubmit = (event) => {
    event.preventDefault();

    // Extract event data from the form
    const eventName = event.target.elements.eventName.value;
    const description = event.target.elements.description.value;
    const tags = event.target.elements.tags.value.split(',');
    const location = event.target.elements.location.value;
    const startTime = event.target.elements.startTime.value;
    const endTime = event.target.elements.endTime.value;
    const earlyBookingPrice = event.target.elements.earlyBookingPrice.value;
    const regularPrice = event.target.elements.regularPrice.value;
    const mvpPrice = event.target.elements.mvpPrice.value;
    const availableTickets = event.target.elements.availableTickets.value;
    const eventImage = event.target.elements.eventImage.value;

    // Create a new event object
    const newEvent = {
      eventName,
      description,
      tags,
      location,
      startTime,
      endTime,
      bookingPrices: {
        earlyBookingPrice,
        regularPrice,
        mvpPrice,
      },
      availableTickets,
      eventImage,
    };

    setEvents([...events, newEvent]);

    setIsCreateEventFormVisible(false);
  };

  const handleCancelCreateEventForm = () => {
    setIsCreateEventFormVisible(false);
  };

  const handleEventSummaryClick = (event) => {
    const selectedEvent = events.find((e) => e.eventName === event.eventName);
    setSelectedEvent(selectedEvent);
  };

  const handleCloseEventDetails = () => {
    setSelectedEvent(null);
  };

  return (
    <div className="dashboard-container">
      <h1>Event Management Dashboard</h1>

      <div className="button-container">
        <button onClick={handleCreateEventButtonClick}>Create Event</button>
        <button onClick={handleViewEventsButtonClick}>View Events</button>
      </div>

      {isCreateEventFormVisible && (
        <form className="create-event-form" onSubmit={handleCreateEventFormSubmit}>
          <label>Event Name:</label>
          <input type="text" name="eventName" required />

          <label>Description:</label>
          <textarea name="description" required></textarea>

          <label>Tags (separate with commas):</label>
          <input type="text" name="tags" required />

          <label>Location:</label>
          <input type="text" name="location" required />

          <label>Start Time:</label>
          <input type="datetime-local" name="startTime" required />

          <label>End Time:</label>
          <input type="datetime-local" name="endTime" required />

          <label>Booking Prices:</label>
          <div className='book'>
            <label>Early Booking Price:</label>
            <input type="number" name="earlyBookingPrice" required />
          </div>
          <div className='book'>
            <label>Regular Price:</label>
            <input type="number" name="regularPrice" required />
          </div>
          <div className='book'>
            <label>MVP Price:</label>
            <input type="number" name="mvpPrice" required />
          </div>

          <label>Available Tickets:</label>
          <input type="number" name="availableTickets" required />

          <label>Event Image:</label>
          <input type="file" name="eventImage" required />

          <button type="submit">Create Event</button>
          <button onClick={handleCancelCreateEventForm}>Cancel</button>
        </form>
      )}

      {selectedEvent && (
        <div className="event-details">
          <h2>Event Details</h2>
          <p>
            <strong>Event Name:</strong> {selectedEvent.eventName}
          </p>
          <p>
            <strong>Description:</strong> {selectedEvent.description}
          </p>
          <p>
            <strong>Tags:</strong> {selectedEvent.tags.join(', ')}
          </p>
          <p>
            <strong>Location:</strong> {selectedEvent.location}
          </p>
          <p>
            <strong>Start Time:</strong> {selectedEvent.startTime}
          </p>
          <p>
            <strong>End Time:</strong> {selectedEvent.endTime}
          </p>
          <p>
            <strong>Booking Prices:</strong>{' '}
            {`${selectedEvent.bookingPrices.earlyBookingPrice}, ${selectedEvent.bookingPrices.regularPrice}, ${selectedEvent.bookingPrices.mvpPrice}`}
          </p>
          <p>
            <strong>Available Tickets:</strong> {selectedEvent.availableTickets}
          </p>
          <img src={selectedEvent.eventImage} alt="Event Image" />
          <button onClick={handleCloseEventDetails}>Close Details</button>
        </div>
      )}

      {events.length > 0 && (
        <div className="event-list">
          <h2>Event List</h2>
          <ul>
            {events.map((event, index) => (
              <li key={index} onClick={() => handleEventSummaryClick(event)}>
                {event.eventName}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
