import chai from 'chai';
import { sampleRooms } from './sample-rooms'
import { sampleBookings } from './sample-bookings'
import { filterBookingsByUser, calculateExpense, filterBookedRooms, filterBookingsByDate, filterByRoomType, seperateUpcomingPast,sortByDate } from '../src/bookings'
const expect = chai.expect;

describe('filter bookings by userId', function() {

  it('should be able to filter bookings by a customer id', function() {
    const customerBookings = filterBookingsByUser(sampleBookings, 9)
    expect(customerBookings).to.deep.equal([sampleBookings[0]])
  })

  it('should be able to filter bookings by a different customer id', function() {
    const customerBookings = filterBookingsByUser(sampleBookings, 43)
    expect(customerBookings).to.deep.equal([sampleBookings[1]])
  })

  it('should be able to return more than one booking by a customer id', function() {
    const customerBookings = filterBookingsByUser(sampleBookings, 20)
    expect(customerBookings).to.deep.equal([sampleBookings[3], sampleBookings[4]])
  })

  it('should be return an empty array if no bookings are found for user', function() {
    const customerBookings = filterBookingsByUser(sampleBookings, 1)
    expect(customerBookings).to.deep.equal([])
  })

});

describe('retrieve room info by room number', function() {

  it('should be able to filter bookings by a customer id', function() {
    const customerBookings = filterBookingsByUser(sampleBookings, 9)
    expect(customerBookings).to.deep.equal([sampleBookings[0]])
  })

  it('should be able to filter bookings by a different customer id', function() {
    const customerBookings = filterBookingsByUser(sampleBookings, 43)
    expect(customerBookings).to.deep.equal([sampleBookings[1]])
  })

  it('should be able to return more than one booking by a customer id', function() {
    const customerBookings = filterBookingsByUser(sampleBookings, 20)
    expect(customerBookings).to.deep.equal([sampleBookings[3], sampleBookings[4]])
  })

  it('should be return an empty array if no bookings are found for user', function() {
    const customerBookings = filterBookingsByUser(sampleBookings, 1)
    expect(customerBookings).to.deep.equal([])
  })

});

describe('get total expense', function() {
  let expenseList
  
  beforeEach(() => {
    expenseList = sampleRooms.map(room => room.costPerNight)
  });

  it('should be able to calculate the total expense of a user given a list of expenses', function() {
    const totalExpense = calculateExpense(expenseList)
    expect(totalExpense).to.equal('2066.28');
  });

  it('should be able to calculate the total expense of a user given a different list of expenses', function() {
    const totalExpense = calculateExpense([expenseList[0], expenseList[1]])
    expect(totalExpense).to.equal('968.52');
  });

  it('should return a message if no rooms are booked for the user', function() {
    const totalExpense = calculateExpense([])
    expect(totalExpense).to.equal('Please book some rooms!');
  });

});

describe('filter available rooms by types', function() {

  it('should filter the available rooms by room type', function() {
    const suites = filterByRoomType(['suite'], sampleRooms)
    expect(suites).to.deep.equal([sampleRooms[0]]);
  });

  it('should filter the available rooms by a different room type', function() {
    const singles = filterByRoomType(['single room'], sampleRooms)
    expect(singles).to.deep.equal([sampleRooms[1], sampleRooms[2], sampleRooms[3]]);
  });

  it('should filter the available rooms by multiple room types', function() {
    const singlesJuniors = filterByRoomType(['single room', 'junior suite'], sampleRooms)
    expect(singlesJuniors).to.deep.equal([sampleRooms[1], sampleRooms[2], sampleRooms[3], sampleRooms[4]]);
  });

  it('should return a message if there are no available rooms of that type', function() {
    const resSuites = filterByRoomType(['residential suite'], sampleRooms)
    expect(resSuites).to.deep.equal(`No residential suites available for the selected date!`);
  });

});

describe('sort bookings by date', function() {

  it('should be able to sort the bookings by most recent to furthest past date', function() {
    const sorted = sortByDate(sampleBookings, 'recent-past')
    expect(sorted).to.deep.equal([sampleBookings[4], sampleBookings[0],sampleBookings[3] ,sampleBookings[1], sampleBookings[2]]);
  });

  it('should be able to sort the bookings by furthest past to most recent date', function() {
    const sorted = sortByDate(sampleBookings, 'past-recent')
    expect(sorted).to.deep.equal([sampleBookings[2],sampleBookings[1] ,sampleBookings[3], sampleBookings[0], sampleBookings[4]]);
  });

});

describe('seperate bookings by upcoming or past', function() {

  it('should be able to seperate bookings into upocoming and past groups', function() {
    const sorted = seperateUpcomingPast(sampleBookings)
    expect(sorted).to.deep.equal({upcoming: [sampleBookings[4]], past: [sampleBookings[0], sampleBookings[1], sampleBookings[2], sampleBookings[3]]});
  });

  it('should be able to seperate bookings into upocoming and past groups for a different set of data', function() {
    const sorted = seperateUpcomingPast([sampleBookings[0], sampleBookings[1]])
    expect(sorted).to.deep.equal({upcoming: [], past: [sampleBookings[0], sampleBookings[1]]});
  });

});

describe('get room numbers available by specified date', function() {

  let rooms
  
  beforeEach(() => {
    rooms = sampleRooms
  });

  it('should return the room numbers of rooms are booked for a specific date', function() {
    const bookedRooms = filterBookingsByDate('2022/01/10',sampleBookings)
    expect(bookedRooms).to.deep.equal([4])
  });

  it('should return the room numbers of rooms are booked for a different date', function() {
    const bookedRooms = filterBookingsByDate('2023/12/14',sampleBookings)
    expect(bookedRooms).to.deep.equal([17])
  });

});

describe('get room numbers available by specified date', function() {

  let rooms
  
  beforeEach(() => {
    rooms = sampleRooms
  });

  it('should return the room numbers of rooms are booked for a specific date', function() {
    const availableRooms = filterBookedRooms(rooms, [2, 3])
    expect(availableRooms).to.deep.equal([rooms[2], rooms[3], rooms[4]])
  });

  it('should return the room numbers of rooms are booked for a specific date', function() {
    const availableRooms = filterBookedRooms(rooms, [4, 5, 17])
    expect(availableRooms).to.deep.equal([rooms[0], rooms[1]])
  });

});