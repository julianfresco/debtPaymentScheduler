import Payment from './Payment'


class Debt {
  constructor(name='My Debt', apr=0, amount=0, minPayment=0){
    this.name = name
    this.apr = apr
    this.startingAmount = amount
    this.balance = amount
    this.minPayment = minPayment
    this.payments = []
  }

  /**
   * Accrues interest and apply payment for the month
   * @param {Number} paymentAmount - how much is the payment
   * @returns {Number} - any amount remaining after paymentAmount is applied to the debt
   */
  makeMonthlyPayment(paymentAmount){
    if(this.balance === 0) { return paymentAmount }
    if(paymentAmount < this.minPayment) {
      throw Error('Payment is below the monthly minimum.')
    }

    this.accrueInterest()
    const payment = new Payment(this.balance, paymentAmount)
    this.payments.push(payment)
    this.balance = (payment.finalAmount < 0) ? 0 : payment.finalAmount
    
    return (this.balance === 0) ? -payment.finalAmount : 0
  }
  /**
   * Increase the debt balance by the monthly interest rate
   */
  accrueInterest(){
    const interest = this.balance*this.apr/12
    this.balance += parseFloat(interest.toFixed(2))
  }
}

export default Debt
