// EventSummary.js
import React from 'react';

const EventSummary = ({ tickets }) => {
  return (
    <div>
      <h2>Event Summary</h2>
      <ul>
        {tickets.map((ticket, index) => (
          <li key={index}>
            {/* Display ticket details */}
            <p>{ticket.eventName}</p>
            {/* ... */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EventSummary;
