const getUserBookings = (userId) => {
  return fetch("http://localhost:3001/api/v1/bookings")
    .then(response => response.json())
    .then(data => console.log
      (data.bookings.filter(booking => booking.userID === userId)))
}

export { getUserBookings }