
class Schedule {
  constructor(debts, totalPayment){
    this.debts = debts
    this.totalPayment = totalPayment
    this.totalMonths = null
    this.totalPaid = null
  }
  /**
   * Calculates time and cost to pay off debts
   * Updates local props totalMonths totalPaid
   */
  schedule(){
    if(this.totalMonths !== null) return
    if(this.totalPaid !== null) return

    let numMonths = 0,
      paid = 0,
      remainingDebts = this.debts,
      excessPayment,
      payment,
      overpayment = 0

    while(remainingDebts.length){
      if(remainingDebts.length === 0) break

      // make monthly payment
      numMonths++
      excessPayment = remainingDebts.reduce(
        (total, debt) => total - debt.minPayment, this.totalPayment)
      
      remainingDebts.forEach((debt, i) => {
        payment = (i === 0) ?
          debt.minPayment + excessPayment :
          debt.minPayment
        if(overpayment) {
          payment += overpayment
          overpayment = 0
        }
        overpayment = debt.makeMonthlyPayment(payment)
        paid += payment - overpayment
      })

      remainingDebts = this.debts.filter(d => (d.balance > 0))
    }

    this.totalMonths = numMonths
    this.totalPaid = paid
  }
}

export default Schedule
