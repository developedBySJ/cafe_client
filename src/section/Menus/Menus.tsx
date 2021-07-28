import { Box, Container, Grid, Typography } from '@material-ui/core'
import React from 'react'
import { Link } from 'react-router-dom'
import { AspectRatioBox } from '../../lib/components/AspectRatioBox'

const mock = [
  {
    id: '06b37909-aeb8-47dc-a6ed-1f8e403bbb12',
    name: 'Updated',
    isActive: false,
    image: null,
    createdAt: '2021-05-22T11:28:07.950Z',
    updatedAt: '2021-05-22T11:32:48.875Z',
  },
  {
    id: 'c684d5bf-948a-4846-bdbc-ad25065dff60',
    name: 'Menu 2',
    isActive: true,
    image: 'image.jpg',
    createdAt: '2021-05-22T11:28:45.644Z',
    updatedAt: '2021-05-22T11:28:45.644Z',
  },
  {
    id: 'df772f7d-eb46-44ff-a93d-a8af2ee9c94c',
    name: 'Menu 3',
    isActive: true,
    image: 'image2.jpg',
    createdAt: '2021-05-22T11:29:06.094Z',
    updatedAt: '2021-05-22T11:29:06.094Z',
  },
]

export const Menus = () => {
  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Explore Our Menu
      </Typography>
      <Grid container spacing={2}>
        {mock.map((menu) => {
          return (
            <Grid item xs={12} sm={2} md={4}>
              <Link to={`/menus/${menu.id}`} style={{ textDecoration: 'none' }}>
                <AspectRatioBox borderRadius={16}>
                  <Box bgcolor="whitesmoke" height="512px">
                    {menu.image && <img src={menu.image} alt={menu.name} />}
                  </Box>
                </AspectRatioBox>
                <Typography
                  variant="h5"
                  color="textPrimary"
                  style={{ marginTop: '1rem', marginLeft: '0.5rem' }}
                >
                  {menu.name} Lorem, ipsum dolor. Lorem, ipsum.
                </Typography>
              </Link>
            </Grid>
          )
        })}
      </Grid>
    </Container>
  )
}
