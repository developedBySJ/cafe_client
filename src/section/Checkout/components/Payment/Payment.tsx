import { Box, Button, Container, makeStyles, Typography } from '@material-ui/core'
import { CardElement } from '@stripe/react-stripe-js'
import React from 'react'
import { Lock } from 'react-feather'
import { Spinner } from '../../../../lib'
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
  onSuccess?: () => void
}

export const Payment: React.FC<PaymentProps> = ({ amount, orderId, onSuccess }) => {
  const { handleSubmit, data } = usePaymentForm(amount, orderId, { onSuccess })
  const classes = useStyles()

  const showSpinner = data.isLoading

  return (
    <Container maxWidth="sm">
      {showSpinner && (
        <Box height="100%" width="100%" position="absolute" top="0" left="0">
          <Spinner fullWidth label="Processing" />
        </Box>
      )}
      <Box style={{ ...(showSpinner && { opacity: 0.1, pointerEvents: 'none' }) }}>
        <Typography variant="h4" align="center" className={classes.heading}>
          Payment
        </Typography>
        <form onSubmit={handleSubmit}>
          <CardElement
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
          />

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
      </Box>
    </Container>
  )
}
