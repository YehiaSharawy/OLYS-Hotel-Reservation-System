document.getElementById('bill-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const roomType = document.getElementById('room-type').value;
    const numAdults = document.getElementById('num-adults').value;
    const bookingId = document.getElementById('booking-id').value;
    const bookingDate = document.getElementById('booking-date').value;
    const numRooms = document.getElementById('num-rooms').value;

    const billDetailsContainer = document.getElementById('bill-details-container');

    const billBox = document.createElement('div');
    billBox.classList.add('bill-box');
    billBox.innerHTML = `
        <div class="bill-info">
            <p><strong>Room Type:</strong> ${roomType}</p>
            <p><strong>Number of Adults:</strong> ${numAdults}</p>
            <p><strong>Booking ID:</strong> ${bookingId}</p>
            <p><strong>Booking Date:</strong> ${bookingDate}</p>
            <p><strong>Number of Rooms:</strong> ${numRooms}</p>
        </div>
    `;

    billDetailsContainer.appendChild(billBox);
});

document.getElementById('card-number').addEventListener('input', function (e) {
    let inputValue = e.target.value.replace(/\D/g, '').substring(0,16); // Remove non-numeric characters and limit to 16 digits

    // Add hyphens every four digits
    inputValue = inputValue.replace(/(\d{4})(?=\d)/g, '$1-');

    e.target.value = inputValue;
});
