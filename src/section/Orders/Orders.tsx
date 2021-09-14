import { Container, Grid, Typography, makeStyles, Box, Chip } from '@material-ui/core'
import { useQuery } from 'react-query'
import { GET_USER_ORDER } from '../../lib/api/query/orders'
import { PrivateRouteComponent, Spinner } from '../../lib'
import { Link } from 'react-router-dom'
import moment from 'moment'
import { AspectRatioBox } from '../../lib/components/AspectRatioBox'
import { OrderSortBy, OrderStatus } from '../../lib/api/types/order.type'
import { Sort } from '../../lib/types'

const useStyle = makeStyles((theme) => ({
  orderHead: {
    backgroundColor: theme.palette.grey[900],
    padding: '1rem 2rem',
    borderRadius: '16px 16px 0 0',
    color: theme.palette.common.white,
  },
  orderHeading: {
    letterSpacing: '1px',
    opacity: 0.8,
  },
  orderHeadingText: {
    fontSize: '1.2rem',
    fontWeight: 'bold',
  },
  link: {
    color: theme.palette.primary.contrastText,
    textDecoration: 'underline',
  },
  detailWrapper: {
    padding: '1rem',
    border: `1px solid ${theme.palette.grey[200]}`,
    borderRadius: 16,
  },
  imageWrapper: {
    overflow: 'auto',
  },
  images: {
    width: '6rem',
    height: '6rem',
    borderRadius: 16,
    objectFit: 'cover',
    objectPosition: 'center',
    marginRight: '0.5rem',
    border: `4px solid ${theme.palette.background.default}`,
  },
}))

export const Orders: PrivateRouteComponent = () => {
  const { data, isLoading } = useQuery(['getUserOrder'], () =>
    GET_USER_ORDER({ sort: Sort.DESC, sortBy: OrderSortBy.CreatedAt }),
  )
  const classes = useStyle()
  if (isLoading || !data) {
    return (
      <Container style={{ marginTop: '2rem', height: '70vh' }}>
        <Typography variant="h4" gutterBottom>
          Past Orders
        </Typography>
        <Spinner fullWidth />
      </Container>
    )
  }
  const orders = data?.data

  return (
    <Container style={{ marginTop: '2rem' }}>
      <Typography variant="h4" gutterBottom>
        Past Orders
      </Typography>
      <Grid container spacing={3}>
        {orders.result.length ? (
          orders.result.map((order, index) => {
            return (
              <Grid item xs={12} key={order.id}>
                <Grid container>
                  <Grid item xs={12} className={classes.orderHead}>
                    <Grid container spacing={2}>
                      <Grid item xs={7} md={3}>
                        <Typography variant="body2" className={classes.orderHeading}>
                          Order Placed{' '}
                        </Typography>
                        <Typography variant="body1">
                          {moment(order.createdAt).format('MMMM Do YYYY')}
                        </Typography>
                      </Grid>
                      <Grid item xs={5} md={2}>
                        <Typography variant="body2" className={classes.orderHeading}>
                          Total
                        </Typography>

                        <Typography variant="body1">Rs.{order.total}</Typography>
                      </Grid>
                      <Grid item xs={12} md={7}>
                        <Box>
                          <Typography variant="body2" className={classes.orderHeading}>
                            Order Id
                          </Typography>
                          <Link to={`/orders/${order.id}/invoice`}>
                            <Typography variant="body1" className={classes.link}>
                              #{order.id}
                            </Typography>
                          </Link>
                        </Box>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={12} className={classes.detailWrapper}>
                    <Typography variant="body1" gutterBottom>
                      Payment Status : &nbsp;
                      <Chip label={order.payment ? 'Paid' : 'Not Paid'} component="span" />
                      {!order.payment && order.status < OrderStatus.Delivered && (
                        <Link
                          to={`/payments?order=${order.id}`}
                          style={{
                            textDecoration: 'none',
                            marginLeft: '0.5rem',
                            cursor: 'pointer',
                          }}
                        >
                          <Chip label="Pay Now" color="primary" />
                        </Link>
                      )}
                    </Typography>
                    <Typography variant="body1">
                      Order Status : &nbsp;
                      <Chip label={OrderStatus[order.status]} component="span" />
                    </Typography>
                    <Typography variant="body1">{order.orderItems.length} Items</Typography>
                    {
                      <Typography variant="h6" gutterBottom>
                        {order.deliveredAt
                          ? `Delivered On ${moment(order.deliveredAt).format(
                              'DD MMM YYYY hh:mm:ss',
                            )}`
                          : order.status === OrderStatus.Cancelled
                          ? 'Order Cancelled'
                          : 'Order Will Deliver Soon'}
                      </Typography>
                    }
                    <Box display="flex" marginTop="1rem" className={classes.imageWrapper}>
                      {order.orderItems.map((orderItem, i) => (
                        <Box key={order.id} marginLeft={i !== 0 && '-2rem'}>
                          <img
                            src={orderItem.menuItem.images[0]}
                            alt={orderItem.menuItem.title}
                            className={classes.images}
                          />
                        </Box>
                      ))}
                    </Box>
                  </Grid>
                </Grid>
              </Grid>
            )
          })
        ) : (
          <Grid
            item
            xs={12}
            style={{
              height: '40vh',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Typography variant="h6" align="center" color="textSecondary">
              You don't have any orders yet
            </Typography>
          </Grid>
        )}
      </Grid>
    </Container>
  )
}
