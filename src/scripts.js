// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

// An example of how you tell webpack to use a CSS (SCSS) file
import './css/styles.css';

// An example of how you tell webpack to use an image (also need to link to it in the index.html)

import flatpickr from "flatpickr";
import { calculateExpense, seperateUpcomingPast, sortByDate } from './bookings';
import { getUserBookings, getBookingInfo, getRooms, getCostsPerNight } from './api-calls';
import { renderBookings, renderTotalExpense, renderTableHeader } from './dom-updates'

console.log('This is the JavaScript entry file - your code begins here.');

// QUERY SELECTORS

const pastTable = document.querySelector('.past-table')
const upcomingTable = document.querySelector('.upcoming-table')
const totalDisplay = document.querySelector('.total-expense')
const upcomingHeader = document.querySelector('.upcoming-header')
const pastHeader = document.querySelector('.past-header')
const dateSelect = document.querySelector('#date-select')
const fp =  flatpickr(dateSelect, {
  altInput: true,
  altFormat: "F j, Y",
  dateFormat: "Y-m-d"
});

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
          renderTableHeader(pastHeader, seperated.past, true)
          renderTableHeader(upcomingHeader, seperated.upcoming, false)
          renderBookings(upcomingTable, sortByDate(seperated.upcoming))
          renderBookings(pastTable, sortByDate(seperated.past))
        })
      getCostsPerNight(userId)
        .then(result => renderTotalExpense(totalDisplay, calculateExpense(result)))
    })
})



export { rooms }