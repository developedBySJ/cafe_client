import { PaletteOptions } from '@material-ui/core/styles/createPalette'
import {
  ERROR_DARK,
  ERROR_LIGHT,
  ERROR_MAIN,
  PRIMARY_DARK,
  PRIMARY_LIGHT,
  PRIMARY_MAIN,
  SECONDARY_DARK,
  SECONDARY_LIGHT,
  SECONDARY_MAIN,
  SUCCESS_DARK,
  SUCCESS_LIGHT,
  SUCCESS_MAIN,
  COMMON_BLACK,
  COMMON_WHITE,
  GREY_100,
  GREY_300,
  GREY_400,
  GREY_50,
  GREY_500,
  GREY_600,
  GREY_700,
  GREY_800,
  GREY_900,
  GREY_A100,
  GREY_A200,
  GREY_A400,
  GREY_A700,
  WARNING_DARK,
  WARNING_LIGHT,
  WARNING_MAIN,
  BACKGROUND_DEFAULT,
} from './token'

export const palette: PaletteOptions = {
  primary: {
    main: PRIMARY_MAIN,
    dark: PRIMARY_DARK,
    light: PRIMARY_LIGHT,
  },
  secondary: {
    main: SECONDARY_MAIN,
    dark: SECONDARY_DARK,
    light: SECONDARY_LIGHT,
  },
  success: {
    main: SUCCESS_MAIN,
    dark: SUCCESS_DARK,
    light: SUCCESS_LIGHT,
  },
  error: {
    main: ERROR_MAIN,
    dark: ERROR_DARK,
    light: ERROR_LIGHT,
  },
  warning: {
    main: WARNING_MAIN,
    dark: WARNING_DARK,
    light: WARNING_LIGHT,
  },
  background: { default: BACKGROUND_DEFAULT },
  grey: {
    '50': GREY_50,
    '100': GREY_100,
    '300': GREY_300,
    '400': GREY_400,
    '500': GREY_500,
    '600': GREY_600,
    '700': GREY_700,
    '800': GREY_800,
    '900': GREY_900,
    A100: GREY_A100,
    A200: GREY_A200,
    A400: GREY_A400,
    A700: GREY_A700,
  },
  common: {
    black: COMMON_BLACK,
    white: COMMON_WHITE,
  },
  action: {
    disabled: GREY_400,
    disabledBackground: GREY_300,
    hover: GREY_400,
  },
  type: 'light',
}
