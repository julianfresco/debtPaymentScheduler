import {should} from 'chai'
import Payment from './Payment'


describe('Payment model', () => {
  should()

  it('should construct a Payment object', () => {
    const payment = new Payment(1000, 25, 975)
    payment.should.be.an.instanceof(Payment)
    payment.should.have.property('startAmount', 1000)
    payment.should.have.property('paymentAmount', 25)
    payment.should.have.property('finalAmount', 975)
  })

})