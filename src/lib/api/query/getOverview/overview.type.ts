type Summery = {
  count: number
  time: string
}
export interface OrderOverview {
  count: {
    orderPlaced: number
    orderPending: number
    orderDelivered: number
  }
  summery: {
    orderPlacedSummery: Summery[]
    orderPendingSummery: Summery[]
  }
}
export interface PaymentOverview {
  count: {
    totalPayment: number
  }
  summery: {
    paymentSummery: Summery[]
  }
}
