import {
  Button,
  Chip,
  FormControl,
  IconButton,
  InputLabel,
  makeStyles,
  MenuItem,
  Select,
} from '@material-ui/core'
import { Box, Container, Grid, Typography } from '@material-ui/core'
import { useState } from 'react'
import { Printer } from 'react-feather'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { useParams } from 'react-router-dom'
import { PrivateRouteComponent } from '../../lib'
import { UPDATE_ORDER } from '../../lib/api/Mutation/updateOrder'
import { GET_ORDER_DETAIL } from '../../lib/api/query/orderDetail'
import { OrderStatus } from '../../lib/api/types/order.type'
import { GenericTable } from '../../lib/components/GenericTable'
import { useOnErrorNotify, useOnSuccessNotify } from '../../lib/hooks'
import { UserRole } from '../../lib/types'

const useStyle = makeStyles((theme) => ({
  heading: {
    padding: '4rem 0',
    textAlign: 'center',
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  invoiceWrapper: {
    padding: '1rem',
    margin: '2rem 0',
    border: `2px solid ${theme.palette.grey[300]}`,
    borderRadius: '1rem',
  },
  margin: {
    margin: '2rem 0',
  },
}))

export const Invoice: PrivateRouteComponent = ({ viewer }) => {
  const { id: orderId } = useParams<{ id: string }>()
  const classes = useStyle()
  const notifySuccess = useOnSuccessNotify()
  const notifyError = useOnErrorNotify()
  const queryClient = useQueryClient()
  const { data, refetch } = useQuery(['getOrderDetails', orderId], () => GET_ORDER_DETAIL(orderId))
  const { mutate, isLoading } = useMutation(UPDATE_ORDER, {
    onSuccess: () => {
      notifySuccess('Order status updated successfully')
      queryClient.invalidateQueries('getUserOrder')
    },
    onError: notifyError,
  })

  const tableData = data?.data.orderItems.map((item, i) => [
    item.menuItem.title,
    item.qty,
    item.menuItem.price,
    item.qty * item.menuItem.price,
  ])

  const orderDetails = data?.data

  const [status, setStatus] = useState(orderDetails?.status || 0)

  return (
    <>
      <Box className={classes.heading}>
        <Typography variant="h5" gutterBottom>
          Invoice
        </Typography>
        <Typography variant="body1" style={{ fontWeight: 450 }}>
          # {orderId}
        </Typography>
      </Box>
      <Container maxWidth="md">
        {/* ACTIONS */}
        <Box sx={{ display: 'flex', alignItems: 'center', mt: '2rem' }}>
          {(orderDetails?.status || 0) < OrderStatus.Delivered ? (
            <>
              {([UserRole.Admin, UserRole.Manager] as any[]).includes(viewer?.role) && (
                <>
                  <Box sx={{ minWidth: 200, mr: '0.5rem', width: '100%' }}>
                    <FormControl
                      fullWidth
                      variant="filled"
                      disabled={(orderDetails?.status || 0) > OrderStatus.Delivered}
                    >
                      <InputLabel>Order Status</InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        placeholder="Order Status"
                        fullWidth
                        variant="filled"
                        value={status}
                        onChange={(e) => setStatus(Number(e.target?.value) || 0)}
                      >
                        <MenuItem value={OrderStatus.Placed}>Placed</MenuItem>
                        <MenuItem value={OrderStatus.Confirmed}>Confirmed</MenuItem>
                        <MenuItem value={OrderStatus.Processed}>Processed</MenuItem>
                        <MenuItem value={OrderStatus.Completed}>Completed</MenuItem>
                        <MenuItem value={OrderStatus.Delivered}>Delivered</MenuItem>
                        <MenuItem value={OrderStatus.Cancelled}>Cancelled</MenuItem>
                      </Select>
                    </FormControl>
                  </Box>
                  <Button
                    size="large"
                    variant="contained"
                    color="primary"
                    disabled={isLoading || (orderDetails?.status || 0) > OrderStatus.Delivered}
                    onClick={() =>
                      mutate({
                        id: orderDetails?.id || '',
                        status: status,
                      })
                    }
                  >
                    {isLoading ? 'Updating...' : 'Update'}
                  </Button>
                </>
              )}
            </>
          ) : (
            <Chip label={OrderStatus[orderDetails?.status || 0]} color="primary" />
          )}
        </Box>
        <Box className={classes.invoiceWrapper}>
          <Grid container justifyContent="space-between" spacing={4} className={classes.margin}>
            <Grid item xs={12} sm={8} md={6}>
              {
                <Typography variant="h5">
                  Thanks for choosing{' '}
                  <Typography color="textSecondary" variant="h5" component="span">
                    Cusine Eat
                  </Typography>
                  , {viewer.firstName} ! Here are your order details:{' '}
                </Typography>
              }
            </Grid>
            <Grid item xs={12} sm={2}>
              <IconButton>
                <Printer />
              </IconButton>
            </Grid>
          </Grid>
          <Grid container justifyContent="space-between" spacing={4} className={classes.margin}>
            <Grid item xs={12} md={6}>
              <Typography style={{ fontWeight: 500 }}>Order Id :</Typography>
              <Typography style={{ fontWeight: 500 }} gutterBottom>
                {' '}
                #{orderId}
              </Typography>
              <Typography variant="subtitle2" color="textSecondary">
                Order Placed At :{' '}
                {orderDetails?.createdAt ? new Date(orderDetails?.createdAt).toDateString() : '---'}
              </Typography>
              <Typography variant="subtitle2" color="textSecondary">
                Order Delivered At :{' '}
                {orderDetails?.deliveredAt
                  ? new Date(orderDetails?.deliveredAt).toDateString()
                  : '---'}
              </Typography>
              <Typography variant="subtitle2" color="textSecondary">
                Order Status :{' '}
                {orderDetails?.status !== undefined ? OrderStatus[orderDetails?.status] : '---'}
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography style={{ fontWeight: 500 }}>Delivered To :</Typography>
              <Typography style={{ fontWeight: 500 }} color="primary">{`${viewer.firstName} ${
                viewer.lastName || ''
              }`}</Typography>
              <Typography variant="subtitle2" color="textSecondary">
                {viewer.address}
              </Typography>
            </Grid>
          </Grid>
          <Grid container className={classes.margin} style={{ padding: '1rem' }}>
            <Grid xs={12}>
              <GenericTable labels={['Name', 'Qty', 'Price', 'Total']} values={tableData || []} />
            </Grid>
            <Grid xs={6}></Grid>
            <Grid xs={6} alignItems="flex-end" className={classes.margin}>
              <Typography variant="h6" align="right">
                Total &nbsp; : Rs. {data?.data.total}
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </>
  )
}
