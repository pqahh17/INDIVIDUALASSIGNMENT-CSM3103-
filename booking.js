function submitBooking(event) {
    event.preventDefault();

    const parentName = document.getElementById('parentName').value;
    const babysitterName = document.getElementById('babysitterName').value;
    const date = document.getElementById('date').value;
    const time = document.getElementById('time').value;


    const currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
    if (!currentUser) {
        alert('You need to be logged in to make a booking.');
        return;
    }

    const booking = {
        username: currentUser.username,
        parentName,
        babysitterName,
        date,
        time
    };


    let bookings = JSON.parse(localStorage.getItem('bookings')) || [];
    bookings.push(booking);
    localStorage.setItem('bookings', JSON.stringify(bookings));

    alert('Booking confirmed for ' + babysitterName + ' on ' + date + ' at ' + time + '.');

    document.getElementById('parentName').value = '';
    document.getElementById('babysitterName').value = '';
    document.getElementById('date').value = '';
    document.getElementById('time').value = '';

    displayBookings();
}

function displayBookings() {
    const currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
    if (!currentUser) {
        return;
    }

    const bookingsContainer = document.getElementById('bookingsContainer');
    bookingsContainer.innerHTML = '';

    const bookings = JSON.parse(localStorage.getItem('bookings')) || [];

    const userBookings = bookings.filter(booking => booking.username === currentUser.username);

    userBookings.forEach((booking, index) => {
        const bookingItem = document.createElement('div');
        bookingItem.classList.add('booking-item');
        bookingItem.innerHTML = `
            <h3>Booking ${index + 1}</h3>
            <p><strong>Parent Name:</strong> ${booking.parentName}</p>
            <p><strong>Babysitter Name:</strong> ${booking.babysitterName}</p>
            <p><strong>Date:</strong> ${booking.date}</p>
            <p><strong>Time:</strong> ${booking.time}</p>
        `;
        bookingsContainer.appendChild(bookingItem);
    });
}

// Display bookings on page load
document.addEventListener('DOMContentLoaded', displayBookings);

function logout() {
    sessionStorage.removeItem('currentUser');
    window.location.href = 'index.html'; // Redirect to login page
}
