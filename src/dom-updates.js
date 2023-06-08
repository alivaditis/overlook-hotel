const dateMessage = document.querySelector('.date-message')
const pleaseSelect = document.querySelector('.please-select-message')
const roomHeader = document.querySelector('.room-header')

const renderBookings = (tableElement, bookings) => {
  tableElement.innerHTML = ''
  if (bookings.length) {
  tableElement.innerHTML += `
     <tr>
      <th>Date</th>
      <th>Room Type</th>
      <th>Bidet</th>
      <th>Bed Size</th>
      <th class='number'>Beds</th>
      <th class='number'>Cost</th>
    </tr>
  `
    bookings.forEach((booking, i) => {
    tableElement.innerHTML += `
      <tr>
        <td>${booking.date}</td>
        <td>${booking.roomType}</td>
        <td>${booking.bidet}</td>
        <td>${booking.bedSize}</td>
        <td class='number'>${booking.numBeds}</td>
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
  if (rooms.length) {
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
        <td>${room.roomType}</td>
        <td>${room.numBeds} ${room.bedSize}</td>
        <td>${room.bidet}</td>
        <td class='number'>$${room.costPerNight.toFixed(2)}</td>
      <tr>
    `
    });
    roomHeader.classList.remove('hidden')
    pleaseSelect.classList.add('hidden')
  } else {
    tableElement.classList.add('hidden')
    dateMessage.classList.remove('hidden')
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

export { renderAvailableRooms, renderBookings, renderTotalExpense, renderTableHeader }