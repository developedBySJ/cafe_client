import React from 'react'
import Dialog from '@material-ui/core/Dialog'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import { useTheme } from '@material-ui/core/styles'
import { DialogProps } from '@material-ui/core'

interface ResponsiveDialogProps extends DialogProps {}

export const ResponsiveDialog: React.FC<ResponsiveDialogProps> = (props) => {
  const theme = useTheme()
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'))

  return <Dialog {...props} fullScreen={fullScreen}></Dialog>
}
