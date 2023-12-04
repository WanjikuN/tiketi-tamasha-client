import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import TicketItem from './TicketItem';
import './EventDetails.css';
import { useCart } from "./CartContext";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ShoppingCart from './cart';
const EventDetails = ({carts, removeFromCart}) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { eventId } = useParams();
  const [cart, setCart] = useState([]);
  const [addedEarlyToCart, setAddedEarlyToCart] = useState(false);
  const [addedVIPToCart, setAddedVIPToCart] = useState(false);
  const [addedRegularToCart, setAddedRegularToCart] = useState(false);
  const [eventDetails, setEventDetails] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:5000/events/${eventId}`)
      .then((res) => res.json())
      .then((data) => {
        setEventDetails(data);
      });
  }, [eventId]);

  if (!eventDetails) {
    return <div>Loading...</div>;
  }
 const handleOpenCart = () => {
    setIsCartOpen(true);
  };
  const handleCloseCart = () => {
    console.log(cart)
    setIsCartOpen(false);
  };
  const startDate = eventDetails.start_time ? eventDetails.start_time.split(' ')[0] : '';
  const startTime = eventDetails.start_time ? eventDetails.start_time.split(' ')[1] : '';

  const handleAddRegularCart = (selectedTicket) => {
    addToCart(selectedTicket);
    setAddedRegularToCart(true);
    alert(`Regular Ticket added to cart`);
  };
  const handleAddEarlyCart = (selectedTicket) => {
    addToCart(selectedTicket);
    setAddedEarlyToCart(true);
    alert(`Early Bird Ticket added to cart`);
  };
  const handleAddVIPCart = (selectedTicket) => {
    addToCart(selectedTicket);
    setAddedVIPToCart(true);
    alert(`VIP Ticket added to cart`);
  };
  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div id="eventDetails">
      <div id="details_img">
      <p id="back" onClick={handleGoBack} style={{ fontSize: "30px", color: "black" }}>←<span style={{ fontSize: "30px" }}>Back</span></p>

        <img  className="img_det" src={eventDetails.images} alt={eventDetails.event_name} />
        <h4>Description:</h4> <p>{eventDetails.description}</p>

        </div>
    <div className="event-details-container">
      <div className="general-details">
        <h2>{eventDetails.event_name.toUpperCase()}</h2>
        <p>Location: {eventDetails.location}</p>
        <p>Date: {startDate}</p>
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
        <div id="ticket" >
            <h4>Early Bird Ticket</h4>
            <p>Price: {eventDetails.early_booking_price}</p>
            <button className="btnTicket" onClick={addedEarlyToCart ? () => {(handleOpenCart())} : () => handleAddEarlyCart({ ...eventDetails, ticketType: 'Early Bird' })} style={{ width: "80%" }}><FontAwesomeIcon icon={faShoppingCart} /> {addedEarlyToCart ? " View Cart" : " Buy Ticket"}</button>
          </div>

          {isCartOpen && (
              <ShoppingCart cart={carts} onClose={handleCloseCart} removeFromCart={removeFromCart}/>
            )}


          <div id="ticket" >
            <h4>Regular Ticket</h4>
            <p>Price: {eventDetails.regular_price}</p>
            <button className="btnTicket" onClick={addedRegularToCart ? () => {(handleOpenCart())} : () => handleAddRegularCart ({ ...eventDetails, ticketType: 'Regular' })} style={{ width: "80%" }}><FontAwesomeIcon icon={faShoppingCart} /> {addedRegularToCart ? " View Cart" : " Buy Ticket"}</button>
          </div>

          <div id="ticket" >
            <h4>VIP Ticket</h4>
            <p>Price: {eventDetails.MVP_price}</p>
            <button className="btnTicket" onClick={addedVIPToCart ? () => {(handleOpenCart())}: () => handleAddVIPCart({ ...eventDetails, ticketType: 'VIP' })} style={{ width: "80%" }}><FontAwesomeIcon icon={faShoppingCart} /> {addedVIPToCart ? " View Cart" : " Buy Ticket"}</button>
          </div>
        </div>
      </div>
    </div>
    </div>
    
  );
};

export default EventDetails;
