import React from 'react'
import { Typography, Box, Grid, Paper } from '@material-ui/core'
import { useQuery } from 'react-query'
import {
  GET_ORDER_OVERVIEW,
  GET_PAYMENT_OVERVIEW,
} from '../../../../lib/api/query/getOverview/orderOverview'
import { LineGraph } from './LineGraph'
import { Spinner } from '../../../../lib'
import { Line } from 'recharts'
import moment from 'moment'

export const Dashboard = () => {
  const { data: orderOverview, isLoading } = useQuery('getOrderOverview', GET_ORDER_OVERVIEW)
  const { data: paymentOverview, isLoading: paymentLoading } = useQuery(
    'getPaymentOverview',
    GET_PAYMENT_OVERVIEW,
  )

  if (isLoading || paymentLoading) {
    return (
      <Box sx={{ height: '80vh' }}>
        <Spinner fullWidth />
      </Box>
    )
  }

  const orderPlaceGraph = orderOverview?.data.summery.orderPlacedSummery.map((i) => ({
    name: `${i.time}:00`,
    orders: i.count,
  }))
  const orderPendingGraph = orderOverview?.data.summery.orderPendingSummery.map((i) => ({
    name: `${i.time}:00`,
    orders: i.count,
  }))
  const paymentGraph = paymentOverview?.data.summery.paymentSummery.map((i) => ({
    name: `${i.time} ${moment().format('MMM')}`,
    payment: i.count,
  }))

  return (
    <Box>
      <Box
        sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: '1rem' }}
      >
        <Typography variant="h5">Dashboard</Typography>
      </Box>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} lg={3}>
          <Paper style={{ padding: '1.5rem' }}>
            <Typography variant="body1">Order Placed</Typography>
            <Typography variant="h4">{orderOverview?.data.count.orderPlaced}</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} lg={3}>
          <Paper style={{ padding: '1.5rem' }}>
            <Typography variant="body1">Order Pending</Typography>
            <Typography variant="h4">{orderOverview?.data.count.orderPending}</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} lg={3}>
          <Paper style={{ padding: '1.5rem' }}>
            <Typography variant="body1">Order Delivered</Typography>
            <Typography variant="h4">{orderOverview?.data.count.orderDelivered}</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} lg={3}>
          <Paper style={{ padding: '1.5rem' }}>
            <Typography variant="body1">Sale Last Month</Typography>
            <Typography variant="h4">{paymentOverview?.data.count.totalPayment}</Typography>
          </Paper>
        </Grid>
      </Grid>

      <Grid container spacing={2} style={{ marginTop: '1rem' }}>
        <Grid item xs={12} sm={6}>
          <LineGraph data={orderPlaceGraph} title="Order Placed">
            <Line type="monotone" dataKey="orders" stroke="#82ca9d" />
          </LineGraph>
        </Grid>
        <Grid item xs={12} sm={6}>
          <LineGraph data={orderPendingGraph} title="Order Pending">
            <Line type="monotone" dataKey="orders" stroke="#82ca9d" />
          </LineGraph>
        </Grid>
        <Grid item xs={12} sm={6}>
          <LineGraph data={paymentGraph} title=" Payment">
            <Line type="monotone" dataKey="payment" stroke="#82ca9d" />
          </LineGraph>
        </Grid>
      </Grid>
    </Box>
  )
}
