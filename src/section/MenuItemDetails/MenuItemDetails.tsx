import { Box, Button, Chip, Container, darken, Grid, lighten, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { Rating } from '@material-ui/lab'
import { Clock, Heart, Star } from 'react-feather'
import { ProductCardSlider } from '../../lib'
import { MENU_ITEMS } from '../../lib/api/query/menuItems'
import { MenuItemsQuery } from '../../lib/api/query/menuItems/menuItems.type'
import { NON_VEG_COLOR, VegNonVegIcon, VEG_COLOR } from '../../lib/assets/VegNonVegIcon'
import { ReviewCard } from '../../lib/components/ReviewCard'
import { WARNING_MAIN } from '../../Theme/token'
import { MenuItemCard, MenuItemSkeleton } from '../MenuItemsList'
import { MenuItemImg } from './MenuItemImg'
import { useQuery } from 'react-query'

const mock = {
  id: '9e4a1aae-20fd-46a7-a80b-eb57649c78b0',
  title: 'Dulce de Leche Cheesecake Brownie',
  subTitle: 'World Cuisine',
  images: [
    'https://d3gy1em549lxx2.cloudfront.net/12c23c5a-fae4-455e-8f04-79205ef64d00.JPG',
    'https://d3gy1em549lxx2.cloudfront.net/12c23c5a-fae4-455e-8f04-79205ef64d00.JPG',
    'https://d3gy1em549lxx2.cloudfront.net/12c23c5a-fae4-455e-8f04-79205ef64d00.JPG',
  ],
  isAvailable: true,
  isVeg: false,
  price: 149,
  discount: 10,
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

const useStyle = makeStyles((theme) => ({
  container: {
    paddingTop: '2rem',
  },
  headingWrapper: {
    marginBottom: '1rem',
  },
  tagsWrapper: {
    marginBottom: '1rem',
    '& > *': { marginRight: '0.5rem' },
  },
  ratingTag: {
    backgroundColor: lighten('#FFD789', 0.5),
    color: darken('#946200', 0.5),
  },
  typeTag: {
    backgroundColor: ({ isVeg }: any) => lighten(isVeg ? VEG_COLOR : NON_VEG_COLOR, 0.8),
    color: ({ isVeg }: any) => darken(isVeg ? VEG_COLOR : NON_VEG_COLOR, 0.5),
  },
  description: {
    lineHeight: '150%',
    fontWeight: 450,
    opacity: 0.8,
    textAlign: 'justify',
    margin: '1rem 0',
  },
  priceWrapper: { marginBottom: '2rem' },
  price: {
    marginBottom: 0,
  },
  button: {
    marginBottom: '1rem',
  },
}))

export const MenuItemDetails = () => {
  const { images, title, subTitle, description, price, isVeg, prepTime, discount } = mock
  const classes = useStyle({ isVeg })
  const { data, isError, isLoading } = useQuery(
    ['users', {} as MenuItemsQuery],
    () => MENU_ITEMS({}),
    {
      onSuccess: ({ data }) => console.log(data),
    },
  )
  return (
    <Container className={classes.container}>
      <Grid container spacing={6}>
        <Grid item xs={12} md={8}>
          <MenuItemImg images={images} />
        </Grid>
        <Grid item xs={12} md={4}>
          <Box className={classes.headingWrapper}>
            <Typography variant="body1">{subTitle}</Typography>
            <Typography variant="h5">{title}</Typography>
          </Box>
          <Box className={classes.tagsWrapper}>
            <Chip
              icon={
                <Star size="18px" style={{ marginLeft: '8px' }} fill={WARNING_MAIN} stroke={'0'} />
              }
              label={`3.5`}
              variant="default"
              className={classes.ratingTag}
            />
            <Chip
              icon={<VegNonVegIcon style={{ marginLeft: '12px' }} isVeg={isVeg} size={16} />}
              label={isVeg ? 'Pure Veg' : 'Non-Veg'}
              variant="default"
              className={classes.typeTag}
            />
            <Chip
              icon={<Clock size="16px" style={{ marginLeft: '8px' }} />}
              label={`${prepTime} Min`}
              variant="default"
            />
          </Box>
          <Typography variant="body2" className={classes.description}>
            {description}
          </Typography>
          <Box className={classes.priceWrapper}>
            <Typography variant="h4" className={classes.price}>
              Rs. {price}
            </Typography>
            <Typography
              variant="body1"
              color="error"
              style={{ lineHeight: '150%', textDecoration: 'line-through', fontStyle: 'italic' }}
            >
              Flat {discount}% off
            </Typography>
          </Box>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            size="large"
            className={classes.button}
          >
            Add To Cart
          </Button>

          <Button
            fullWidth
            variant="contained"
            size="large"
            endIcon={<Heart strokeWidth={1.5} size="20px  " />}
          >
            Favorite
          </Button>
          {/* REVIEW */}
          <Typography variant="h5">Reviews</Typography>
          <Box display="flex" alignItems="flex-start" justifyContent="space-between">
            <div>
              <Box display="flex" alignItems="center">
                <Rating name="customized-empty" defaultValue={3.5} precision={0.5} readOnly />
                <Typography variant="h6">33</Typography>
              </Box>
              <Typography variant="body1">Rated 3.5 out of 5</Typography>
            </div>
            <div>
              <Typography style={{ fontWeight: 500, fontSize: 20, textDecoration: 'underline' }}>
                Write a review
              </Typography>
            </div>
          </Box>
          <ReviewCard />
          <ReviewCard />

          <Button fullWidth>See All Reviews</Button>
        </Grid>
      </Grid>
      <Box marginBottom={'2rem'}>
        <ProductCardSlider
          cards={data?.data.result.map((menuItem) => <MenuItemCard menuItem={menuItem} />) || []}
          error={isError}
          isLoading={isLoading}
          skeltonCard={<MenuItemSkeleton />}
          title="People Also Buy"
        />
      </Box>
    </Container>
  )
}
