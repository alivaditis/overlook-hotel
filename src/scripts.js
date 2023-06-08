// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

// An example of how you tell webpack to use a CSS (SCSS) file
import './css/styles.css';

// An example of how you tell webpack to use an image (also need to link to it in the index.html)

import flatpickr from "flatpickr";
import { calculateExpense, seperateUpcomingPast, sortByDate, filterBookingsByDate, filterBookedRooms } from './bookings';
import { getUserBookings, getBookingInfo, getRooms, getCostsPerNight, getAllBookings } from './api-calls';
import { renderAvailableRooms, renderBookings, renderTotalExpense, renderTableHeader } from './dom-updates'

console.log('This is the JavaScript entry file - your code begins here.');

// QUERY SELECTORS

const pastTable = document.querySelector('.past-table')
const upcomingTable = document.querySelector('.upcoming-table')
const bookNowTable = document.querySelector('.book-now-table')
const totalDisplay = document.querySelector('.total-expense')
const upcomingHeader = document.querySelector('.upcoming-header')
const pastHeader = document.querySelector('.past-header')
const dateSelect = document.querySelector('#date-select')
const fp =  flatpickr(dateSelect, {
  // altInput: true,
  // altFormat: "F j, Y",
  dateFormat: "Y/m/d"
});

// GLOBAL VARIABLES

let rooms
const userId = 3

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
        getAllBookings()
          .then(result => filterBookingsByDate(('2022/01/24'),result))
          .then(bookedRooms => console.log(filterBookedRooms(rooms, bookedRooms)))
        getCostsPerNight(userId)
          .then(result => renderTotalExpense(totalDisplay, calculateExpense(result)))
    })
})

dateSelect.addEventListener('change', (event) => {
  getAllBookings()
  .then(result => filterBookingsByDate((`${dateSelect.value}`),result))
  .then(bookedRooms => filterBookedRooms(rooms, bookedRooms))
  .then(availableRooms => renderAvailableRooms(bookNowTable, availableRooms))
})

bookNowTable.addEventListener('click', (e) => {
  // if(e.target.id === )
})

export { rooms }