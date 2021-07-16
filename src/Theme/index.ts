import { createTheme, lighten } from '@material-ui/core/styles'
import { MuiButton } from './button'
import { MuiFilledInput } from './input'
import { palette } from './palette'
import { shadows } from './shadows'
import { MuiAccordion } from './accordion'
import { typography } from './typography'

export const PegasusUI = createTheme({
  palette,
  typography,
  shadows,
  overrides: {
    MuiButton,
    MuiFilledInput,
    MuiInputBase: MuiFilledInput,
    MuiBackdrop: {
      root: {
        background: 'rgba(250,250,250,0.8)',
        backdropFilter: 'saturate(180%) blur(8px)',
      },
    },
    MuiAccordion,
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
