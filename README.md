# Overlook

## Abstract:
A hotel dashboard system allows customers to log in and plan their next stay. Users can log in using different usernames and view different information such as the number of upcoming and past bookings, details on bookings, and the total amount spent to date. Users can also book their next stay and filter the available rooms by multiple room types.  Available rooms will be displayed based on the results of network requests.

## Installation Instructions:
1. Clone this repository https://github.com/alivaditis/overlook-hotel using the generated SSH link in the terminal
1. cd into the repository and run npm install to install dependencies
1. cd .. to get out of the directory
1. clone down the local server and follow the steps listed in the link to get it installed https://github.com/turingschool-examples/overlook-api
1. run npm start in both directories and go to http://localhost:8080/ You should see hotel landing page
1. Press the sign in button and enter a username and password to visit the site => Username: customer50 Password: overlook2021
1. There are 50 valid usernames, the pattern is the substring customer followed by id substrings of 1-50, all have the same password of overlook2021


## Preview of App:

![ezgif com-video-to-gif (1)](https://github.com/alivaditis/overlook-hotel/assets/123565022/769d2175-6684-49cf-8485-867fc92fb2a7)

## Context:
- Solo project for the Second Mod of the Turing Front End Sofware Development Program.  This project demonstrates the implementation of new concepts learned over the past 5 weeks of class.  The task was to build a hotel website where users can login, book rooms, and view a history of their bookings on a user dashboard.

## Contributors:
- [Alec Livaditis](https://github.com/alivaditis)

## Learning Goals:
- Use object and array prototype methods to perform data manipulation
- Create a clear and accessible user interface
- Make network requests to retrieve, post, and render data
- Implement a robust testing suite using TDD
- Write DRY, reusable code that follows SRP (Single Responsibility Principle)
- Ensure the site is accessible for as many users as possible

## Wins + Challenges:
- Successfully handling asynchronous code, rendering data on the page reflecting data retrieved from network requests
- Using flatpickr and pure-select input dependencies to filter bookings by date and multiple room types
