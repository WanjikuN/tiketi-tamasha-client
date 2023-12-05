document.addEventListener('DOMContentLoaded', function() {
  fetch('/admin/dashboard')
    .then(response => response.json())
    .then(data => {
      displayData(data);
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    });

  function displayData(data) {
    const eventsList = document.getElementById('events-list');
    const usersList = document.getElementById('users-list');
    const paymentsList = document.getElementById('payments-list');

    data.events.forEach(event => {
      const eventDiv = document.createElement('div');
      eventDiv.classList.add('item');
      eventDiv.textContent = `${event.event_name} - ${event.description}`;
      eventsList.appendChild(eventDiv);
    });

    data.users.forEach(user => {
      const userDiv = document.createElement('div');
      userDiv.classList.add('item');
      userDiv.textContent = `${user.username} - ${user.email}`;
      usersList.appendChild(userDiv);
    });

  
    data.payments.forEach(payment => {
      const paymentDiv = document.createElement('div');
      paymentDiv.classList.add('item');
      paymentDiv.textContent = `${payment.payment_type} - ${payment.status}`;
      paymentsList.appendChild(paymentDiv);
    });
  }
});
