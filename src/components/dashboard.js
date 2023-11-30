document.addEventListener('DOMContentLoaded', function() {
    fetch('/admin/dashboard')
      .then(response => response.json())
      .then(data => {
        console.log(data);
  

        displayEventData(data.events);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  
    function displayEventData(events) {
      const eventList = document.getElementById('event-list');
  
      const eventItems = events.map(event => {
        return `
          <div class="event-card">
            <h2>${event.event_name}</h2>
            <p><strong>Start Time:</strong> ${event.start_time}</p>
            <p><strong>End Time:</strong> ${event.end_time}</p>
            <p><strong>Location:</strong> ${event.location}</p>
            <p><strong>Description:</strong> ${event.description}</p>
            <p><strong>MVP Price:</strong> ${event.mvp_price}</p>
            <!-- Add more details as needed -->
          </div>
        `;
      });
  
      eventList.innerHTML = eventItems.join('');
    }
  });
  