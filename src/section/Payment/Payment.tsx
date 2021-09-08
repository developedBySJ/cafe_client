import { Container, Typography } from '@material-ui/core'
import { Elements } from '@stripe/react-stripe-js'
import React from 'react'
import { useQuery } from 'react-query'
import { Redirect, useHistory, useLocation } from 'react-router'
import { stripePromise } from '../../App'
import { GET_ORDER_DETAIL } from '../../lib/api/query/orderDetail'
import { useOnErrorNotify, useOnSuccessNotify } from '../../lib/hooks'
import { Payment } from '../Checkout/components/Payment'

export const PaymentPage = () => {
  const location = useLocation()

  const q = new URLSearchParams(location.search)
  const orderId = q.get('order')

  const history = useHistory()
  const notifyError = useOnErrorNotify()
  const notifySuccess = useOnSuccessNotify()

  const { data, isLoading } = useQuery(
    ['getOrderDetails', orderId],
    () => GET_ORDER_DETAIL(orderId || ''),
    {
      enabled: !!orderId,
      onSuccess: () => notifySuccess('Order Found!'),
      onError: () => {
        notifyError('Order Not Found!')
        history.push('/orders')
      },
    },
  )

  if (!orderId) {
    notifyError('Invalid Order ID!')
    return <Redirect to="/orders" />
  }

  const orderDetails = data?.data

  if (isLoading) {
    return <Container>Loading...</Container>
  }

  if (orderDetails && orderDetails.payment) {
    notifyError('Order Already Paid!')
    return <Redirect to="/orders" />
  }

  if (!orderDetails || !orderDetails.total) {
    notifyError('Something Went Wrong')
    return <Redirect to="/orders" />
  }

  return (
    <Container>
      <Elements stripe={stripePromise}>
        <Typography variant="h4">Payment</Typography>
        <Typography variant="h6" color="textSecondary">
          Order #{orderId}
        </Typography>
        <Payment
          amount={orderDetails.total}
          orderId={orderId}
          onSuccess={() => {
            notifySuccess('Payment Successful!')
            history.push('/orders')
          }}
        />
      </Elements>
    </Container>
  )
}
