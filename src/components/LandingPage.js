import { useState, useEffect } from "react";
import TicketItem from "./TicketItem";
import Filter from "./Filter";
import { Link } from "react-router-dom";

export default function LandingPage() {
  
  const [tickets, setTickets] = useState([]);
  const [tname, setTname] = useState("");
  const [visibleTickets, setVisibleTickets] = useState(1);
  const [startIndex, setStartIndex] = useState(0);

  const handleLeftArrowClick = () => {
    if (startIndex > 0) {
      setStartIndex(startIndex - 1);
    }
  };

  const handleRightArrowClick = () => {
    if (startIndex < tickets.length - visibleTickets) {
      setStartIndex(startIndex + 1);
    } else {
      // loop
      setStartIndex(0);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      handleRightArrowClick();
    }, 8000);

    return () => clearInterval(interval);
  }, [startIndex, tickets.length, visibleTickets]);

  function handleName(e) {
    e.preventDefault();
    setTname(e.target.value);
  }

  const ticketsDisplay = tickets.filter((ticket) => {
    if (ticket === "") return true;
    const eventNameMatch = ticket.event_name
      .toLowerCase()
      .includes(tname.toLowerCase());
    const locationMatch = ticket.location
      .toLowerCase()
      .includes(tname.toLowerCase());

    return eventNameMatch || locationMatch;
  });

  useEffect(() => {
    fetch("http://localhost:5000/events")
      .then((res) => res.json())
      .then((data) => {
        setTickets(data);
      });
  }, []);
  console.log(tickets);

  return (
    <>
      <div id="trending" style={{ display: "flex", overflow: "hidden" }}>
        <button className="btn" onClick={handleLeftArrowClick}>
          {"<<"}
        </button>
        <div style={{ display: "flex", overflow: "hidden" }}>
          {tickets.slice(startIndex, startIndex + visibleTickets).map((item, index) => (
            <div className="trending_card" key={index}>
              <div id="ti">
                <img className="trending_img" src={item.images} alt={item.event_name} />
              </div>
              <div id="name_loc">
                <h4>
                  {item.event_name.toUpperCase()}|({item.start_time.split(" ")[0]})
                </h4>
                <p>{item.start_time.split(" ")[1]}hrs</p>
                <p>{item.location}</p>
                <Link to={`/events/${item.id}`}>
              <button id="btn">get tickets</button>
            </Link>
              </div>
              <div id="calenda">
                <add-to-calendar-button
                  name={item.event_name}
                  startDate="2023-11-27"
                  startTime={item.start_time.split(" ")[1]}
                  endTime="23:30"
                  timeZone="Africa/Nairobi"
                  description={item.description}
                  options="'Google','Apple','Outlook.com'"
                  location={item.location}
                  buttonsList
                  hideTextLabelButton
                  buttonStyle=""
                  size="2px"
                  lightMode="bodyScheme"
                ></add-to-calendar-button>
              </div>
            </div>
          ))}
        </div>
        <button className="btn" onClick={handleRightArrowClick}>
          {">>"}
        </button>
      </div>

      <Filter handlename={handleName} />

      <div id="upcoming" className="upcoming-card">
        {ticketsDisplay.map((ticket) => {
          if (!ticket) {
            return "Loading...";
          }
          return (
            <Link to={`/events/${ticket.id}`} key={ticket.id} style={{ textDecoration: 'none', color: 'inherit' }}>
              <TicketItem
                image={ticket.images}
                name={ticket.event_name}
                location={ticket.location}
                time={ticket.start_time}
                description={ticket.description}
              />
            </Link>
          );
        })}
      </div>
    </>
  );
}

