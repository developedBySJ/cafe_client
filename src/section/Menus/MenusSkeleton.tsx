import React from 'react'
import { Box, Container, Grid, makeStyles, Typography } from '@material-ui/core'
import { useQuery } from 'react-query'
import { Link } from 'react-router-dom'
import { GET_MENUS } from '../../lib/api/query/menus'
import { AspectRatioBox } from '../../lib/components/AspectRatioBox'
import { Skeleton } from '@material-ui/lab'

const useStyles = makeStyles((theme) => ({
  cardWrap: {
    position: 'absolute',
    zIndex: 1,
    bottom: '0',
    left: '0',
    padding: '1rem 0.5rem',
    bgcolor: '#f7f7f7',
    width: '100%',
    background: 'rgba(255,255,255,0.8)',
    backdropFilter: 'saturate(180%) blur(12px)',
  },
  link: {
    textDecoration: 'none',
    display: 'block',
  },
  heading: {
    margin: '2rem 0 3rem 0',
  },
}))

export const MenusSkeleton = () => {
  const classes = useStyles()

  return (
    <Container>
      <Typography variant="h4" className={classes.heading}>
        <Skeleton width="300px" height="47px" variant="text" />
      </Typography>
      <Grid container spacing={2}>
        {Array.from({ length: 5 }).map((_, i) => (
          <Grid item xs={12} sm={2} md={4} key={i}>
            <AspectRatioBox>
              <Skeleton variant="rect" width="100%" />
            </AspectRatioBox>
          </Grid>
        ))}
      </Grid>
    </Container>
  )
}
