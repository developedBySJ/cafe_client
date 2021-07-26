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
import { Link } from 'react-router-dom'
import { useQuery } from 'react-query'
import { MENU_ITEMS } from '../../lib/api/query/menuItems'
import { MenuItemsQuery } from '../../lib/api/query/menuItems/menuItems.type'
import { MenuItemCard, MenuItemSkeleton } from '..'

const useStyle = makeStyles((theme) => ({
  wrapper: {
    marginTop: '-1.5rem',
    position: 'relative',
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
  homeBackgroundImg: {
    position: 'relative',
    height: '90vh',
    backgroundImage: `url(${homeImg})`,
    backgroundPosition: 'center',
    backgroundPositionX: '80%',
    [theme.breakpoints.down('xs')]: {
      backgroundImage: `linear-gradient(0deg , rgba(255,255,255,0.6) 0%, rgba(255,255,255,0.6) 100%),url(${homeImg})`,
    },
  },
  input: {
    flexGrow: 1,
    height: '61.6px',
    width: '100%',
  },
  searchButton: {
    paddingLeft: 0,
    paddingRight: 0,
    width: '100%',
  },
  searchBtnText: {
    [theme.breakpoints.down('xs')]: {
      display: 'none',
    },
  },
  searchBtnIcon: {
    display: 'block',
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  searchIcon: {
    margin: '0 1rem',
  },
}))

const offers = [offer1, offer2, offer3, offer4].map((src, i) => {
  return (
    <AspectRatioBox key={i} ratio={5 / 4}>
      <img src={src} alt="" style={{ objectFit: 'cover', objectPosition: 'center' }} />
    </AspectRatioBox>
  )
})

export const Home = () => {
  const theme = useTheme()
  const classes = useStyle()
  const { data, isError, isLoading } = useQuery(
    ['users', {} as MenuItemsQuery],
    () => MENU_ITEMS({}),
    {
      onSuccess: ({ data }) => console.log(data),
    },
  )
  return (
    <div className={classes.wrapper}>
      <Box className={classes.homeBackgroundImg}>
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
              <Grid container alignItems="center" spacing={1} style={{ marginTop: '1rem' }}>
                <Grid item xs={9}>
                  <InputBase
                    placeholder="Search Here..."
                    className={classes.input}
                    startAdornment={
                      <Search className={classes.searchIcon} color={theme.palette.grey[900]} />
                    }
                  />
                </Grid>
                <Grid item xs={3}>
                  <Button
                    className={classes.searchButton}
                    size="large"
                    variant="contained"
                    color="primary"
                    // fullWidth
                  >
                    <span className={classes.searchBtnText}>Search</span>

                    <Search
                      size="24px"
                      color={theme.palette.grey[50]}
                      className={classes.searchBtnIcon}
                    />
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Box padding="2rem 0">
            <ProductCardSlider
              skeltonCard={<></>}
              cards={offers}
              error={false}
              isLoading={false}
              title="Offers"
              id={'offers'}
              sliderPerView={[1, 2, 2.5]}
            />
          </Box>
          <Box padding="2rem 0">
            <ProductCardSlider
              cards={
                data?.data.result.map((menuItem) => <MenuItemCard menuItem={menuItem} />) || []
              }
              error={isError}
              isLoading={isLoading}
              id={'new-dish'}
              skeltonCard={<MenuItemSkeleton />}
              title="Explore New Dishes"
            />
          </Box>
        </Container>
        <Box>
          <Container>
            <Box padding="2rem 0" textAlign="center">
              <Typography variant="h3" align="center">
                Become Member
              </Typography>
              <Typography variant="h6" align="center" color="textSecondary">
                Become Our Member To Get Amazing Offers
              </Typography>
              <Link to="/signup" style={{ textDecoration: 'none' }}>
                <Button
                  color="primary"
                  variant="contained"
                  style={{ marginTop: '3rem' }}
                  size="large"
                >
                  Create An Account
                </Button>
              </Link>
            </Box>
          </Container>
        </Box>
        <Box bgcolor={theme.palette.grey[300]} padding="1rem 0">
          <Container>
            <Grid container alignItems="center" justifyContent="center">
              <Grid item>
                <Button>About</Button>
              </Grid>
              <Grid item>
                <Button>Explore Menu</Button>
              </Grid>
              <Grid item>
                <Button>Login</Button>
              </Grid>
              <Grid item>
                <Button>Help</Button>
              </Grid>
            </Grid>
            <Box padding="1rem 0">
              <Typography variant="subtitle2" align="center" color="textSecondary">
                Made With
              </Typography>
              <Typography align="center" variant="subtitle2" color="textSecondary">
                React | TypeScript | ♥ | NestJs | Postgres
              </Typography>
              <Typography align="center" variant="subtitle2" color="textSecondary">
                By{' '}
                <a href="https://github.com/developedBySJ" target="_blank" rel="noreferrer">
                  Swapnil J
                </a>
              </Typography>
            </Box>
          </Container>
        </Box>
      </Box>
    </div>
  )
}
