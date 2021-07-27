import { Box, Chip, darken, Grid, lighten, makeStyles, Typography } from '@material-ui/core'
import { NON_VEG_COLOR, VegNonVegIcon, VEG_COLOR } from '../../../../lib/assets/VegNonVegIcon'
import { AspectRatioBox } from '../../../../lib/components/AspectRatioBox'
import { Link } from 'react-router-dom'
import { QtyButton } from '../QtyButton'

const mock = {
  id: '0140bfeb-a8fc-4cde-ae2f-691a2f783283',
  qty: 2,
  createdAt: '2021-07-24T06:31:15.299Z',
  menuItem: {
    id: 'c574d7a3-9145-4d7b-9330-3548fe329e59',
    title: 'Death-By-Chocolate Mousse Jar',
    subTitle: 'World Cuisine',
    images: ['https://d3gy1em549lxx2.cloudfront.net/c5a409ee-785a-4738-9d79-8345fc6a66ad.JPG'],
    isAvailable: true,
    isVeg: true,
    price: 129,
    discount: 0,
    description:
      "Old-fashioned baked American Devil's food cake layered with rich dark chocolate Marquise glazed with butter candy sauce and topped with pure Belgian dark chocolate shavings...truly a sinful chocolate jar. Prepared fresh in our in-house bakery daily with no added preservatives.",
    prepTime: 6,
    ingredients: [],
    createdAt: '2021-07-24T06:01:14.438Z',
    updatedAt: '2021-07-24T06:01:14.438Z',
    menu: {
      id: '111cb109-b073-4f3c-8c00-4df371437680',
      name: 'FRESH DESSERTS',
      isActive: true,
      image:
        'https://images.unsplash.com/photo-1582716401301-b2407dc7563d?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1054&q=80',
      createdAt: '2021-07-24T06:00:50.665Z',
      updatedAt: '2021-07-24T06:00:50.665Z',
    },
  },
}

const useStyle = makeStyles((theme) => ({
  wrapper: {
    paddingTop: '2rem',
  },
  headingWrapper: {
    marginBottom: '1rem',
  },
  tagsWrapper: {
    margin: '4px 0',
    display: 'flex',
    alignItems: 'center',
    '& > *': { marginRight: '0.5rem' },
  },
  typeTag: {
    backgroundColor: ({ isVeg }: any) => lighten(isVeg ? VEG_COLOR : NON_VEG_COLOR, 0.8),
    color: ({ isVeg }: any) => darken(isVeg ? VEG_COLOR : NON_VEG_COLOR, 0.5),
  },
}))

export const CartCard = () => {
  const { menuItem, qty } = mock
  const { images, title, price, isVeg, prepTime, id } = menuItem
  const classes = useStyle({ isVeg })

  const menuItemUrl = `dishes/${id}`

  return (
    <Grid container spacing={2} style={{ borderBottom: '1px solid #ddd', padding: '1rem 0' }}>
      <Grid item xs={4} md={3}>
        <AspectRatioBox ratio={5 / 4}>
          <img
            src={images[0]}
            alt={title}
            style={{ objectFit: 'fill', objectPosition: 'center' }}
          />
        </AspectRatioBox>
      </Grid>
      <Grid item xs={6} md={7}>
        <Link to={menuItemUrl} style={{ textDecoration: 'none' }}>
          <Typography
            variant="body1"
            color="textPrimary"
            style={{
              fontWeight: 500,
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
            }}
          >
            {title}
          </Typography>
        </Link>
        <Box className={classes.tagsWrapper}>
          <Chip
            icon={<VegNonVegIcon style={{ marginLeft: '12px' }} isVeg={isVeg} size={16} />}
            label={isVeg ? 'Pure Veg' : 'Non-Veg'}
            variant="default"
            className={classes.typeTag}
            size="small"
          />
        </Box>
        <Typography
          variant="body1"
          style={{
            fontWeight: 500,
            marginTop: '1rem',
          }}
        >
          1 @ Rs. {price}
        </Typography>

        <Box display="flex" alignItems="center">
          <Typography
            variant="body1"
            color="textSecondary"
            style={{ fontWeight: 500, marginRight: '1rem', cursor: 'pointer' }}
          >
            Remove
          </Typography>
          <QtyButton />
        </Box>
      </Grid>
      <Grid item xs={2}>
        <Typography
          variant="h6"
          style={{
            fontWeight: 500,
          }}
        >
          Rs. {price * qty}
        </Typography>
      </Grid>
    </Grid>
  )
}
