
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import TicketItem from './TicketItem';
import './EventDetails.css';

const EventDetails = () => {
  const { eventId } = useParams();
  const [eventDetails, setEventDetails] = useState(null);

  useEffect(() => {
    fetch(`https://tiketi-tamasha-backend.onrender.com/events/${eventId}`)
      .then((res) => res.json())
      .then((data) => {
        setEventDetails(data);
      });
  }, [eventId]);

  if (!eventDetails) {
    return <div>Loading...</div>;
  }

  const startDate = eventDetails.start_time ? eventDetails.start_time.split(' ')[0] : '';
  const startTime = eventDetails.start_time ? eventDetails.start_time.split(' ')[1] : '';

  return (
    <div className="event-details-container">
      <div className="general-details">
        <h2>{eventDetails.event_name}</h2>
        <p>Description: {eventDetails.description}</p>
        <p>Location: {eventDetails.location}</p>
        <p>Start Date: {startDate}</p>
        <p>Start Time: {startTime}</p>
        <p>End Time: 23:30</p>
        <add-to-calendar-button
          name={eventDetails.event_name}
          startDate={startDate}
          startTime={startTime}
          endTime="23:30"
          timeZone="Africa/Nairobi"
          description={eventDetails.description}
          options="'Google','Apple','Outlook.com'"
          location={eventDetails.location}
          buttonsList
          hideTextLabelButton
          buttonStyle=""
          size="2px"
          lightMode="bodyScheme"
        ></add-to-calendar-button>
      </div>

      <div className="tickets-section">
        <h3>Tickets</h3>
        <div className="ticket-list">
          
          <TicketItem
            name="Regular Ticket"
            description="Access to the event"
            startDate={startDate}
            startTime={startTime}
          />

          
          <TicketItem
            name="VIP Ticket"
            description="Exclusive access and perks"
            startDate={startDate}
            startTime={startTime}
          />

          
          <TicketItem
            name="VVIP Ticket"
            description="Premium experience with extra perks"
            startDate={startDate}
            startTime={startTime}
            
          />
        </div>
      </div>
    </div>
  );
};

export default EventDetails;




