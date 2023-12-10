export default function Filter({handlename, showTicketFilter, showEventFilter}){
    return (
        <>
        {showTicketFilter && (<div id="ticket_filter">
        <div><h4>Upcoming Events</h4></div>
        <div id="filter">
        {/* filter based on names/location */}
            <input
            className="filter"
            type="text"
            name="search"
            onChange={handlename}
            placeholder="Search name or location ..."
            />
        </div>
        </div>)}
        {showEventFilter && (
        <div id="ticket_filter">
        
        <div id="filter">
        {/* filter based on names */}
            <input
            className="filter"
            type="text"
            name="search"
            onChange={handlename}
            placeholder="Search name ..."
            />
        </div>
        </div>)}
        </>
    )
}