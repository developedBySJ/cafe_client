import React from 'react'
import { Box, IconButton, Typography } from '@material-ui/core'
import { Minus, Plus } from 'react-feather'
import { makeStyles } from '@material-ui/core'
import { useMutation, useQueryClient } from 'react-query'
import { UpdateCartPayload, UPDATE_CART_ITEM } from '../../../../lib/api/Mutation/updateCart'

const useStyle = makeStyles((theme) => ({
  qty: {
    padding: '0 1rem',
    // border: `1px solid ${theme.palette.primary.main}`,
    // borderBottom: 'none',
    // borderTop: 'none',
  },
  wrapper: {
    // border: `1px solid ${theme.palette.primary.main}`,
    display: 'inline-flex',
  },
  plusButton: {},
  minusButton: {},
}))

interface QtyButtonProps {
  qty: number
  id: string
}

export const QtyButton: React.FC<QtyButtonProps> = ({ qty, id }) => {
  const classes = useStyle()
  const queryClient = useQueryClient()
  const { mutate } = useMutation((data: UpdateCartPayload) => UPDATE_CART_ITEM(data), {
    onSuccess: () => {
      queryClient.invalidateQueries('getCart')
    },
  })
  return (
    <Box display="flex" alignItems="center" className={classes.wrapper}>
      <IconButton
        size="small"
        color="primary"
        className={classes.minusButton}
        onClick={() => mutate({ id, qty: qty - 1 })}
        disabled={qty <= 1}
      >
        <Minus />
      </IconButton>
      <Typography variant="h6" className={classes.qty}>
        {qty}
      </Typography>
      <IconButton
        size="small"
        color="primary"
        className={classes.plusButton}
        onClick={() => mutate({ id, qty: qty + 1 })}
        disabled={qty >= 10}
      >
        <Plus />
      </IconButton>
    </Box>
  )
}
