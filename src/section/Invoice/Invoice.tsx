import { IconButton, makeStyles } from '@material-ui/core'
import { Box, Container, Grid, Typography } from '@material-ui/core'
import { Printer } from 'react-feather'
import { useQuery } from 'react-query'
import { useParams, useLocation } from 'react-router-dom'
import { PrivateRouteComponent } from '../../lib'
import { GET_ORDER_DETAIL } from '../../lib/api/query/orderDetail'
import { GenericTable } from '../../lib/components/GenericTable'

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
  const location = useLocation()
  const showThankYou = new URLSearchParams(location.search).get('thankYou') === 'true'
  const classes = useStyle()

  const { data } = useQuery(['getOrderDetails', orderId], () => GET_ORDER_DETAIL(orderId))

  const tableData = data?.data.orderItems.map((item, i) => [
    item.menuItem.title,
    item.qty,
    item.menuItem.price,
    item.qty * item.menuItem.price,
  ])
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
        <Box className={classes.invoiceWrapper}>
          <Grid container justifyContent="space-between" spacing={4} className={classes.margin}>
            <Grid item xs={10} sm={8} md={6}>
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
            <Grid item xs={2}>
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
                Order Placed At : {new Date().toDateString()}
              </Typography>
              <Typography variant="subtitle2" color="textSecondary">
                Order Delivered At : {new Date().toDateString()}
              </Typography>
              <Typography variant="subtitle2" color="textSecondary">
                Order Status : Delivered
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
          <Grid container className={classes.margin}>
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
