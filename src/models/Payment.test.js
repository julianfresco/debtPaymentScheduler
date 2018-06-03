import Payment from './Payment'


describe('Payment model', () => {

  it('should construct a Payment object', () => {
    const payment = new Payment(1000, 25, 975)
    expect(payment).toBeInstanceOf(Payment)
    expect(payment).toHaveProperty('startAmount', 1000)
    expect(payment).toHaveProperty('paymentAmount', 25)
    expect(payment).toHaveProperty('finalAmount', 975)
  })

})