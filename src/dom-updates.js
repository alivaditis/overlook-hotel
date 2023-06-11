const dateMessage = document.querySelector('.date-message')
const pleaseSelect = document.querySelector('.please-select-message')
const roomHeader = document.querySelector('.room-header')
const bookedMessage = document.querySelector('.booked-message')
const bookNow = document.querySelector('.book-now')

const renderBookings = (tableElement, bookings) => {
  tableElement.innerHTML = ''
  if (bookings.length) {
  tableElement.innerHTML += `
     <tr>
      <th>Date</th>
      <th>Room Type</th>
      <th>Beds</th>
      <th>Bidet</th>
      <th class='number'>Cost</th>
    </tr>
  `
    bookings.forEach((booking, i) => {
    tableElement.innerHTML += `
      <tr>
        <td>${booking.date}</td>
        <td>${booking.roomType}</td>
        <td>${booking.numBeds} ${booking.bedSize}</td>
        <td>${booking.bidet}</td>
        <td class='number'>$${booking.costPerNight.toFixed(2)}</td>
      <tr>
    `
    });
  } else {
    tableElement.innerText = 'No bookings!'
  }
}

const renderAvailableRooms = (tableElement, rooms) => {
  tableElement.innerHTML = ''
  if (!rooms.length  || !Array.isArray(rooms))  {
    tableElement.classList.add('hidden')
    dateMessage.classList.remove('hidden')
  } else {
  tableElement.classList.remove('hidden')
  dateMessage.classList.add('hidden')
  tableElement.innerHTML += `
     <tr>
      <th>Room Type</th>
      <th>Beds</th>
      <th>Bidet</th>
      <th class='number'>Cost</th>
    </tr>
  `
    rooms.forEach((room) => {
    tableElement.innerHTML += `
      <tr id='${room.number}' class='room'>
        <td class='click-me'>${room.roomType}</td>
        <td class='click-me'>${room.numBeds} ${room.bedSize}</td>
        <td class='click-me'>${room.bidet}</td>
        <td class='click-me number'>$${room.costPerNight.toFixed(2)}</td>
      <tr>
    `
    });
    roomHeader.classList.remove('hidden')
    pleaseSelect.classList.add('hidden')
  }
}


const renderTableHeader = (element, bookings, past) => {
  if(past) {
    element.innerText = `Past Bookings: ${bookings.length}`
  } else {
    element.innerText = `Upcoming Bookings: ${bookings.length}`
  }
}

const renderTotalExpense = (element, total) => {
  element.innerText = `Total Expense: $${total}`
}

const renderBookingConfirmation = (roomNumber, userId, date) => {
  bookedMessage.innerText = `Booking Confirmed!\n 
    UserId: ${userId}\n
    Room Number: ${roomNumber}\n
    Date: ${date}`
  bookNow.classList.add('hidden')
  bookedMessage.classList.remove('hidden')
  setTimeout( () => 
  {
    bookedMessage.classList.add('hidden');
    bookNow.classList.remove('hidden')
  },
  3000)
}

export { renderAvailableRooms, renderBookings, renderTotalExpense, renderTableHeader, renderBookingConfirmation }