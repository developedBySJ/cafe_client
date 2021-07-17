import React from 'react'
import { Container, Grid } from '@material-ui/core'
import { ProductCardSlider } from '../../lib/components/ProductCardSlider'

const mock = {
  id: '9e4a1aae-20fd-46a7-a80b-eb57649c78b0',
  title: 'Dulce de Leche Cheesecake Brownie',
  subTitle: 'World Cuisine',
  images: ['https://d3gy1em549lxx2.cloudfront.net/12c23c5a-fae4-455e-8f04-79205ef64d00.JPG'],
  isAvailable: true,
  isVeg: false,
  price: 149,
  discount: 0,
  description:
    'A decadent moist chocolate fudge brownie with a layer of cheesecake and LOTS of dulce de leche (thickened milk and sugar) to indulge. Sweet caramelly milky and creamy. Heaven!',
  prepTime: 9,
  ingredients: [],
  createdAt: '2021-07-11T17:27:32.931Z',
  updatedAt: '2021-07-11T17:27:32.931Z',
  menu: {
    id: '8cd72eae-53c6-47b8-b749-9ec0f6e2d7ef',
    name: 'FRESH DESSERTS',
    isActive: true,
    image:
      'https://images.unsplash.com/photo-1582716401301-b2407dc7563d?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1054&q=80',
    createdAt: '2021-07-11T14:42:28.521Z',
    updatedAt: '2021-07-11T14:42:28.521Z',
  },
}

export const MenuItemDetails = () => {
  const { images } = mock
  return (
    <Container>
      {/* <Grid container>
        <Grid item>
          <img src="" alt="" />
        </Grid>
        <Grid item></Grid>
      </Grid> */}
    </Container>
  )
}