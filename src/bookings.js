const filterBookingsByUser = (bookings, userId) => {
  return bookings.filter(booking => booking.userID === userId)
}

const getRoomByNumber = (roomNumber, rooms) => {
  const room = rooms.find(r => r.number === roomNumber);
  if (!room) {
    return 'No room exists for that room number'
  }
  return room
};

const calculateExpense = (expenseList) => {
  if (!expenseList.length) {
    return 'Please book some rooms!'
  }
  return expenseList.reduce((totalExpense, costPerRoom) => {
    return totalExpense += costPerRoom
  }, 0).toFixed(2)
}

const seperateUpcomingPast = (bookings) => {
  const currentDate = new Date();
  return bookings.reduce((upcomingPast, booking) => {
    const bookingDate = new Date(booking.date)
    if(bookingDate < currentDate) {
      upcomingPast.past.push(booking)
    } else {
      upcomingPast.upcoming.push(booking)
    }
    return upcomingPast
  }, {upcoming:[], past: []})
}

const sortByDate = (bookings, order) => {
  if (order === 'recent-past') {
  return [...bookings].sort((a, b) => new Date(b.date) - new Date(a.date))
  }
  if (order === 'past-recent')
  return [...bookings].sort((a, b) => new Date(a.date) - new Date(b.date))
}

const filterBookingsByDate = (inputValue, bookings) => {
  return bookings.filter(booking => booking.date === inputValue)
  .map(booking => booking.roomNumber)
}

const filterBookedRooms = (rooms, bookedRooms) => {
  return rooms.filter(room => {
    return !bookedRooms.some(bookedRoom => bookedRoom === room.number)
  })
}

const filterByRoomType = (roomTypes, availableRooms) => {
  if(!roomTypes.length) {
    return availableRooms
  }
  const filteredRooms = availableRooms.filter(r => roomTypes.includes(r.roomType))
  if (!filteredRooms.length) {
    return `No ${roomTypes.join(" or ")}s available for the selected date!`;
  }
  return filteredRooms
}



export { calculateExpense, seperateUpcomingPast, sortByDate, filterBookingsByDate, filterBookedRooms, filterByRoomType, filterBookingsByUser, getRoomByNumber }