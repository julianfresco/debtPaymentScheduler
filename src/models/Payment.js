
class Payment {
  constructor(startAmount, paymentAmount){
    this.startAmount = startAmount
    this.paymentAmount = paymentAmount
    this.finalAmount = startAmount - paymentAmount
  }
}

export default Payment
