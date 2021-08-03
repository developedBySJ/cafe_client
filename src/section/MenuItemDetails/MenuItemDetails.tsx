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
import { useParams } from 'react-router-dom'
import { GET_MENU_ITEM } from '../../lib/api/query/menuItemDetail'
import { useEffect, useState } from 'react'

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
  review: {
    marginTop: '2rem',
    marginBottom: '1rem',
  },
  reviewBtn: {
    marginTop: '2rem',
    marginBottom: '1rem',
  },
}))

export const MenuItemDetails = () => {
  const { id } = useParams<{ id: string }>()
  const [isVegStyle, setIsVegStyle] = useState(false)
  const classes = useStyle({ isVeg: isVegStyle })
  console.log({ id })

  const { data, isError, isLoading, refetch } = useQuery(
    ['getMenuItemDetails', id],
    () => GET_MENU_ITEM(id),
    {
      onSuccess: ({ data }) => setIsVegStyle(data.isVeg),
    },
  )

  const {
    data: suggestionData,
    isError: isSuggestionError,
    isLoading: isSuggestionLoading,
  } = useQuery(['getMenuItems', {} as MenuItemsQuery], () => MENU_ITEMS({}), {
    onSuccess: ({ data }) => console.log(data),
  })

  useEffect(() => {
    refetch()
  }, [id])

  if (isLoading) {
    return <h1>Loading</h1>
  }
  if (!data) {
    return <h1>Error</h1>
  }

  const {
    images,
    title,
    subTitle,
    description,
    price,
    prepTime,
    discount,
    reviewCount,
    reviews,
    ratings: fractionRating,
  } = data.data
  const ratings = fractionRating?.toFixed(1)
  console.log({ data })

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
              label={ratings}
              variant="default"
              className={classes.ratingTag}
            />
            <Chip
              icon={<VegNonVegIcon style={{ marginLeft: '12px' }} isVeg={isVegStyle} size={16} />}
              label={isVegStyle ? 'Pure Veg' : 'Non-Veg'}
              variant="default"
              className={classes.typeTag}
            />
            <Chip
              icon={
                <Clock size="16px" style={{ marginLeft: '8px', color: darken('#00aeff', 0.7) }} />
              }
              label={`${prepTime} Min`}
              variant="default"
              style={{ backgroundColor: lighten('#00aeff', 0.7), color: darken('#00aeff', 0.7) }}
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
          <Typography variant="h5" className={classes.review}>
            Reviews
          </Typography>
          {reviewCount > 0 ? (
            <Box marginBottom="2rem">
              <Box display="flex" alignItems="flex-start" justifyContent="space-between">
                <div>
                  <Box display="flex" alignItems="center">
                    <Rating
                      name="customized-empty"
                      defaultValue={0}
                      value={Number(ratings)}
                      precision={0.5}
                      readOnly
                    />
                    <Typography variant="h6"> &nbsp;{reviewCount}</Typography>
                  </Box>
                  <Typography variant="body1">Rated {ratings} out of 5</Typography>
                </div>
                <div>
                  <Typography
                    style={{ fontWeight: 500, fontSize: 20, textDecoration: 'underline' }}
                  >
                    Write a review
                  </Typography>
                </div>
              </Box>
              {reviews.map((data, i) => (
                <ReviewCard key={i} data={data} />
              ))}

              {reviewCount > 3 && (
                <Button fullWidth className={classes.reviewBtn}>
                  See All Reviews
                </Button>
              )}
            </Box>
          ) : (
            <>
              <Box display="flex" alignItems="center" justifyContent="space-between">
                <Rating name="customized-empty" defaultValue={0} precision={0.5} readOnly />
                <Typography variant="h6">0 Reviews</Typography>
              </Box>
              <Button fullWidth className={classes.reviewBtn}>
                Write First Review
              </Button>
            </>
          )}
        </Grid>
      </Grid>
      <Box marginBottom={'2rem'}>
        <ProductCardSlider
          cards={
            suggestionData?.data.result.map((menuItem) => <MenuItemCard menuItem={menuItem} />) ||
            []
          }
          error={isSuggestionError}
          isLoading={isSuggestionLoading}
          skeltonCard={<MenuItemSkeleton />}
          title="People Also Buy"
        />
      </Box>
    </Container>
  )
}
