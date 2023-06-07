// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

// An example of how you tell webpack to use a CSS (SCSS) file
import './css/styles.css';

// An example of how you tell webpack to use an image (also need to link to it in the index.html)

import { calculateExpense, seperateUpcomingPast, sortByDate } from './bookings';
import { getUserBookings, getBookingInfo, getRooms, getCostsPerNight } from './api-calls';
import { renderBookings, renderTotalExpense } from './dom-updates'

console.log('This is the JavaScript entry file - your code begins here.');

// QUERY SELECTORS

const pastTable = document.querySelector('.past-table')
const upcomingTable = document.querySelector('.upcoming-table')
const totalDisplay = document.querySelector('.total-expense')

// GLOBAL VARIABLES

let rooms
const userId = 17

// EVENT LISTENERS

window.addEventListener('load', () => {
  getRooms()
    .then(result => {
      rooms = result  
      getBookingInfo(userId)
        .then(result => {
          const seperated = seperateUpcomingPast(result)
          renderBookings(upcomingTable, sortByDate(seperated.upcoming))
          renderBookings(pastTable, sortByDate(seperated.past))
        })
      getCostsPerNight(userId)
        .then(result => renderTotalExpense(totalDisplay, calculateExpense(result)))
    })
})

export { rooms }