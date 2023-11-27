import { AddToCalendarButton } from 'add-to-calendar-button-react';
import './TicketItem.css';

export default function TicketItem({ name, location, time, image, description, startDate, buttonText }) {
  return (
    <div id='ticket'>
      <div className="event-image-container">
        <img className="ticket_img" src={image} alt={name} />
      </div>
      <div id="ticket_details">
        <div id="name_loc">
          <h4>{name.toUpperCase()} {startDate}</h4>
          <p>{time}</p>
          <p>{location}</p>
          <p>{buttonText}</p>
          <button className='btnTicket'>Buy Ticket</button>
            
        </div>
      </div>
    </div>
  );
}

