import React from 'react'
import { Box, Container, Typography } from '@material-ui/core'
import { Grid } from '@material-ui/core'
import { FavoriteCard } from './components'
import { useQuery } from 'react-query'
import { FavoritesQuery, GET_FAVORITES } from '../../lib/api/query/favorites'
import { useOnErrorNotify } from '../../lib/hooks'
import { PrivateRouteComponent, Spinner } from '../../lib'

export const Favorite: PrivateRouteComponent = () => {
  const notifyError = useOnErrorNotify()
  const { data, isLoading } = useQuery(
    ['getFavorites', { limit: 50 } as FavoritesQuery],
    () => GET_FAVORITES({}),
    {
      onSuccess: ({ data }) => console.log(data),
      onError: notifyError,
    },
  )
  if (isLoading) {
    return (
      <Container style={{ marginTop: '1rem', height: '70vh' }}>
        <Typography variant="h4" gutterBottom>
          Favorite
        </Typography>
        <Spinner fullWidth />
      </Container>
    )
  }
  return (
    <>
      <Container style={{ marginTop: '2rem' }}>
        <Typography variant="h4" gutterBottom>
          Favorite
        </Typography>
        <Grid container spacing={4}>
          {data?.data.result.length ? (
            data?.data.result.map((fav) => (
              <Grid item xs={12} sm={6} key={fav.id}>
                <FavoriteCard data={fav} />
              </Grid>
            ))
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
                Dishes added to your Favorites will be saved here.
              </Typography>
            </Grid>
          )}
        </Grid>
      </Container>
    </>
  )
}
