// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

// An example of how you tell webpack to use a CSS (SCSS) file
import './css/styles.css';

// An example of how you tell webpack to use an image (also need to link to it in the index.html)

import flatpickr from "flatpickr";
import 'select-pure/dist/index.js';
import { calculateExpense, seperateUpcomingPast, sortByDate, filterBookingsByDate, filterBookedRooms, filterByRoomType } from './bookings';
import { getUserBookings, getUser, getBookingInfo, getRooms, getCostsPerNight, getAllBookings, postRoomBooking } from './api-calls';
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
const signIn = document.querySelector('.sign-in')
const signInContainer = document.querySelector('.sign-in-container')
const signInButton = document.querySelector('.sign-in-button')
const userInput = document.querySelector('#username')
const passwordInput = document.querySelector('#password')
const userIdErr = document.querySelector('.user-id-error')
const signedInElements = document.querySelectorAll('.signed-in')
const avatar = document.querySelector('.sign-in-text')
const fp =  flatpickr(dateSelect, {
  dateFormat: "Y/m/d",
  minDate: "today"
});

// GLOBAL VARIABLES

let rooms;
let userId;
let userName;

// EVENT LISTENERS

window.addEventListener('load', () => {
  getRooms()
    .then(result => {
      rooms = result
      if(!rooms) {
        alert("Server is down."); 
      }
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

bookNowTable.addEventListener('keydown', (e) => {
  if (e.keyCode !== 13) return
  if(e.target.classList.contains('click-me')) {
    bookRoom(e)
  }
})

document.addEventListener('focusout', (e) => {
  handleFocusOut(e)
});

signIn.addEventListener('click', (e) => {
  displaySignIn()
})

signIn.addEventListener('keydown', (e) => {
  if (e.keyCode !== 13) return
  displaySignIn()
})

signInButton.addEventListener('click', (e) => {
  e.preventDefault()
  if  (validatePassword(passwordInput.value) && validateUsername(userInput.value)) {
  const signInId = userInput.value.substring(8)
  userIdErr.classList.add('hidden')
  getUser(signInId)
    .then(data => {
      userInput.value=''
      passwordInput.value=''
      userId = data.id
      userName = data.name
      avatar.innerText = `${userName}`
      signInContainer.classList.add('hidden')
      displayUserBookings()
      signedInElements.forEach(element => {
        element.classList.remove('hidden')
      })
    })
  } else if (!passwordInput.value || !userInput.value) {
    userIdErr.innerText = 'Not a valid username or password.'
    userIdErr.classList.remove('hidden')
    userInput.value=''
    passwordInput.value=''
  } else {
    userIdErr.innerText = 'Username and password do not match.'
    userIdErr.classList.remove('hidden')
    userInput.value=''
    passwordInput.value=''
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
  const roomNumber = e.target.parentNode.id || e.target.id
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

function handleFocusOut(e) {
  const focusedElement = e.target
  if (!roomTypeSelect.contains(focusedElement)) {
    roomTypeSelect.close()  
  }
}

const displaySignIn = () => {
  signInContainer.classList.toggle('hidden')
}

const validateUsername = (username)  => {
  const pattern = /^customer\d+$/; // regex pattern: starts with 'customer' followed by one or more digits
  return pattern.test(username);
}

const validatePassword = (password) => {
  if(password === 'overlook2021') {
    return true
  } else {
    return false
  }
}

export { rooms }