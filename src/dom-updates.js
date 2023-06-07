
const renderBookings = (tableElement, bookings) => {
  tableElement.innerHTML = ''
  if (bookings.length) {
  tableElement.innerHTML += `
     <tr>
      <th>Date Booked</th>
      <th>Room Type</th>
      <th>Bidet</th>
      <th>Bed Size</th>
      <th>Bed Number</th>
      <th>Cost Per Night</th>
    </tr>
  `
    bookings.forEach((booking, i) => {
    tableElement.innerHTML += `
      <tr>
        <td>${booking.date}</td>
        <td>${booking.roomType}</td>
        <td>${booking.bidet}</td>
        <td>${booking.bedSize}</td>
        <td>${booking.numBeds}</td>
        <td>${booking.costPerNight}</td>
      <tr>
    `
    });
  } else {
    tableElement.innerText = 'No bookings!'
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

export { renderBookings, renderTotalExpense, renderTableHeader }