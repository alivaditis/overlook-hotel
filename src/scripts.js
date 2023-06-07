// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

// An example of how you tell webpack to use a CSS (SCSS) file
import './css/styles.css';

// An example of how you tell webpack to use an image (also need to link to it in the index.html)

import { calculateExpense } from './bookings';
import { getUserBookings, getBookingInfo, getRooms, getCostsPerNight } from './api-calls';
import { renderBookings, renderTotalExpense } from './dom-updates'

console.log('This is the JavaScript entry file - your code begins here.');

// QUERY SELECTORS

const pastTable = document.querySelector('.past-table')
const upcomingTable = document.querySelector('.upcoming-table')
const totalDisplay = document.querySelector('.total-expense')

// GLOBAL VARIABLES

let rooms
const currentDate = new Date()
const userId = 9

// EVENT LISTENERS

window.addEventListener('load', () => {
  getRooms()
    .then(result => {
      rooms = result  
      getBookingInfo(userId)
        .then(result => {
          renderBookings(pastTable, result)
        })
      getCostsPerNight(userId)
        .then(result => renderTotalExpense(totalDisplay, calculateExpense(result)))
    })
  // getUserBookings(userId)
  //   .then(result => {
  //     renderBookings(pastTable, result)
  //   })
})

// FUNCTIONS

// const getTotalExpense = (userId) => {
//   return getUserBookings(userId)
//     .then(result => {
//       return result.map(booking => {
//         return rooms.find(r => r.number === booking.roomNumber)
//         .costPerNight
//       }).reduce((totalExpense, costPerRoom) => {
//         return totalExpense += costPerRoom
//       }, 0).toFixed(2)
//   })
// }

export { rooms }