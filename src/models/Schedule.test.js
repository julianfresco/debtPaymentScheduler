import {should} from 'chai'
import Debt from './Debt'
import Schedule from './Schedule'


describe('Schedule model', () => {
  should()

  it('should construct a Schedule object', () => {
    const debts = [
      new Debt('Sammie Fae Student Loan', 0.075, 15000, 150),
      new Debt('First Bank Student Loan', 0.05, 5000, 50)
    ]
    const schedule = new Schedule(debts, 1000)
    
    schedule.should.have.property('totalPayment', 1000)
    schedule.should.have.property('debts')
    schedule.debts.should.be.an.instanceof(Array)
    schedule.debts.should.have.lengthOf(2)
    schedule.debts[0].should.equal(debts[0])
    schedule.debts[1].should.equal(debts[1])
  })

  it('should determine the number of months and total spent', () => {
    const debts = [
      new Debt('Sammie Fae Student Loan', 0.075, 15000, 150),
      new Debt('First Bank Student Loan', 0.05, 5000, 50)
    ]
    const schedule = new Schedule(debts, 1000)
    
    schedule.schedule()
    // paying 1000 per month, focusing on the 15k loan first
    // yields payoff in 22 months and $21,225.95 paid
    schedule.should.have.property('totalMonths', 22)
    schedule.should.have.property('totalPaid', 21225.95)
  })

  it('should not be affected by calling schedule more than once', () => {
    const debts = [
      new Debt('Sammie Fae Student Loan', 0.075, 15000, 150),
      new Debt('First Bank Student Loan', 0.05, 5000, 50)
    ]
    const schedule = new Schedule(debts, 1000)
    
    schedule.schedule()
    schedule.schedule()
    schedule.schedule()
    // paying 1000 per month, focusing on the 15k loan first
    // yields payoff in 22 months and $21,225.95 paid
    schedule.should.have.property('totalMonths', 22)
    schedule.should.have.property('totalPaid', 21225.95)
  })

})