import {
  Box,
  Button,
  Container,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from '@material-ui/core'
import { Rating } from '@material-ui/lab'
import React from 'react'
import { ReviewCard } from '../../lib'

export const Reviews = () => {
  return (
    <Container maxWidth="md" style={{ marginTop: '2rem' }}>
      <Box>
        <Typography variant="h4" align="left">
          Dulce de Leche Cheesecake Brownie Reviews{' '}
        </Typography>
        <Box margin="2rem 0" textAlign="center">
          <Rating value={3} readOnly />
          <Typography variant="h5">5 Reviews</Typography>
        </Box>
        <Box margin="2rem 0">
          <Grid container spacing={1} alignItems="center" justifyContent="space-between">
            <Grid item xs={12} md={6} lg={4}>
              <FormControl variant="filled" fullWidth>
                <InputLabel id="sortBy">Sort By</InputLabel>
                <Select variant="filled" color="primary" label="sortBy" fullWidth>
                  <MenuItem value={10}>Recent </MenuItem>
                  <MenuItem value={20}>Ratings : High to Low</MenuItem>
                  <MenuItem value={20}>Ratings : Low to High</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <Button size="large" fullWidth variant="outlined" color="primary">
                Write Review
              </Button>
            </Grid>
          </Grid>
        </Box>
        <Grid container>
          <Grid item xs={12}>
            {/* <ReviewCard />÷ */}
          </Grid>
          <Grid item xs={12}>
            {/* <ReviewCard />÷ */}
          </Grid>
          <Grid item xs={12}>
            {/* <ReviewCard />÷ */}
          </Grid>
        </Grid>
      </Box>
    </Container>
  )
}
