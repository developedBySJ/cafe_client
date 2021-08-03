import { Box, Container, darken, Grid, lighten, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { Skeleton } from '@material-ui/lab'
import { NON_VEG_COLOR, VEG_COLOR } from '../../lib/assets/VegNonVegIcon'
import { AspectRatioBox } from '../../lib/components/AspectRatioBox'

const useStyle = makeStyles((theme) => ({
  container: {
    paddingTop: '2rem',
  },
  headingWrapper: {
    marginBottom: '1rem',
  },
  tagsWrapper: {
    marginBottom: '1rem',
    display: 'flex',
    '& > *': { display: 'block', marginRight: '0.5rem' },
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
    height: 61,
    backgroundColor: lighten(theme.palette.primary.main, 0.7),
    borderRadius: 16,
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

export const MenuItemDetailsSkeleton = () => {
  const classes = useStyle({ isVeg: true })
  return (
    <Container className={classes.container}>
      <Grid container spacing={6}>
        <Grid item xs={12} md={8}>
          <Grid container spacing={1}>
            <Grid item xs={12} md={6}>
              <AspectRatioBox ratio={845 / 564}>
                <Skeleton width="100%" variant="rect" />
              </AspectRatioBox>
            </Grid>
            {Array.from({ length: 3 }).map((_, i) => (
              <Grid item xs={false} md={6} key={i}>
                <AspectRatioBox ratio={845 / 564}>
                  <Skeleton width="100%" variant="rect" />
                </AspectRatioBox>
              </Grid>
            ))}
          </Grid>
        </Grid>
        <Grid item xs={12} md={4}>
          <Box className={classes.headingWrapper}>
            <Typography variant="body1">
              <Skeleton width="100px" />
            </Typography>
            <Typography variant="h5">
              <Skeleton />
            </Typography>
          </Box>
          <Box className={classes.tagsWrapper}>
            <Skeleton width={64} height={32} variant="rect" style={{ borderRadius: 16 }} />
            <Skeleton width={64} height={32} variant="rect" style={{ borderRadius: 16 }} />
            <Skeleton width={64} height={32} variant="rect" style={{ borderRadius: 16 }} />
          </Box>
          <Typography variant="body2" className={classes.description}>
            <Skeleton />
            <Skeleton />
            <Skeleton />
            <Skeleton width="50%" />
          </Typography>
          <Box className={classes.priceWrapper}>
            <Typography variant="h4" className={classes.price}>
              <Skeleton width="128px" />
            </Typography>
            <Typography
              variant="body1"
              color="error"
              style={{ lineHeight: '150%', textDecoration: 'line-through', fontStyle: 'italic' }}
            >
              <Skeleton width="80px" />
            </Typography>
          </Box>
          <Box className={classes.button} />
          <Box className={classes.button} style={{ backgroundColor: '#f1f1f1' }} />
        </Grid>
      </Grid>
    </Container>
  )
}
