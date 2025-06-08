document.addEventListener('DOMContentLoaded', function () {
    const seatsContainer = document.querySelector('.seats-container');
    const totalPriceText = document.getElementById('totalPrice');
    const selectedSeatsText = document.getElementById('selectedSeatsText');
    const availableSeatsText = document.getElementById('availableSeatsText');
    const bookedSeatsText = document.getElementById('bookedSeatsText');
    const bookBtn = document.getElementById('bookBtn');

    const rows = 5, cols = 5, seatCount = rows * cols;
    let selectedSeats = [], bookedSeats = [];
    const seatPrices = Array.from({ length: seatCount }, () => Math.floor(Math.random() * 200) + 100); // Prices between ₹100 and ₹300

    // Generate seats and render them
    for (let i = 0; i < seatCount; i++) {
        const seat = document.createElement('div');
        seat.classList.add('seat');
        seat.innerHTML = `Seat ${i + 1}<br>₹${seatPrices[i]}`;
        seat.dataset.index = i;
        seatsContainer.appendChild(seat);
        seat.addEventListener('click', () => toggleSeat(seat));
    }

    // Toggle seat selection
    function toggleSeat(seat) {
        const seatIndex = seat.dataset.index;
        if (seat.classList.contains('booked')) return;

        if (seat.classList.toggle('selected')) {
            selectedSeats.push({ index: seatIndex, name: `Seat ${+seatIndex + 1}`, price: seatPrices[seatIndex] });
        } else {
            selectedSeats = selectedSeats.filter(s => s.index !== seatIndex);
        }

        updateDisplay();
    }

    // Update seat info and button status
    function updateDisplay() {
        selectedSeatsText.textContent = selectedSeats.length ? selectedSeats.map(s => s.name).join(', ') : 'None';
        bookedSeatsText.textContent = bookedSeats.length ? bookedSeats.map(s => s.name).join(', ') : 'None';
        availableSeatsText.textContent = seatCount - bookedSeats.length - selectedSeats.length;
        totalPriceText.textContent = selectedSeats.reduce((sum, s) => sum + s.price, 0).toFixed(2);
        bookBtn.disabled = !selectedSeats.length;
    }

    // Book the selected seats
    bookBtn.addEventListener('click', () => {
        selectedSeats.forEach(seat => {
            const seatEl = seatsContainer.children[seat.index];
            seatEl.classList.remove('selected');
            seatEl.classList.add('booked');
        });
        bookedSeats = bookedSeats.concat(selectedSeats);
        selectedSeats = [];
        updateDisplay();
    });

    updateDisplay();
});
