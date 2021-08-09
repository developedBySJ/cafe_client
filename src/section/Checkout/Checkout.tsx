import { Button, Container, Step, StepLabel, Stepper } from '@material-ui/core'
import React from 'react'
import { Redirect } from 'react-router-dom'
import { PrivateRouteComponent } from '../../lib'
import { Address } from './components'

const steps = ['Summery', 'Address', 'Payment']

export const Checkout: PrivateRouteComponent = ({ viewer }) => {
  const [activeStep, setActiveStep] = React.useState(1)
  if (activeStep === 0) {
    return <Redirect to="/cart" />
  }

  const orderId = 'cf88bfb6-23a5-4c73-a619-fa5d62d1e32f'

  return (
    <Container>
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
      {activeStep === 2 && (
        <Button onClick={() => setActiveStep((prev) => prev + 1)}>PAY NOW</Button>
      )}
      {activeStep === 3 && <Redirect to={`/orders/${orderId}/invoice?thankYou=true`} />}

      {/* <Button onClick={() => setActiveStep((prev) => prev - 1)}>Prev</Button>
      <Button onClick={() => setActiveStep((prev) => prev + 1)}>Next</Button> */}
    </Container>
  )
}
