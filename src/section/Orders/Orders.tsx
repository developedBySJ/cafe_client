import { Container, Grid, Typography, makeStyles } from '@material-ui/core'
import { useQuery } from 'react-query'
import { GET_USER_ORDER } from '../../lib/api/query/orders'
import { Spinner } from '../../lib'

const useStyle = makeStyles((theme) => ({
  orderHead: {
    backgroundColor: theme.palette.primary.main,
  },
}))

export const Orders = () => {
  const { data, isLoading } = useQuery(['getUserOrder'], () => GET_USER_ORDER({}))
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
        {orders.result.map((order, index) => {
          const orderItemString = order.orderItems
            .map((orderItem, index) => `${orderItem.menuItem.title} X ${orderItem.qty}`)
            .join(' | ')

          return (
            <Grid container>
              <Grid item xs={12} style={{}}>
                <Typography variant="body1">Order Id</Typography>
                <Typography>#{order.id}</Typography>
              </Grid>
            </Grid>
          )
        })}
      </Grid>
    </Container>
  )
}
