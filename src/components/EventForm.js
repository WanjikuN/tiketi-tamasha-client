// src/components/EventForm.js
import React, { useState } from 'react';

const EventForm = () => {
  const [eventData, setEventData] = useState({
    eventName: '',
    description: '',
    tags: '',
    location: '',
    startTime: '',
    endTime: '',
    bookingPrices: '',
    availableTickets: '',
    eventImage: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEventData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add logic to handle event creation
    console.log('Event created:', eventData);
    // Reset form data
    setEventData({
      eventName: '',
      description: '',
      tags: '',
      location: '',
      startTime: '',
      endTime: '',
      bookingPrices: '',
      availableTickets: '',
      eventImage: '',
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Event Name:
        <input type="text" name="eventName" value={eventData.eventName} onChange={handleChange} />
      </label>
      {/* Add similar input fields for other event properties */}
      <button type="submit">Create Event</button>
    </form>
  );
};

export default EventForm;
