import chai from 'chai';
import { sampleRooms } from './sample-rooms';
import { calculateExpense } from '../src/bookings';
const expect = chai.expect;

describe('See if the tests are running', function() {
  it('should return true', function() {
    expect(true).to.equal(true);
  });
});

describe('get total expense', function() {
  let expenseList
  
  beforeEach(() => {
    expenseList = sampleRooms.map(room => room.costPerNight)
  });

  it('should be able to calculate the total expense of a user given a list of expenses', function() {
    const totalExpense = calculateExpense(expenseList)
    expect(totalExpense).to.equal('1738.13');
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
