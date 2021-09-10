import React from 'react'
import { Box, Typography } from '@material-ui/core'
import { useQuery } from 'react-query'
import { useParams } from 'react-router'
import { Spinner } from '../../../../lib'
import { GET_PAYMENT_DETAILS } from '../../../../lib/api/query/paymentDetails'
import { ResourceFactory } from '../../../../lib/components/EditResource'

export const PaymentEdit = () => {
  const { id } = useParams<{ id: string }>()
  const { data, isLoading } = useQuery(['getPaymentDetails'], () => GET_PAYMENT_DETAILS(id))

  if (isLoading) {
    return (
      <Box height="80vh">
        <Spinner fullWidth />
      </Box>
    )
  }

  return (
    <div>
      <ResourceFactory
        id={`Payment Id : ${data?.data.id}`}
        title="Edit Payments"
        config={[{ id: 'orderId', label: 'Order Id', type: 'text' }]}
        initialValues={data?.data || {}}
      >
        <Box sx={{ width: '100%', my: '1rem' }}>
          <Typography variant="h6">
            Stripe Reference Id : {data?.data.referenceId || '---'}
          </Typography>
          <Typography variant="h6">
            Amount :
            <Typography variant="h6" component="span" style={{ fontWeight: 500 }}>
              {' '}
              Rs. {(data?.data.amount || 0) * 0.01 || '---'}
            </Typography>
          </Typography>
          <Typography variant="h6">Description : {data?.data.description || '---'}</Typography>
        </Box>
      </ResourceFactory>
    </div>
  )
}
