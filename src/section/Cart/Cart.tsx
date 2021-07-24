import React from 'react'
import { Box, Button, Container, Grid, Typography } from '@material-ui/core'
import { CartCard } from './components'

const Cart = () => {
  return (
    <Container maxWidth="lg" style={{ marginTop: '2rem' }}>
      <Grid container spacing={4}>
        <Grid item xs={12} sm={6} md={7} lg={8}>
          <Typography variant="h5" gutterBottom>
            Cart
          </Typography>
          <CartCard />
          <CartCard />
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
                  Rs. 258
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
                  Rs. 32
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
                  Rs. 65
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
                  Rs. 328
                </Typography>
              </Grid>
            </Grid>

            <Button fullWidth variant="contained" color="primary" size="large">
              Checkout
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Container>
  )
}

export default Cart
