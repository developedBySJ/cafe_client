import { Button, Container, Step, StepLabel, Stepper } from '@material-ui/core'
import React from 'react'
import { Redirect } from 'react-router-dom'
import { PrivateRouteComponent } from '../../lib'
import { Address } from './components'
import { Payment } from './components/Payment'
import { CardElement, Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY || '')

const steps = ['Summery', 'Address', 'Payment']

export const Checkout: PrivateRouteComponent = ({ viewer }) => {
  const [activeStep, setActiveStep] = React.useState(1)
  if (activeStep === 0) {
    return <Redirect to="/cart" />
  }
  if (!viewer.total) {
    return <Redirect to="/cart" />
  }
  const orderId = 'cf88bfb6-23a5-4c73-a619-fa5d62d1e32f'
  console.log({ activeStep })
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
            onSubmit={() => setActiveStep((prev) => prev + 1)}
          />
        )}
        {activeStep === 2 && <Payment amount={viewer.total} orderId={orderId} />}
        {activeStep === 3 && <Redirect to={`/orders/${orderId}/invoice?thankYou=true`} />}

        {/* <Button onClick={() => setActiveStep((prev) => prev - 1)}>Prev</Button>
      <Button onClick={() => setActiveStep((prev) => prev + 1)}>Next</Button> */}
      </Elements>
    </Container>
  )
}
