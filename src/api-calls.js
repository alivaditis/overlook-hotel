import { rooms } from "./scripts"

const getAllBookings = () => {
  return fetch("http://localhost:3001/api/v1/bookings")
    .then(response => response.json())
    .then(data => data.bookings)
    .catch(err => console.log("ERROR", err));
}

const getRooms = () => {
  return fetch("http://localhost:3001/api/v1/rooms")
  .then(response => response.json())
  .then(data => data.rooms)
  .catch(err => console.log("ERROR", err));
}

const getUserBookings = (userId) => {
  return getAllBookings()
    .then(data => {
      return data.filter(booking => booking.userID === userId)
      })
    .catch(err => console.log("ERROR", err));
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
    .catch(err => console.log("ERROR", err));
}

const getCostsPerNight = (userId) => {
  return getUserBookings(userId)
    .then(result => {
      return result.map(booking => {
        return rooms.find(r => r.number === booking.roomNumber)
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