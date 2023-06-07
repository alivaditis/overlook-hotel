const getUserBookings = (userId) => {
  return fetch("http://localhost:3001/api/v1/bookings")
    .then(response => response.json())
    .then(data => data.bookings.filter(booking => booking.userID === userId))
}

const getCostsPerNight = (userId) => {
  return getUserBookings(userId)
    .then(result => {
      return result.map(booking => {
        return rooms.find(r => r.number === booking.roomNumber)
        .costPerNight
      })
    })
}

const getRooms = () => {
  return fetch("http://localhost:3001/api/v1/rooms")
  .then(response => response.json())
  .then(data => data.rooms)
}

export { getUserBookings, getRooms, getCostsPerNight }