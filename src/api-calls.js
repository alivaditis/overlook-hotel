const getUserBookings = (userId) => {
  return fetch("http://localhost:3001/api/v1/bookings")
    .then(response => response.json())
    .then(data => data.bookings.filter(booking => booking.userID === userId))
}

const getRooms = () => {
  return fetch("http://localhost:3001/api/v1/rooms")
  .then(response => response.json())
  .then(data => data.rooms)
}

export { getUserBookings, getRooms }