import {
  Box,
  Button,
  Container,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from '@material-ui/core'
import { Alert, Rating } from '@material-ui/lab'
import { useQuery } from 'react-query'
import { useHistory, useParams } from 'react-router-dom'
import { ReviewCard, Spinner } from '../../lib'
import { GET_MENU_ITEM } from '../../lib/api/query/menuItemDetail'
import { GET_REVIEWS } from '../../lib/api/query/reviews'
import { useOnErrorNotify } from '../../lib/hooks'

export const Reviews = () => {
  const { menuId } = useParams<{ menuId: string }>()
  const notifyError = useOnErrorNotify()
  const history = useHistory()
  const { data, isError, isLoading, refetch } = useQuery(
    ['getMenuItemDetails', menuId],
    () => GET_MENU_ITEM(menuId),
    { onError: notifyError },
  )
  const {
    data: reviewsData,
    isError: isReviewsError,
    isLoading: isReviewLoading,
  } = useQuery(['getReviews', menuId], () => GET_REVIEWS(`?menuItemId=${menuId}`), {
    onError: notifyError,
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
  const { title, ratings, reviewCount } = data.data
  return (
    <Container maxWidth="md" style={{ marginTop: '2rem' }}>
      <Box>
        <Typography variant="h4" align="center">
          {title}
        </Typography>
        <Box margin="2rem 0" textAlign="center">
          <Rating value={ratings} readOnly />
          <Typography variant="h6" color="textSecondary">
            {ratings.toFixed(1)}
          </Typography>
          <Typography variant="h5">{reviewCount} Reviews</Typography>
        </Box>
        <Box margin="2rem 0">
          <Grid container spacing={1} alignItems="center" justifyContent="space-between">
            <Grid item xs={12} md={6} lg={4}>
              <FormControl variant="filled" fullWidth>
                <InputLabel id="sortBy">Sort By</InputLabel>
                <Select variant="filled" color="primary" label="sortBy" fullWidth>
                  <MenuItem value={10}>Recent </MenuItem>
                  <MenuItem value={20}>Ratings : High to Low</MenuItem>
                  <MenuItem value={20}>Ratings : Low to High</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <Button
                size="large"
                fullWidth
                variant="outlined"
                color="primary"
                onClick={() => history.push(`reviews/new`)}
              >
                Write Review
              </Button>
            </Grid>
          </Grid>
        </Box>
        <Grid container>
          {reviewsData?.data.result.length ? (
            reviewsData.data.result.map((review) => (
              <Grid item xs={12} key={review.id}>
                <ReviewCard data={review} />
              </Grid>
            ))
          ) : (
            <Box padding="3rem" width="100%">
              <Typography variant="h6" align="center" color="textSecondary">
                No Reviews
              </Typography>
            </Box>
          )}
        </Grid>
      </Box>
    </Container>
  )
}
