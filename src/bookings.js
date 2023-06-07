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

const sortByDate = (bookings) => {
  return bookings.sort((a, b) => new Date(a.date) - new Date(b.date))
}

export { calculateExpense, seperateUpcomingPast, sortByDate }