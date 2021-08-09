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
import { useState } from 'react'
import { Star, Clock } from 'react-feather'
import { useQuery } from 'react-query'
import { useParams } from 'react-router-dom'
import { Spinner } from '../../lib'
import { GET_MENU_ITEM } from '../../lib/api/query/menuItemDetail'
import { VEG_COLOR, NON_VEG_COLOR, VegNonVegIcon } from '../../lib/assets/VegNonVegIcon'
import { AspectRatioBox } from '../../lib/components/AspectRatioBox'
import { useOnErrorNotify } from '../../lib/hooks'
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
    objectFit: 'contain',
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

export const NewReview = () => {
  const { menuId } = useParams<{ menuId: string }>()
  const notifyError = useOnErrorNotify()
  const [isVegStyle, setIsVegStyle] = useState(false)
  const classes = useStyle({ isVeg: isVegStyle })

  const { data, isError, isLoading, refetch } = useQuery(
    ['getMenuItemDetails', menuId],
    () => GET_MENU_ITEM(menuId),
    { onSuccess: ({ data }) => setIsVegStyle(data.isVeg), onError: notifyError },
  )
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
          <Grid item xs={4} sm={3} md={2}>
            <AspectRatioBox>
              <img src={images[0]} alt={title} className={classes.img} />
            </AspectRatioBox>
          </Grid>
          <Grid item xs={8} sm={9} md={10}>
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
          <InputLabel className={classes.inputLabel} required>
            Rating
          </InputLabel>
          <Rating
            name="customized-empty"
            defaultValue={5}
            precision={0.5}
            className={classes.ratings}
          />
          <InputLabel className={classes.inputLabel} required>
            Review Title
          </InputLabel>
          <InputBase
            id="address"
            multiline
            rows={1}
            fullWidth
            type="text"
            className={classes.inputBase}
            // onBlur={formik.handleBlur}
            // value={formik.values.address}
            // onChange={formik.handleChange}
            // error={formik.touched.address && !!formik.errors.address}
            required
          />
          <InputLabel className={classes.inputLabel} required>
            Write Review
          </InputLabel>
          <InputBase
            id="address"
            multiline
            rows={3}
            fullWidth
            type="text"
            className={classes.inputBase}
            // onBlur={formik.handleBlur}
            // value={formik.values.address}
            // onChange={formik.handleChange}
            // error={formik.touched.address && !!formik.errors.address}
            required
          />
          <Button size="large" variant="contained" color="primary">
            Submit
          </Button>
        </Box>
      </Box>
    </Container>
  )
}
