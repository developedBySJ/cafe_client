import React from 'react'
import {
  Box,
  Container,
  Typography,
  Grid,
  InputBase,
  useTheme,
  makeStyles,
  Button,
} from '@material-ui/core'
import homeImg from '../../lib/assets/home/home.png'
import offer1 from '../../lib/assets/home/offer1.jpg'
import offer2 from '../../lib/assets/home/offer2.png'
import offer3 from '../../lib/assets/home/offer3.jpg'
import offer4 from '../../lib/assets/home/offer4.jpg'
import { Search } from 'react-feather'
import { AspectRatioBox } from '../../lib/components/AspectRatioBox'
import { ProductCardSlider, Slider } from '../../lib'
import { Skeleton } from '@material-ui/lab'

const useStyle = makeStyles((theme) => ({
  appBar: {
    background: 'rgba(250,250,250,0.8)',
    backdropFilter: 'saturate(180%) blur(8px)',
    margin: 0,
  },
  heading: {
    fontSize: 92,
    [theme.breakpoints.down('md')]: {
      fontSize: 80,
    },
    [theme.breakpoints.down('sm')]: {
      fontSize: 72,
    },
    [theme.breakpoints.down('xs')]: {
      fontSize: 56,
    },
  },
  input: {
    margin: '0 0.5rem',
    flexGrow: 1,
  },
  searchIcon: {
    margin: '0 1rem',
  },
}))

const offers = [offer1, offer2, offer3, offer4].map((src, i) => {
  return (
    <AspectRatioBox key={i} ratio={5 / 4}>
      <img src={src} alt="" style={{ objectFit: 'contain', objectPosition: 'center' }} />
    </AspectRatioBox>
  )
})

export const Home = () => {
  const theme = useTheme()
  const classes = useStyle()
  return (
    <div style={{ marginTop: '-1.5rem', position: 'relative' }}>
      <Box
        position="relative"
        height="90vh"
        style={{
          backgroundImage: `url(${homeImg})`,
          backgroundPosition: 'center',
          backgroundPositionX: '80%',
        }}
      >
        <Container>
          <Grid container alignItems="center" style={{ height: '90vh' }}>
            <Grid item xs={12} sm={11} md={8} lg={7}>
              <Typography variant="h1" className={classes.heading} style={{ color: '#454545' }}>
                Welcome <br /> To Our
                <Typography
                  component="span"
                  variant="h1"
                  className={classes.heading}
                  color="primary"
                >
                  {' '}
                  Cuisine{' '}
                </Typography>
                Restaurant
              </Typography>
              <Box display="flex" marginTop="2rem">
                <InputBase
                  placeholder="Search Here..."
                  className={classes.input}
                  startAdornment={
                    <Search className={classes.searchIcon} color={theme.palette.grey[900]} />
                  }
                />
                <Button size="large" variant="contained" color="primary">
                  Search
                </Button>
              </Box>
            </Grid>
          </Grid>
          <ProductCardSlider
            skeltonCard={<></>}
            cards={offers}
            error={false}
            isLoading={false}
            title="Offers"
            sliderPerView={[1, 2, 2.5]}
          />
        </Container>
      </Box>
    </div>
  )
}
