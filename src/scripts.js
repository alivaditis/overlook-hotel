// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

// An example of how you tell webpack to use a CSS (SCSS) file
import './css/styles.css';

// An example of how you tell webpack to use an image (also need to link to it in the index.html)

import flatpickr from "flatpickr";
import 'select-pure/dist/index.js';
import { calculateExpense, seperateUpcomingPast, sortByDate, filterBookingsByDate, filterBookedRooms, filterByRoomType } from './bookings';
import { getUserBookings, getBookingInfo, getRooms, getCostsPerNight, getAllBookings, postRoomBooking } from './api-calls';
import { renderAvailableRooms, renderBookings, renderTotalExpense, renderTableHeader, renderBookingConfirmation } from './dom-updates'

console.log('This is the JavaScript entry file - your code begins here.');

// QUERY SELECTORS

const pastTable = document.querySelector('.past-table')
const upcomingTable = document.querySelector('.upcoming-table')
const bookNowTable = document.querySelector('.book-now-table')
const totalDisplay = document.querySelector('.total-expense')
const upcomingHeader = document.querySelector('.upcoming-header')
const pastHeader = document.querySelector('.past-header')
const dateSelect = document.querySelector('#date-select')
const roomTypeSelect = document.querySelector('select-pure')
const fp =  flatpickr(dateSelect, {
  dateFormat: "Y/m/d"
});

// GLOBAL VARIABLES

let rooms
const userId = 6

// EVENT LISTENERS

window.addEventListener('load', () => {
  getRooms()
    .then(result => {
      rooms = result  
      displayUserBookings()
    })

})

dateSelect.addEventListener('change', () => {
  displayAvailableRooms()
})

roomTypeSelect.addEventListener('change', () => {
  displayAvailableRooms()
})

bookNowTable.addEventListener('click', (e) => {
  if(e.target.classList.contains('click-me')) {
    bookRoom(e)
  }
})

// Functions

const displayAvailableRooms = () => {
  getAllBookings()
  .then(result => filterBookingsByDate((`${dateSelect.value}`),result))
  .then(bookedRooms => filterBookedRooms(rooms, bookedRooms))
  .then(availableRooms => filterByRoomType(roomTypeSelect.values, availableRooms))
  .then(filteredRooms => renderAvailableRooms(bookNowTable, filteredRooms))
  roomTypeSelect.enable()
}

const bookRoom = (e) => {
  const date = dateSelect.value
  const roomNumber = e.target.parentNode.id
  postRoomBooking(userId, date, roomNumber)
  .then(result => {
    displayAvailableRooms()
    renderBookingConfirmation(roomNumber, userId, date)
    displayUserBookings()
  })
}

const displayUserBookings = () => {
  getBookingInfo(userId)
  .then(result => {
    const seperated = seperateUpcomingPast(result)
    renderTableHeader(pastHeader, seperated.past, true)
    renderTableHeader(upcomingHeader, seperated.upcoming, false)
    renderBookings(upcomingTable, sortByDate(seperated.upcoming, 'past-recent'))
    renderBookings(pastTable, sortByDate(seperated.past, 'recent-past'))
  })
  getCostsPerNight(userId)
    .then(result => renderTotalExpense(totalDisplay, calculateExpense(result)))
}

export { rooms }