import { Box, Container, Grid, makeStyles, Typography } from '@material-ui/core'
import React from 'react'
import { Link } from 'react-router-dom'
import { AspectRatioBox } from '../../lib/components/AspectRatioBox'

const mock = [
  {
    id: 'aa820cdd-668e-4508-a304-e9909371cbc5',
    name: 'SANDWICHES & MORE',
    isActive: true,
    image:
      'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1053&q=80',
    createdAt: '2021-07-24T06:00:50.655Z',
    updatedAt: '2021-07-24T06:00:50.655Z',
  },
  {
    id: '111cb109-b073-4f3c-8c00-4df371437680',
    name: 'FRESH DESSERTS',
    isActive: true,
    image:
      'https://images.unsplash.com/photo-1582716401301-b2407dc7563d?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1054&q=80',
    createdAt: '2021-07-24T06:00:50.665Z',
    updatedAt: '2021-07-24T06:00:50.665Z',
  },
  {
    id: 'c7628a14-f276-4890-9342-99d7f1979f4f',
    name: 'FRESH BEVERAGES',
    isActive: true,
    image:
      'https://images.unsplash.com/photo-1560508180-03f285f67ded?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80',
    createdAt: '2021-07-24T06:00:50.678Z',
    updatedAt: '2021-07-24T06:00:50.678Z',
  },
  {
    id: 'b9753ada-c10d-47e3-8bde-50c31019ca3b',
    name: 'CONTINENTAL',
    isActive: true,
    image:
      'https://images.unsplash.com/photo-1535567465397-7523840f2ae9?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1014&q=80',
    createdAt: '2021-07-24T06:00:50.679Z',
    updatedAt: '2021-07-24T06:00:50.679Z',
  },
  {
    id: '235cc1af-1346-41c4-b5a7-09334a16159a',
    name: 'WOK-STATION',
    isActive: true,
    image:
      'https://images.unsplash.com/photo-1593181520415-5d48196b5ecb?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80',
    createdAt: '2021-07-24T06:00:50.709Z',
    updatedAt: '2021-07-24T06:00:50.709Z',
  },
  {
    id: '764d5532-d7e4-4760-95c5-0abf52ef885f',
    name: 'LARGE PLATES',
    isActive: true,
    image:
      'https://images.unsplash.com/photo-1565557623262-b51c2513a641?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1224&q=80',
    createdAt: '2021-07-24T06:00:50.721Z',
    updatedAt: '2021-07-24T06:00:50.721Z',
  },
  {
    id: 'a40bba79-e3b5-4b79-8dd3-a1d8f349596e',
    name: 'BURGERS & WRAPS',
    isActive: true,
    image:
      'https://images.unsplash.com/photo-1586816001966-79b736744398?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80',
    createdAt: '2021-07-24T06:00:50.734Z',
    updatedAt: '2021-07-24T06:00:50.734Z',
  },
  {
    id: '28c1375d-05ae-4ff9-bd97-a13a70914f63',
    name: 'INDIAN / THALIS',
    isActive: true,
    image:
      'https://images.unsplash.com/photo-1546833999-b9f581a1996d?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80',
    createdAt: '2021-07-24T06:00:50.735Z',
    updatedAt: '2021-07-24T06:00:50.735Z',
  },
  {
    id: '827dbe50-086b-449e-8d97-192d552e98fd',
    name: 'FAMILY COMBOS',
    isActive: true,
    image:
      'https://images.unsplash.com/photo-1585937421612-70a008356fbe?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=676&q=80',
    createdAt: '2021-07-24T06:00:50.765Z',
    updatedAt: '2021-07-24T06:00:50.765Z',
  },
  {
    id: '78e57270-e54d-4977-ae66-961f711e4ea6',
    name: 'APPETIZERS',
    isActive: true,
    image:
      'https://images.unsplash.com/photo-1607098665874-fd193397547b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80',
    createdAt: '2021-07-24T06:00:50.776Z',
    updatedAt: '2021-07-24T06:00:50.776Z',
  },
]

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

export const Menus = () => {
  const classes = useStyles()
  return (
    <Container>
      <Typography variant="h4" className={classes.heading}>
        Explore Our Menu
      </Typography>
      <Grid container spacing={2}>
        {mock.map((menu) => {
          return (
            <Grid item xs={12} sm={2} md={4}>
              <Link to={`/menus/${menu.id}`} className={classes.link}>
                <AspectRatioBox borderRadius={16}>
                  <Box height="512px" position="relative">
                    <Box className={classes.cardWrap}>
                      <Typography variant="h5" color="textPrimary" style={{ marginLeft: '0.5rem' }}>
                        {menu.name}
                      </Typography>
                    </Box>
                    {menu.image && (
                      <img
                        src={menu.image}
                        alt={menu.name}
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                          objectPosition: 'center',
                        }}
                      />
                    )}
                  </Box>
                </AspectRatioBox>
              </Link>
            </Grid>
          )
        })}
      </Grid>
    </Container>
  )
}
