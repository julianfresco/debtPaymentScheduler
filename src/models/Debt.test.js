import Debt from './Debt'


describe('Debt model', () => {

  it('should instantiate Debt object with default values', () => {
    const debt = new Debt()
    expect(debt).toHaveProperty('name', 'My Debt')
    expect(debt).toHaveProperty('apr', 0)
    expect(debt).toHaveProperty('startingAmount', 0)
    expect(debt).toHaveProperty('balance', 0)
    expect(debt).toHaveProperty('minPayment', 0)
    expect(debt).toHaveProperty('payments')
    expect(debt.payments).toBeInstanceOf(Array)
    expect(debt.payments).toHaveLength(0)
  })

  it('should instantiate Debt object with constructor values', () => {
    const debt = new Debt('Big Brother Bank', 0.05, 1000, 10)
    expect(debt).toHaveProperty('name', 'Big Brother Bank')
    expect(debt).toHaveProperty('apr', 0.05)
    expect(debt).toHaveProperty('startingAmount', 1000)
    expect(debt).toHaveProperty('balance', 1000)
    expect(debt).toHaveProperty('minPayment', 10)
    expect(debt).toHaveProperty('payments')
    expect(debt.payments).toBeInstanceOf(Array)
    expect(debt.payments).toHaveLength(0)
  })

  it('should accrue interest', () => {
    const debt = new Debt('Big Interest Bank', 0.15, 1000, 25)
    
    expect(debt).toHaveProperty('startingAmount', 1000)
    expect(debt).toHaveProperty('balance', 1000)
    debt.accrueInterest()
    // 1000 + (1000 * 0.15 / 12) = $1,012.5
    expect(debt.balance).toBe(1012.5)
  })

  it('should apply a payment', () => {
    const debt = new Debt('Big Bucks Bank', 0.15, 1000, 25)
    expect(debt).toHaveProperty('startingAmount', 1000)
    expect(debt).toHaveProperty('balance', 1000)
    const overPayment = debt.makeMonthlyPayment(25)
    // 1000 + (1000 * 0.15 / 12) = 1,012.5  (accrueInterest)
    // then 1,012.5 - 25 = $987.50
    expect(debt.balance).toBe(987.5)
    expect(debt.payments).toHaveLength(1)
    expect(debt.payments[0]).toHaveProperty('startAmount', 1012.5)
    expect(debt.payments[0]).toHaveProperty('paymentAmount', 25)
    expect(debt.payments[0]).toHaveProperty('finalAmount', 987.5)
    expect(overPayment).toBe(0)
  })

  it('should apply a final payment and return over-payment', () => {
    const debt = new Debt('Big Bucks Bank', 0.1, 100, 10)
    expect(debt).toHaveProperty('startingAmount', 100)
    expect(debt).toHaveProperty('balance', 100)
    
    // payment 1
    const overPayment1 = debt.makeMonthlyPayment(50)
    // 100 + (100 * 0.1 / 12) = $100.83 (accrueInterest)
    // then 100.83 - 50 = 50.83
    expect(debt.balance).toBe(50.83)
    expect(debt.payments).toHaveLength(1)
    expect(overPayment1).toBe(0)

    // payment 2
    const overPayment2 = debt.makeMonthlyPayment(50)
    // 50.83 + (50.83 * 0.1 / 12) = $51.25 (accrueInterest)
    // then 51.25 - 50 = 1.25
    expect(debt.balance).toBe(1.25)
    expect(debt.payments).toHaveLength(2)
    expect(overPayment2).toBe(0)
    
    // payment 3
    const overPayment3 = debt.makeMonthlyPayment(50)
    // 1.25 + (1.25 * 0.1 / 12) = $1.26 (accrueInterest)
    // then 1.26 - 50 = -$48.74
    expect(debt.balance).toBe(0)
    expect(debt.payments).toHaveLength(3)
    expect(overPayment3).toBe(48.74)
  })

  it('should return the paymentAmount when debt is fulfilled', () => {
    const debt = new Debt('Big Timer Bank', 0.1, 0, 10)
    expect(debt).toHaveProperty('startingAmount', 0)
    expect(debt).toHaveProperty('balance', 0)
    const overPayment = debt.makeMonthlyPayment(50)
    expect(debt.balance).toBe(0)
    expect(overPayment).toBe(50)
  })
})