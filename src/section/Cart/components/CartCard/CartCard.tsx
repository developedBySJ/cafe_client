import { Box, Chip, darken, Grid, lighten, makeStyles, Typography } from '@material-ui/core'
import { NON_VEG_COLOR, VegNonVegIcon, VEG_COLOR } from '../../../../lib/assets/VegNonVegIcon'
import { AspectRatioBox } from '../../../../lib/components/AspectRatioBox'
import { Link } from 'react-router-dom'
import { QtyButton } from '../QtyButton'
import { ICart } from '../../../../lib/api/types/userItems.type'

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

interface CartCardProps {
  data: ICart
}

export const CartCard: React.FC<CartCardProps> = ({ data }) => {
  const { menuItem, qty } = data
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

        <Box display="flex" alignItems="center" marginTop="0.5rem">
          <Typography
            variant="body1"
            color="textSecondary"
            style={{ fontWeight: 500, marginRight: '1rem', cursor: 'pointer' }}
          >
            Remove
          </Typography>
          <QtyButton qty={qty} />
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
