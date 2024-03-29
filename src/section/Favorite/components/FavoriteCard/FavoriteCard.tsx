import { Box, Button, Chip, darken, Grid, lighten, makeStyles, Typography } from '@material-ui/core'
import { NON_VEG_COLOR, VegNonVegIcon, VEG_COLOR } from '../../../../lib/assets/VegNonVegIcon'
import { AspectRatioBox } from '../../../../lib/components/AspectRatioBox'
import { Link } from 'react-router-dom'
import { IFavorite } from '../../../../lib/api/types/userItems.type'
import { useMutation, useQueryClient } from 'react-query'
import { REMOVE_FAV_ITEM } from '../../../../lib/api/Mutation/updateFavorites'

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

interface FavoriteCardProps {
  data: IFavorite
}

export const FavoriteCard: React.FC<FavoriteCardProps> = ({ data }) => {
  const { menuItem, id: favId } = data
  const { images, title, price, isVeg, prepTime, id } = menuItem
  const classes = useStyle({ isVeg })
  const queryClient = useQueryClient()
  const { mutate, isLoading } = useMutation(REMOVE_FAV_ITEM, {
    onSuccess: () => queryClient.invalidateQueries('getFavorites'),
  })
  const menuItemUrl = `dishes/${id}`

  const handleRemoveBtnClick = () => {
    mutate(favId)
  }
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

        <Box display="flex" alignItems="center" marginTop="1rem">
          <Button size="small" style={{ paddingLeft: 0 }} onClick={handleRemoveBtnClick}>
            Remove
          </Button>
        </Box>
      </Grid>
      <Grid item xs={2}>
        <Typography
          variant="h6"
          style={{
            fontWeight: 500,
          }}
        >
          Rs. {price}
        </Typography>
      </Grid>
    </Grid>
  )
}
