export default function Filter({handlename}){
    return (
        <div id="ticket_filter">
        <div></div>
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
        </div>
    )
}