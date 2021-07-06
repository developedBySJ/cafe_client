import { ButtonClassKey, StyleRules } from '@material-ui/core'

export const MuiButton: Partial<StyleRules<ButtonClassKey, {}>> = {
  root: {
    boxShadow: 'none',
    borderRadius: 10000,
    padding: '0.72rem 3rem',
    '&:hover': {
      boxShadow: 'none',
    },
  },
  outlined: { padding: '0.72rem 3rem' },
  text: { padding: '0.72rem 3rem' },
  sizeSmall: {
    padding: '0.4rem 2rem',
  },
  sizeLarge: {
    padding: '1rem 4rem',
  },
  contained: {
    boxShadow: 'none',
    '&:hover': {
      boxShadow: 'none',
    },
    '&:focus-within': {
      boxShadow: 'none',
    },
    '&:focus': {
      boxShadow: 'none',
    },
  },
}
