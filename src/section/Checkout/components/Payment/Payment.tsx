import { Grid, Button, Container, makeStyles, Typography, useTheme } from '@material-ui/core'
import { CardElement, Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import React from 'react'
import { Lock } from 'react-feather'
import { useHistory } from 'react-router-dom'
import { usePaymentForm } from '../../../../lib/hooks/usePaymentForm'

const useStyles = makeStyles((theme) => ({
  stripeCard: {
    padding: '1.25rem',
    marginBottom: '1.5rem',
    fontSize: '2rem',
    border: `1px solid ${theme.palette.grey[400]}`,
    borderRadius: 16,
    backgroundColor: theme.palette.grey[300],
  },
  heading: {
    margin: '2.5rem 0 3rem 0',
  },
  marginTop: {
    marginTop: '1.5rem',
  },
  cta: {
    [theme.breakpoints.down('sm')]: {
      order: 1,
    },
  },
}))

interface PaymentProps {
  amount: number
  orderId: string
}

export const Payment: React.FC<PaymentProps> = ({ amount, orderId }) => {
  const { handleSubmit, data } = usePaymentForm(amount, orderId)
  const classes = useStyles()
  const theme = useTheme()
  const history = useHistory()

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" align="center" className={classes.heading}>
        Payment
      </Typography>
      <form onSubmit={handleSubmit}>
        {/* <CardElement
          className={classes.stripeCard}
          options={{
            hidePostalCode: true,
            style: {
              base: {
                fontSize: '1.4rem',
                fontFamily: "'Chillax', sans-serif",
              },
            },
          }}
        /> */}
        <CardNumberElement />
        <CardExpiryElement />
        <Button
          variant="contained"
          color="primary"
          startIcon={<Lock size="18px" />}
          size="large"
          fullWidth
          type="submit"
        >
          Pay Rs.{amount}
        </Button>
      </form>
    </Container>
  )
}
