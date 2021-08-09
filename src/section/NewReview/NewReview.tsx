import {
  Box,
  Button,
  Chip,
  Container,
  darken,
  Grid,
  InputBase,
  InputLabel,
  lighten,
  makeStyles,
  Typography,
} from '@material-ui/core'
import { Alert, Rating } from '@material-ui/lab'
import { useFormik } from 'formik'
import { useState } from 'react'
import { Star, Clock } from 'react-feather'
import { useMutation, useQuery } from 'react-query'
import { useHistory, useParams } from 'react-router-dom'
import { PrivateRouteComponent, Spinner } from '../../lib'
import { CREATE_REVIEW } from '../../lib/api/Mutation/createReview'
import { GET_MENU_ITEM } from '../../lib/api/query/menuItemDetail'
import { GET_REVIEWS } from '../../lib/api/query/reviews'
import { VEG_COLOR, NON_VEG_COLOR, VegNonVegIcon } from '../../lib/assets/VegNonVegIcon'
import { AspectRatioBox } from '../../lib/components/AspectRatioBox'
import { useOnErrorNotify, useOnSuccessNotify } from '../../lib/hooks'
import { WARNING_MAIN } from '../../Theme/token'

const useStyle = makeStyles((theme) => ({
  tagsWrapper: {
    marginBottom: '1rem',
    '& > *': { marginRight: '0.5rem', marginBottom: '0.5rem' },
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
  img: {
    objectFit: 'cover',
    objectPosition: 'center',
  },
  inputBase: {
    padding: '1rem',
    margin: '0.5rem 0',
    marginBottom: '2rem',
  },
  inputLabel: {
    ...theme.typography.h6,
    color: theme.palette.text.primary,
  },

  ratings: {
    marginBottom: '2rem',
  },
}))

export const NewReview: PrivateRouteComponent = ({ viewer }) => {
  const { menuId } = useParams<{ menuId: string }>()
  const notifyError = useOnErrorNotify()
  const notifySuccess = useOnSuccessNotify()
  const [isVegStyle, setIsVegStyle] = useState(false)
  const classes = useStyle({ isVeg: isVegStyle })
  const [fetchReviews, setFetchReviews] = useState(false)
  const history = useHistory()
  const { data, isError, isLoading } = useQuery(
    ['getMenuItemDetails', menuId],
    () => GET_MENU_ITEM(menuId),
    {
      onSuccess: ({ data }) => {
        setIsVegStyle(data.isVeg)
        setFetchReviews(true)
      },
      onError: notifyError,
    },
  )

  const { data: reviewData } = useQuery(
    ['getReviewDetail', menuId, data?.data.id],
    () => GET_REVIEWS({ menuItemId: menuId, user: viewer.id }),
    {
      onError: notifyError,
      enabled: fetchReviews,
      onSuccess: ({ data }) => {
        if (data.totalCount > 0) {
          notifySuccess('You Already Reviewed This Dish!')
        }
      },
    },
  )

  const { mutate } = useMutation(CREATE_REVIEW, {
    onError: notifyError,
    onSuccess: () => {
      notifySuccess('Review Created Successfully!')
      history.push(`/dishes/${menuId}`)
    },
  })

  const formik = useFormik({
    initialValues: {
      ratings: ((reviewData?.data.totalCount || 0) > 0 && reviewData?.data.result[0].ratings) || 5,
      comment: ((reviewData?.data.totalCount || 0) > 0 && reviewData?.data.result[0].comment) || '',
      title: ((reviewData?.data.totalCount || 0) > 0 && reviewData?.data.result[0].title) || '',
    },
    validateOnBlur: true,
    validateOnChange: true,
    onSubmit: (data) => {
      mutate({ ...data, menuItem: menuId })
    },
    enableReinitialize: true,
  })
  if (isLoading) {
    return (
      <Box height="8vh">
        <Spinner fullWidth />
      </Box>
    )
  }
  if (isError || !data) {
    return (
      <Container>
        <Alert variant="filled" color="error" severity="error">
          Something Went Wrong
        </Alert>
        <Box height="8vh">
          <Spinner fullWidth />
        </Box>
      </Container>
    )
  }
  const { title, images, ratings, prepTime, price, subTitle } = data.data

  return (
    <Container>
      <Box padding="2rem 0">
        <Typography variant="h4" gutterBottom>
          Write Review
        </Typography>
        <Grid container spacing={4}>
          <Grid item xs={6} sm={4} md={3} lg={2}>
            <AspectRatioBox>
              <img src={images[0]} alt={title} className={classes.img} />
            </AspectRatioBox>
          </Grid>
          <Grid item xs={12} sm={8} md={9} lg={10}>
            <Typography variant="body1">{subTitle}</Typography>
            <Typography variant="h5" gutterBottom>
              {title}
            </Typography>
            <Box className={classes.tagsWrapper}>
              <Chip
                icon={
                  <Star
                    size="18px"
                    style={{ marginLeft: '8px' }}
                    fill={WARNING_MAIN}
                    stroke={'0'}
                  />
                }
                label={ratings.toFixed(1)}
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
            <Typography variant="h5" gutterBottom>
              Rs. {price}
            </Typography>
          </Grid>
        </Grid>
        <Box padding="2rem 0">
          <form onSubmit={formik.handleSubmit}>
            <InputLabel className={classes.inputLabel} required>
              Rating
            </InputLabel>
            <Rating
              name="ratings"
              defaultValue={5}
              precision={0.5}
              className={classes.ratings}
              onBlur={formik.handleBlur}
              value={formik.values.ratings}
              onChange={formik.handleChange}
            />
            <InputLabel className={classes.inputLabel} required>
              Review Title
            </InputLabel>
            <InputBase
              id="title"
              multiline
              rows={1}
              fullWidth
              type="text"
              className={classes.inputBase}
              onBlur={formik.handleBlur}
              value={formik.values.title}
              onChange={formik.handleChange}
              error={formik.touched.title && !!formik.errors.title}
              required
            />
            <InputLabel className={classes.inputLabel} required>
              Write Review
            </InputLabel>
            <InputBase
              id="comment"
              multiline
              rows={3}
              fullWidth
              type="text"
              className={classes.inputBase}
              onBlur={formik.handleBlur}
              value={formik.values.comment}
              onChange={formik.handleChange}
              error={formik.touched.comment && !!formik.errors.comment}
              required
            />
            <Button size="large" variant="contained" color="primary" type="submit">
              Submit
            </Button>
          </form>
        </Box>
      </Box>
    </Container>
  )
}
