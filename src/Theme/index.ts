import { createMuiTheme } from '@material-ui/core'
import { MuiButton } from './button'
import { MuiFilledInput } from './input'
import { palette } from './palette'
import { shadows } from './shadows'
import { typography } from './typography'

export const PegasusUI = createMuiTheme({
  palette,
  typography,
  shadows,
  overrides: {
    MuiButton,
    MuiFilledInput,
    MuiButtonGroup: {
      root: {
        borderRadius: 1000,
      },
      vertical: {
        '& :last-child': {
          borderRadius: '0  0 16px 16px !important',
        },
        '& :first-child': {
          borderRadius: '16px 16px 0  0  !important',
        },
      },
    },
  },
  shape: {
    borderRadius: 16,
  },
})
