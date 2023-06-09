import chai from 'chai';
import { sampleRooms } from './sample-rooms'
import { sampleBookings } from './sample-bookings'
import { calculateExpense, filterByRoomType } from '../src/bookings'
const expect = chai.expect;

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

describe('filter available rooms by type', function() {

  it('should filter the available rooms by room type', function() {
    const suites = filterByRoomType(['suite'], sampleRooms)
    expect(suites).to.deep.equal([sampleRooms[0]]);
  });

  it('should filter the available rooms by a different room type', function() {
    const singles = filterByRoomType(['single room'], sampleRooms)
    expect(singles).to.deep.equal([sampleRooms[1], sampleRooms[2], sampleRooms[3]]);
  });

  it('should filter the available rooms by multiple room types', function() {
    const singles = filterByRoomType(['single room', 'junior suite'], sampleRooms)
    expect(singles).to.deep.equal([sampleRooms[1], sampleRooms[2], sampleRooms[3], sampleRooms[4]]);
  });

  it('should return a message if there are no available rooms of that type', function() {
    const resSuites = filterByRoomType(['residential suite'], sampleRooms)
    expect(resSuites).to.deep.equal(`No residential suites available for the selected date!`);
  });

});
