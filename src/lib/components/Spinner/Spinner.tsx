import React from 'react'
import { Box, CircularProgress, Typography } from '@material-ui/core'
import { CircularProgressProps } from '@material-ui/core'
import { makeStyles } from '@material-ui/core'

interface SpinnerProps extends CircularProgressProps {
  fullWidth?: boolean
  duration?: number
  label?: string
}

const useStyle = makeStyles((theme) => ({
  fullWidth: {
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  normal: {
    textAlign: 'center',
  },
  label: {
    marginTop: '1rem',
  },
}))

export const Spinner: React.FC<SpinnerProps> = ({
  duration = 650,
  fullWidth = false,
  label,
  style,
  ...props
}) => {
  const classes = useStyle()
  return (
    <Box className={fullWidth ? classes.fullWidth : classes.normal}>
      <CircularProgress
        style={{ animationDuration: `${duration}ms`, ...style }}
        disableShrink
        {...props}
      />
      {label && (
        <Typography color="textSecondary" className={classes.label} variant="h6">
          {label}
        </Typography>
      )}
    </Box>
  )
}
