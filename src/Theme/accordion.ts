import { lighten } from '@material-ui/core'
import { GREY_300, GREY_500 } from './token'

export const MuiAccordion = {
  root: {
    backgroundColor: lighten(GREY_300, 0.2),
    borderRadius: '16px !important',
    boxShadow: 'none',
    marginBottom: '0.75rem',
    '&$expanded': {
      border: `2px solid ${GREY_500}`,
    },
    '&:before, &:after': {
      display: 'none',
    },
    '&:active': {
      border: `2px solid ${GREY_500}`,
    },
  },
}
