// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

// An example of how you tell webpack to use a CSS (SCSS) file
import './css/styles.css';

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/turing-logo.png'

import { getUserBookings, getRooms } from './api-calls';

console.log('This is the JavaScript entry file - your code begins here.');

// GLOBAL VARIABLES

let rooms;

// EVENT LISTENERS

window.addEventListener('load', () => {
  getRooms()
        .then(result => {
          rooms = result
          getTotalExpense(12)
        })
})

// FUNCTIONS

const getTotalExpense = (userId) => {
  getUserBookings(userId)
    .then(result => {
      return result.map(booking => {
        return rooms.find(r => r.number === booking.roomNumber)
        .costPerNight
      }).reduce((totalExpense, costPerRoom) => {
        return totalExpense += costPerRoom
      }, 0).toFixed(2)
  })
}

