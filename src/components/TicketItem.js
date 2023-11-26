import { AddToCalendarButton } from 'add-to-calendar-button-react';
import './TicketItem.css';


export default function TicketItem({ name, location, time, image, description, startDate, startTime, buttonText }) {
  return (
    <div id='ticket'>
      <img className="ticket_img event-image" src={image} alt={name} />
      <div id="ticket_details">
        <div id="name_loc">
          <h4>{name.toUpperCase()}|({startDate})</h4>
          <p>{startTime}hrs</p>
          <p>{location}</p>
          <button className='btnTicket'>Buy Ticket</button>
        </div>
  
      </div>
    </div>
  );
}
