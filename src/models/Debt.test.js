import {should} from 'chai'
import Debt from './Debt'


describe('Debt model', () => {
  should() // init chai should

  it('should instantiate Debt object with default values', () => {
    const debt = new Debt()
    debt.should.be.an.instanceof(Debt)
    debt.should.have.property('name', 'My Debt')
    debt.should.have.property('apr', 0)
    debt.should.have.property('startingAmount', 0)
    debt.should.have.property('balance', 0)
    debt.should.have.property('minPayment', 0)
    debt.should.have.property('payments')
    debt.payments.should.be.an.instanceof(Array)
    debt.payments.should.have.lengthOf(0)
  })

  it('should instantiate Debt object with constructor values', () => {
    const debt = new Debt('Big Brother Bank', 0.05, 1000, 10)
    debt.should.have.property('name', 'Big Brother Bank')
    debt.should.have.property('apr', 0.05)
    debt.should.have.property('startingAmount', 1000)
    debt.should.have.property('balance', 1000)
    debt.should.have.property('minPayment', 10)
    debt.should.have.property('payments')
    debt.payments.should.be.an.instanceof(Array)
    debt.payments.should.have.lengthOf(0)
  })

  it('should accrue interest', () => {
    const debt = new Debt('Big Interest Bank', 0.15, 1000, 25)
    debt.should.have.property('startingAmount', 1000)
    debt.should.have.property('balance', 1000)
    
    debt.accrueInterest()
    // 1000 + (1000 * 0.15 / 12) = $1,012.5
    debt.balance.should.equal(1012.5)
  })

  it('should apply a payment', () => {
    const debt = new Debt('Big Bucks Bank', 0.15, 1000, 25)
    debt.should.have.property('startingAmount', 1000)
    debt.should.have.property('balance', 1000)
    const overPayment = debt.makeMonthlyPayment(25)
    // 1000 + (1000 * 0.15 / 12) = 1,012.5  (accrueInterest)
    // then 1,012.5 - 25 = $987.50
    debt.balance.should.equal(987.5)
    debt.payments.should.have.lengthOf(1)
    debt.payments[0].should.have.property('startAmount', 1012.5)
    debt.payments[0].should.have.property('paymentAmount', 25)
    debt.payments[0].should.have.property('finalAmount', 987.5)
    overPayment.should.equal(0)
  })

  it('should apply a final payment and return over-payment', () => {
    const debt = new Debt('Big Bucks Bank', 0.1, 100, 10)
    debt.should.have.property('startingAmount', 100)
    debt.should.have.property('balance', 100)
    
    // payment 1
    const overPayment1 = debt.makeMonthlyPayment(50)
    // 100 + (100 * 0.1 / 12) = $100.83 (accrueInterest)
    // then 100.83 - 50 = 50.83
    debt.balance.should.equal(50.83)
    debt.payments.should.have.lengthOf(1)
    overPayment1.should.equal(0)

    // payment 2
    const overPayment2 = debt.makeMonthlyPayment(50)
    // 50.83 + (50.83 * 0.1 / 12) = $51.25 (accrueInterest)
    // then 51.25 - 50 = 1.25
    debt.balance.should.equal(1.25)
    debt.payments.should.have.lengthOf(2)
    overPayment2.should.equal(0)
    
    // payment 3
    const overPayment3 = debt.makeMonthlyPayment(50)
    // 1.25 + (1.25 * 0.1 / 12) = $1.26 (accrueInterest)
    // then 1.26 - 50 = -$48.74
    debt.balance.should.equal(0)
    debt.payments.should.have.lengthOf(3)
    overPayment3.should.equal(48.74)
  })

  it('should return the paymentAmount when debt is fulfilled', () => {
    const debt = new Debt('Big Timer Bank', 0.1, 0, 10)
    debt.should.have.property('startingAmount', 0)
    debt.should.have.property('balance', 0)
    const overPayment = debt.makeMonthlyPayment(50)
    debt.balance.should.equal(0)
    overPayment.should.equal(50)
  })
})