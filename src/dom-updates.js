
const renderBookings = (tableElement, bookings) => {
  tableElement.innerHTML = ''
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
  if (bookings.length) {
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
  }
}

const renderTotalExpense = (element, total) => {
  element.innerText = `Total Expense: $${total}`
}

export { renderBookings, renderTotalExpense }