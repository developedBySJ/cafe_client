import React from 'react'
import { Box, Button, IconButton, Typography } from '@material-ui/core'
import { Minus, Plus } from 'react-feather'
import { makeStyles } from '@material-ui/core'
import { lighten } from '@material-ui/core'

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

export const QtyButton = () => {
  const classes = useStyle()
  return (
    <Box display="flex" alignItems="center" className={classes.wrapper}>
      <IconButton size="small" color="primary" className={classes.minusButton}>
        <Minus />
      </IconButton>
      <Typography variant="h6" className={classes.qty}>
        {2}
      </Typography>
      <IconButton size="small" color="primary" className={classes.plusButton}>
        <Plus />
      </IconButton>
    </Box>
  )
}
