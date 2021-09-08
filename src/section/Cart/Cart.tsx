import { Box, Button, Container, Grid, Typography } from '@material-ui/core'
import { CartCard } from './components'
import { PrivateRouteComponent, Spinner } from '../../lib'
import { useQuery } from 'react-query'
import { CartQuery, GET_CART } from '../../lib/api/query/cart'
import { useOnErrorNotify } from '../../lib/hooks'
import { useHistory } from 'react-router-dom'

const Cart: PrivateRouteComponent = ({ viewer, setViewer }) => {
  const notifyError = useOnErrorNotify()
  const history = useHistory()
  const {
    data: getCartData,
    isLoading,
    isFetching,
  } = useQuery(['getCart', { limit: 50 } as CartQuery], () => GET_CART({}), {
    onSuccess: ({ data }) => setViewer({ ...viewer, total: data.meta.total }),
    onError: notifyError,
  })

  const data = getCartData?.data
  const discount = data?.meta?.discount || 0
  const taxes = data?.meta?.taxes || 0
  const total = data?.meta?.total || 0

  return (
    <Container
      maxWidth="lg"
      style={{ marginTop: '2rem', ...(isFetching && { pointerEvents: 'none' }) }}
    >
      <Grid container spacing={4}>
        <Grid item xs={12} sm={6} md={7} lg={8}>
          <Typography variant="h5" gutterBottom>
            Cart
          </Typography>
          {isLoading ? (
            <Box height="80vh">
              <Spinner fullWidth />
            </Box>
          ) : data?.result.length ? (
            data?.result.map((cartItem) => {
              return <CartCard data={cartItem} key={cartItem.id} />
            })
          ) : (
            <Box padding="4rem 0">
              <Typography variant="h6" align="center" color="textSecondary">
                Dishes added to your Cart will be saved here.
              </Typography>
            </Box>
          )}
        </Grid>
        <Grid item xs={12} sm={6} md={5} lg={4}>
          <Typography variant="h5" gutterBottom>
            Summery
          </Typography>
          <Box marginTop="2rem" borderRadius={16}>
            <Grid container>
              <Grid item xs={8}>
                <Typography variant="body1" style={{ fontWeight: 500 }} gutterBottom>
                  Sub Total
                </Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography variant="body1" style={{ fontWeight: 500 }} gutterBottom>
                  Rs. {(total - discount - taxes).toFixed(2)}
                </Typography>
              </Grid>
            </Grid>
            <Grid container>
              <Grid item xs={8}>
                <Typography variant="body1" style={{ fontWeight: 500 }} gutterBottom>
                  Discount
                </Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography variant="body1" style={{ fontWeight: 500 }} gutterBottom>
                  Rs. {discount}
                </Typography>
              </Grid>
            </Grid>
            <Grid container>
              <Grid item xs={8}>
                <Typography variant="body1" style={{ fontWeight: 500 }} gutterBottom>
                  Tax and Charges
                </Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography variant="body1" style={{ fontWeight: 500 }} gutterBottom>
                  Rs. {taxes}
                </Typography>
              </Grid>
            </Grid>
            <Grid
              container
              style={{
                margin: '1rem 0',
                padding: '1rem 0',
                border: '1px dashed #ccc',
                borderLeft: 'none',
                borderRight: 'none',
              }}
            >
              <Grid item xs={8}>
                <Typography variant="h6" style={{ fontWeight: 500 }}>
                  Grand Total
                </Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography variant="h6" style={{ fontWeight: 500 }}>
                  Rs. {total}
                </Typography>
              </Grid>
            </Grid>

            <Button
              fullWidth
              variant="contained"
              color="primary"
              size="large"
              onClick={() => history.push('/checkout')}
              disabled={isFetching || !data?.totalCount}
            >
              Checkout
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Container>
  )
}

export default Cart
