import { AddToCalendarButton } from 'add-to-calendar-button-react';
export default function TicketItem({name, location, time, image,description}){
    console.log(description);
    
    return(
        <div id='ticket'>
            <img className="ticket_img" src={image} alt={name} />
            <div id="ticket_details">
                <div id="name_loc">
                    <h4>{name.toUpperCase()}|({time.split(' ')[0]})</h4>
                    
                    <p>{time.split(' ')[1]}hrs</p>
                    <p>{location}</p>
                    
                    {/* <p>{time.split(' ')[0]}</p> */}
                </div>

                <div id='calendar'>
                    <add-to-calendar-button
                        name={name}
                        startDate="2023-11-27"
                        startTime={time.split(' ')[1]}
                        endTime="23:30"
                        timeZone="Africa/Nairobi"
                        description={description}
                        options="'Google','Apple','Outlook.com'"
                        location={location}
                        buttonsList
                        hideTextLabelButton
                        buttonStyle=""
                        size="2px"
                        lightMode="bodyScheme"
                        ></add-to-calendar-button>
                    
                
                 </div>
            </div>
        </div>
    )
}