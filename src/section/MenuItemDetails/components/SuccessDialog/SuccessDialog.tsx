import {
  Box,
  Button,
  Chip,
  darken,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  lighten,
  makeStyles,
  Typography,
} from '@material-ui/core'
import React from 'react'
import { Check } from 'react-feather'
import { Link, useHistory } from 'react-router-dom'
import { IMenuItem } from '../../../../lib/api/types/menuItem.type'
import { ICart } from '../../../../lib/api/types/userItems.type'
import { NON_VEG_COLOR, VegNonVegIcon, VEG_COLOR } from '../../../../lib/assets/VegNonVegIcon'
import { AspectRatioBox } from '../../../../lib/components/AspectRatioBox'

const useStyle = makeStyles((theme) => ({
  typeTag: {
    backgroundColor: ({ isVeg }: any) => lighten(isVeg ? VEG_COLOR : NON_VEG_COLOR, 0.8),
    color: ({ isVeg }: any) => darken(isVeg ? VEG_COLOR : NON_VEG_COLOR, 0.5),
  },
}))

interface SuccessDialogProps {
  data: ICart
  isOpen: boolean
  setIsOpen: (isVeg: boolean) => void
}

export const SuccessDialog: React.FC<SuccessDialogProps> = ({ data, isOpen, setIsOpen }) => {
  const { menuItem, qty } = data
  const { title, subTitle, price, images, isVeg, discount } = menuItem
  const history = useHistory()
  return (
    <Dialog open={isOpen} fullWidth maxWidth="xs">
      <DialogTitle>
        <Box display="flex" alignItems="center">
          <Check style={{ marginRight: '0.5rem' }} /> Added To Cart
        </Box>
      </DialogTitle>
      <DialogContent>
        <Box display="flex" marginBottom="2rem">
          <Box width="96px" marginRight="1rem">
            <AspectRatioBox>
              <img src={images[0]} alt="image" style={{ width: 96 }} />
            </AspectRatioBox>
          </Box>
          <Box>
            <VegNonVegIcon isVeg={isVeg} size={16} />
            <Typography variant="h6">{title}</Typography>
            <Typography variant="body1" style={{ fontWeight: 500 }}>
              Rs.{price}
            </Typography>
            <Typography
              variant="body1"
              color="primary"
              style={{ fontWeight: 500, textDecoration: 'line-through' }}
            >
              Flat {discount} off{' '}
            </Typography>
          </Box>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => setIsOpen(false)}
          fullWidth
          style={{ paddingLeft: '1.5rem', paddingRight: '1.5rem' }}
        >
          Close
        </Button>

        <Button
          color="primary"
          variant="contained"
          fullWidth
          style={{ paddingLeft: '1.5rem', paddingRight: '1.5rem' }}
          onClick={() => history.push(`/cart`)}
        >
          View Cart
        </Button>
      </DialogActions>
    </Dialog>
  )
}
