import { FilledInputClassKey, InputBaseClassKey, lighten, StyleRules } from '@material-ui/core'
import { palette } from './palette'
import { ERROR_LIGHT, ERROR_MAIN, GREY_300, PRIMARY_MAIN, SECONDARY_MAIN } from './token'

export const MuiFilledInput: Partial<StyleRules<FilledInputClassKey, {}>> = {
  root: {
    backgroundColor: '#EFF0F6',
    border: '2px solid transparent',
    '&:hover': {
      backgroundColor: '#EFF0F6',
    },
    '&$disabled': {
      backgroundColor: GREY_300,
      opacity: 0.5,
    },
    '&$InputLabel': {
      color: 'red',
    },
    '&$error': {
      backgroundColor: lighten(ERROR_LIGHT, 0.8),
      border: `2px solid ${ERROR_MAIN} !important`,
    },
    '&:focus-within': {
      backgroundColor: '#FCFCFC',
      border: `2px solid ${PRIMARY_MAIN}`,
    },
    borderRadius: '16px',
  },

  colorSecondary: {
    '&:focus-within': {
      border: `2px solid ${SECONDARY_MAIN}`,
    },
  },
  underline: {
    '&::after': {
      display: 'none',
    },
    '&::before': {
      display: 'none',
    },
  },
}
