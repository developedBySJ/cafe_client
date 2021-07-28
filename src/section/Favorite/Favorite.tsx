import { Container, Typography } from '@material-ui/core'
import React from 'react'
import { Grid } from '@material-ui/core'
import { FavoriteCard } from './components'

export const Favorite = () => {
  return (
    <>
      <Container style={{ marginTop: '1rem' }}>
        <Typography variant="h4" gutterBottom>
          Favorite
        </Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6}>
            <FavoriteCard />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FavoriteCard />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FavoriteCard />
          </Grid>
        </Grid>
      </Container>
    </>
  )
}
