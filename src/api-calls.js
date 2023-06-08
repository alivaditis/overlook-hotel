import { rooms } from "./scripts"

const getUserBookings = (userId) => {
  return fetch("http://localhost:3001/api/v1/bookings")
    .then(response => response.json())
    .then(data => {
        return data.bookings.filter(booking => booking.userID === userId)
      })
}


const getAllBookings = () => {
  return fetch("http://localhost:3001/api/v1/bookings")
    .then(response => response.json())
    .then(data => data.bookings)
}

const getBookingInfo = (userId) => {
  return getUserBookings(userId)
    .then(filtered => {
      return filtered.map(booking => {
        const room = rooms.find(r => r.number === booking.roomNumber)
        return {
          date: booking.date,
          roomNumber: room.roomNumber,
          roomType: room.roomType,
          bidet: room.bidet,
          bedSize: room.bedSize,
          numBeds: room.numBeds,
          costPerNight: room.costPerNight
        }
      })
    })
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

export { getAllBookings, getUserBookings, getRooms, getBookingInfo, getCostsPerNight }