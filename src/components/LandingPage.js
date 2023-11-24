import { useState, useEffect } from "react"
import TicketItem from "./TicketItem"
import Filter from "./Filter"
export default function LandingPage(){
    const [tickets, setTickets] =useState([])
    const [tname, setTname] = useState("")

    function handleName(e){
        e.preventDefault()
        setTname(e.target.value)
    }
    // filter tickets using name
    const ticketsDisplay = tickets.filter(ticket =>{
        if (ticket === "") return true
        const eventNameMatch = ticket.event_name.toLowerCase().includes(tname.toLowerCase());
        const locationMatch = ticket.location.toLowerCase().includes(tname.toLowerCase());
    
        return eventNameMatch || locationMatch;
        })

    useEffect(()=>{
        fetch('http://127.0.0.1:5000/events')
        .then(res => res.json())
        .then(data => {
            console.log(data)
            setTickets(data)})
    },[])
    
    return(
        <>
        {/* Trending */}
        {/* All tickets */}
        <div id="trending">

        </div>
        
        <Filter handlename={handleName} />

        <div id="upcoming">
            {
              ticketsDisplay.map(ticket=>{
                if(!ticket){
                    return 'Loading...'
                }
                return (<TicketItem key={ticket.id} image={ticket.images} name={ticket.event_name} location={ticket.location} time={ticket.start_time} description={ticket.description}/>)
              })  
            }
        </div>
        
        </>
    )
}