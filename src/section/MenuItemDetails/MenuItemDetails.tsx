import { Box, Button, Chip, Container, darken, Grid, lighten, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { Alert, Rating } from '@material-ui/lab'
import { Clock, Heart, Star } from 'react-feather'
import { ProductCardSlider, Spinner } from '../../lib'
import { GET_MENU_ITEMS } from '../../lib/api/query/menuItems'
import { NON_VEG_COLOR, VegNonVegIcon, VEG_COLOR } from '../../lib/assets/VegNonVegIcon'
import { ReviewCard } from '../../lib/components/ReviewCard'
import { WARNING_MAIN } from '../../Theme/token'
import { MenuItemCard, MenuItemSkeleton } from '../MenuItemsList'
import { MenuItemImg } from './components'
import { useMutation, useQuery } from 'react-query'
import { Link, useHistory, useParams } from 'react-router-dom'
import { GET_MENU_ITEM } from '../../lib/api/query/menuItemDetail'
import { useEffect, useState } from 'react'
import { MenuItemDetailsSkeleton } from './MenuItemDetailsSkeleton'
import { useOnErrorNotify } from '../../lib/hooks'
import { ADD_CART_ITEM } from '../../lib/api/Mutation/addToCart'
import { SuccessDialog, SuccessDialogType } from './components/SuccessDialog'
import { ADD_FAV_ITEM } from '../../lib/api/Mutation/addToFavorite'
import { IMenuItem } from '../../lib/api/types/menuItem.type'

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
    marginBottom: '1rem',
  },
  link: { fontWeight: 500, fontSize: 20, textDecoration: 'underline', color: 'inherit' },
}))

export const MenuItemDetails = () => {
  const { id } = useParams<{ id: string }>()
  const [isVegStyle, setIsVegStyle] = useState(false)
  const [isSuccessDialogOpen, setIsSuccessDialogOpen] = useState<[boolean, SuccessDialogType]>([
    false,
    undefined,
  ])
  const classes = useStyle({ isVeg: isVegStyle })
  const history = useHistory()
  const notifyError = useOnErrorNotify()

  const { data, isError, isLoading, refetch } = useQuery(
    ['getMenuItemDetails', id],
    () => GET_MENU_ITEM(id),
    {
      onSuccess: ({ data }) => setIsVegStyle(data.isVeg),
      onError: notifyError,
    },
  )

  const {
    mutate: addToCart,
    data: addToCartData,
    isLoading: isAddToCartLoading,
  } = useMutation(ADD_CART_ITEM, {
    onError: notifyError,
    onSuccess: () => setIsSuccessDialogOpen([true, 'cart']),
  })

  const {
    mutate: addToFav,
    data: addToFavData,
    isLoading: isAddToFavLoading,
  } = useMutation(ADD_FAV_ITEM, {
    onError: notifyError,
    onSuccess: () => setIsSuccessDialogOpen([true, 'fav']),
  })

  const {
    data: suggestionData,
    isError: isSuggestionError,
    isLoading: isSuggestionLoading,
  } = useQuery(
    ['getMenuItemsSuggestions', data?.data as IMenuItem],
    (x) => {
      let suggestions = ''
      const menuItem = x.queryKey[1] as IMenuItem

      const limit = (Math.round(Math.random() * 100) % 8) + 3

      if (menuItem.ingredients.length > 0) {
        suggestions = `ingredients=${menuItem.ingredients.join(',')}`
      } else {
        suggestions = `menu=${menuItem.menu.id}`
      }

      return GET_MENU_ITEMS(`?limit=${limit}&${suggestions}`)
    },
    {
      onError: notifyError,
      enabled: !!data?.data.id,
    },
  )

  useEffect(() => {
    refetch()
  }, [id])

  useEffect(() => {
    let timeOutId: NodeJS.Timeout
    if (isSuccessDialogOpen[0]) {
      timeOutId = setTimeout(() => {
        setIsSuccessDialogOpen([false, undefined])
      }, 3000)
    }
    return () => {
      clearTimeout(timeOutId)
    }
  }, [...isSuccessDialogOpen])

  if (isLoading) {
    return <MenuItemDetailsSkeleton />
  }
  if (isError || !data) {
    return (
      <>
        <Container>
          <Alert variant="filled" color="error" severity="error">
            Something Went Wrong
          </Alert>
        </Container>
        <MenuItemDetailsSkeleton />
      </>
    )
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

  const handleAddToCart = () => {
    addToCart({ menuItem: id, qty: 1 })
  }
  const handleAddToFav = () => {
    addToFav({ menuItem: id })
  }

  return (
    <Container className={classes.container}>
      {addToCartData && (
        <SuccessDialog
          isOpen={isSuccessDialogOpen[0]}
          setIsOpen={setIsSuccessDialogOpen}
          data={addToCartData?.data}
          type={isSuccessDialogOpen[1]}
        />
      )}
      {addToFavData && (
        <SuccessDialog
          isOpen={isSuccessDialogOpen[0]}
          setIsOpen={setIsSuccessDialogOpen}
          data={addToFavData?.data}
          type={isSuccessDialogOpen[1]}
        />
      )}
      <Grid container spacing={4}>
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
            disabled={isAddToCartLoading || !data.data.isAvailable}
            onClick={handleAddToCart}
          >
            {isAddToCartLoading ? <Spinner size="20px" /> : 'Add To Cart'}
          </Button>

          <Button
            fullWidth
            variant="contained"
            size="large"
            endIcon={!isAddToFavLoading && <Heart strokeWidth={1.5} size="20px  " />}
            disabled={isAddToFavLoading}
            onClick={handleAddToFav}
          >
            {isAddToFavLoading ? <Spinner size="20px" /> : 'Favorite'}
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
                  <Link to={`${id}/reviews/new`} className={classes.link}>
                    Write a review
                  </Link>
                </div>
              </Box>
              <Box>
                {reviews.map((data, i) => (
                  <ReviewCard key={i} data={data} />
                ))}
              </Box>
              {reviewCount > 3 && (
                <Button fullWidth className={classes.reviewBtn}>
                  See All Reviews
                </Button>
              )}
            </Box>
          ) : (
            <>
              <Box display="flex" alignItems="center" justifyContent="space-between">
                <Rating defaultValue={0} precision={0.5} readOnly value={0} />
                <Typography variant="h6">0 Reviews</Typography>
              </Box>
              <Box padding="3rem 0">
                <Typography variant="h6" align="center" color="textSecondary">
                  Not Reviewed Yet
                </Typography>
              </Box>
              <Button
                fullWidth
                className={classes.reviewBtn}
                variant="contained"
                onClick={() => history.push(`${id}/reviews/new`)}
              >
                Write First Review
              </Button>
            </>
          )}
        </Grid>
      </Grid>
      <Box marginBottom={'2rem'}>
        <ProductCardSlider
          cards={
            suggestionData?.data?.result.map((menuItem) => <MenuItemCard menuItem={menuItem} />) ||
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
