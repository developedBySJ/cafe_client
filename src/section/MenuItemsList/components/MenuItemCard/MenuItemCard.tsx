import React from 'react'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import { Box, makeStyles } from '@material-ui/core'
import { IMenuItems } from '../../../../lib/api/types/menuItems.type'
import { Link } from 'react-router-dom'
import { useMutation } from 'react-query'
import { ADD_CART_ITEM } from '../../../../lib/api/Mutation/addToCart'
import { useOnErrorNotify, useOnSuccessNotify } from '../../../../lib/hooks'

const useStyle = makeStyles((theme) => ({
  image: { height: '25vw', maxHeight: 256, minHeight: 200 },
  title: {
    fontWeight: 500,
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
  },
  link: {
    textDecoration: 'none',
    color: 'inherit',
  },
  price: { whiteSpace: 'nowrap' },
  cardAction: { padding: 0 },
  button: { borderTopLeftRadius: 0, borderTopRightRadius: 0 },
}))

export const MenuItemCard: React.FC<{ menuItem: IMenuItems }> = ({ menuItem }) => {
  const { images, title, subTitle, id, prepTime, isVeg, isAvailable, price } = menuItem
  const classes = useStyle()
  const notifyError = useOnErrorNotify()
  const notifySuccess = useOnSuccessNotify()
  const {
    mutate: addToCart,
    data: addToCartData,
    isLoading: isAddToCartLoading,
  } = useMutation(ADD_CART_ITEM, {
    onError: notifyError,
    onSuccess: () => notifySuccess('Dish Added To Your Cart'),
  })
  const handleAddToCart = () => {
    addToCart({ menuItem: id, qty: 1 })
  }
  return (
    <Card elevation={0}>
      <CardActionArea disableRipple>
        <Link to={`/dishes/${id}`} className={classes.link}>
          <CardMedia image={images[0]} className={classes.image} title="Contemplative Reptile" />
          <CardContent>
            <Box display="flex" justifyContent="space-between">
              <Typography variant="body1" component="h2" className={classes.title}>
                {title}
              </Typography>
              <Typography variant="body1" component="h2" color="primary" className={classes.price}>
                Rs. {price}
              </Typography>
            </Box>
            <Box display="flex" alignItems="center">
              <Typography
                variant="body2"
                color="textSecondary"
                component="p"
                className={classes.title}
              >
                {isVeg ? 'Pure Veg' : 'Non Veg'} &bull; {subTitle} &bull; {prepTime} min
              </Typography>
            </Box>
          </CardContent>
        </Link>
      </CardActionArea>
      <CardActions className={classes.cardAction}>
        <Button
          variant="contained"
          color="primary"
          fullWidth
          disabled={!isAvailable || isAddToCartLoading}
          className={classes.button}
          onClick={handleAddToCart}
        >
          Add
        </Button>
      </CardActions>
    </Card>
  )
}
