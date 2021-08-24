import { Container, Step, StepLabel, Stepper } from '@material-ui/core'
import React from 'react'
import { Redirect } from 'react-router-dom'
import { PrivateRouteComponent } from '../../lib'
import { Address } from './components'
import { Payment } from './components/Payment'
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import { useMutation } from 'react-query'
import { CREATE_ORDER } from '../../lib/api/Mutation/createOrder'
import { useOnErrorNotify, useOnSuccessNotify } from '../../lib/hooks'
import { OrderStatus } from '../../lib/api/types/order.type'

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY || '')

const steps = ['Summery', 'Address', 'Payment']

export const Checkout: PrivateRouteComponent = ({ viewer }) => {
  const notifyError = useOnErrorNotify()
  const notifySuccess = useOnSuccessNotify()
  const [activeStep, setActiveStep] = React.useState(1)
  const createOrder = useMutation(CREATE_ORDER, { onError: notifyError })
  const orderId = createOrder.data?.data.id

  if (activeStep === 0 || !viewer.total) {
    return <Redirect to="/cart" />
  }

  return (
    <Container>
      <Elements stripe={stripePromise}>
        <Stepper activeStep={activeStep} alternativeLabel>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel style={{ fontWeight: 500 }}>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        {activeStep === 1 && (
          <Address
            initialValues={{ address: viewer.address || '', notes: '' }}
            onSubmit={({ address, notes }) => {
              createOrder.mutate({
                address,
                total: viewer.total as number,
                status: OrderStatus.Placed,
              })
              setActiveStep(2)
            }}
          />
        )}
        {activeStep === 2 && orderId && (
          <Payment
            amount={viewer.total}
            orderId={orderId}
            onSuccess={() => {
              setActiveStep(3)
              notifySuccess('Order placed successfully')
            }}
          />
        )}
        {activeStep === 3 && orderId && (
          <Redirect to={`/orders/${orderId}/invoice?thankYou=true`} />
        )}

        {/* <Button onClick={() => setActiveStep((prev) => prev - 1)}>Prev</Button>
      <Button onClick={() => setActiveStep((prev) => prev + 1)}>Next</Button> */}
      </Elements>
    </Container>
  )
}
