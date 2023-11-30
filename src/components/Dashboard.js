import React, { useState } from 'react';

const Dashboard = () => {
  const [events, setEvents] = useState([]); // Array to store created events
  const [isCreateEventFormVisible, setIsCreateEventFormVisible] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null); // Track selected event for detailed view

  const handleCreateEventButtonClick = () => {
    setIsCreateEventFormVisible(true);
  };

  const handleViewEventsButtonClick = () => {
    setIsCreateEventFormVisible(false); // Hide the create event form if it's visible
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
    const bookingPrices = event.target.elements.bookingPrices.value.split(',');
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
      bookingPrices,
      availableTickets,
      eventImage,
    };

    // Add the new event to the list of events
    setEvents([...events, newEvent]);

    // Hide the form
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
    <div className='dashboard-container'>
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

          <label>Booking Prices (separate with commas):</label>
          <input type="text" name="bookingPrices" required />

          <label>Available Tickets:</label>
          <input type="number" name="availableTickets" required />

          <label>Event Image:</label>
          <input type="file" name="eventImage" required />

          <button type="submit" className='button-spacing'>Create Event</button>
          <button onClick={handleCancelCreateEventForm}>Cancel</button>
        </form>
      )}

      {selectedEvent && (
        <div className="event-details">
          <h2>Event Details</h2>
          <p>Event Name: {selectedEvent.eventName}</p>
          <p>Description: {selectedEvent.description}</p>
          <p>Tags: {selectedEvent.tags.join(', ')}</p>
          <p>Location: {selectedEvent.location}</p>
          <p>Start Time: {selectedEvent.startTime}</p>
          <p>End Time: {selectedEvent.endTime}</p>
          <p>Booking Prices: {selectedEvent.bookingPrices.join(', ')}</p>
          <p>Available Tickets: {selectedEvent.availableTickets}</p>
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
