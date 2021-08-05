import {
  Box,
  Button,
  darken,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  lighten,
  makeStyles,
  Typography,
} from '@material-ui/core'
import React from 'react'
import { Check } from 'react-feather'
import { useHistory } from 'react-router-dom'
import { IUserItems } from '../../../../lib/api/types/userItems.type'
import { NON_VEG_COLOR, VegNonVegIcon, VEG_COLOR } from '../../../../lib/assets/VegNonVegIcon'
import { AspectRatioBox } from '../../../../lib/components/AspectRatioBox'

const useStyle = makeStyles((theme) => ({
  typeTag: {
    backgroundColor: ({ isVeg }: any) => lighten(isVeg ? VEG_COLOR : NON_VEG_COLOR, 0.8),
    color: ({ isVeg }: any) => darken(isVeg ? VEG_COLOR : NON_VEG_COLOR, 0.5),
  },
}))

export type SuccessDialogType = 'cart' | 'fav' | undefined
interface SuccessDialogProps {
  data: IUserItems
  isOpen: boolean
  setIsOpen: (arg: [boolean, SuccessDialogType]) => void
  type: SuccessDialogType
}

export const SuccessDialog: React.FC<SuccessDialogProps> = ({ data, isOpen, setIsOpen, type }) => {
  const { menuItem, qty } = data
  const { title, subTitle, price, images, isVeg, discount } = menuItem
  const history = useHistory()

  const url = type === 'cart' ? '/cart' : '/favorites'
  const typeText = type === 'cart' ? 'Cart' : 'Favorites'

  return (
    <Dialog open={isOpen} fullWidth maxWidth="xs">
      <DialogTitle>
        <Box display="flex" alignItems="center">
          <Check style={{ marginRight: '0.5rem' }} /> Added To {typeText}
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
          onClick={() => setIsOpen([false, undefined])}
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
          onClick={() => history.push(url)}
        >
          View {typeText}
        </Button>
      </DialogActions>
    </Dialog>
  )
}
