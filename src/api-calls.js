import { filterBookingsByUser, getRoomByNumber } from "./bookings";
import { rooms } from "./scripts"

const getRooms = () => {
  return fetch("http://localhost:3001/api/v1/rooms")
  .then(response => response.json())
  .then(data => data.rooms)
  .catch(err => console.log("ERROR", err));
}

const getAllBookings = () => {
  return fetch("http://localhost:3001/api/v1/bookings")
    .then(response => response.json())
    .then(data => data.bookings)
    .catch(err => console.log("ERROR", err));
}

const getUserBookings = (userId) => {
  return getAllBookings()
    .then(bookings => {
      return filterBookingsByUser(bookings, userId)
      })
    .catch(err => console.log("ERROR", err));
}

const getBookingInfo = (userId) => {
  return getUserBookings(userId)
    .then(filtered => {
      return filtered.map(booking => {
        const room = getRoomByNumber(booking.roomNumber, rooms)
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
    .catch(err => console.log("ERROR", err));
}

const getCostsPerNight = (userId) => {
  return getUserBookings(userId)
    .then(result => {
      return result.map(booking => {
        return getRoomByNumber(booking.roomNumber, rooms)
        .costPerNight
      })
    })
    .catch(err => console.log("ERROR", err));
}


const postRoomBooking = (userId, date, roomNumber) => {
  return fetch('http://localhost:3001/api/v1/bookings	', {
    method: 'POST',
    body: JSON.stringify({
      "userID": parseInt(userId), 
      "date": date, 
      "roomNumber": parseInt(roomNumber)
    }),
    headers: { 'Content-Type': 'application/json' }
  })
  .catch(err => console.log("ERROR", err));
}

export { getAllBookings, getUserBookings, getRooms, getBookingInfo, getCostsPerNight, postRoomBooking }