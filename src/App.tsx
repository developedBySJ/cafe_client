import { ThemeProvider, CssBaseline, Container, makeStyles } from '@material-ui/core'
import { Footer, Navbar } from './lib/components'
import { BrowserRouter, Route, Switch, useHistory } from 'react-router-dom'
import { PegasusUI } from './Theme'
import { QueryClient, QueryClientProvider, useQuery } from 'react-query'
import { SnackbarProvider, useSnackbar } from 'notistack'
import { ERROR_MAIN, SUCCESS_MAIN, WARNING_MAIN } from './Theme/token'
import { useEffect, useRef, useState } from 'react'
import { WHO_AM_I } from './lib/api/query'
import { REFRESH_TOKEN } from './lib/api/query/refreshToken'
import { Viewer } from './lib/types/viewer'
import { AppRouter } from './Router'
import SwiperCore, { Navigation, Thumbs, Pagination, Scrollbar, A11y } from 'swiper'
import MomentUtils from '@date-io/moment'

import 'swiper/swiper-bundle.css'
import { ScrollToTop } from './lib/components/ScrollTop'
import { MuiPickersUtilsProvider } from '@material-ui/pickers'
import { loadStripe } from '@stripe/stripe-js'
import { useOnErrorNotify } from './lib/hooks'
import { Alert } from '@material-ui/lab'

SwiperCore.use([Thumbs, Navigation, Pagination, Scrollbar, A11y])

export const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY || '')

const useStyle = makeStyles((theme) => ({
  container: { padding: 0 },
  wrapper: {
    // backgroundColor: theme.palette.grey[100],

    paddingTop: '56px',
    [theme.breakpoints.up('sm')]: {
      paddingTop: '64px',
    },
  },
}))
export const useSnackBarStyles = makeStyles(() => ({
  root: {
    pointerEvents: 'all',
    margin: '0.25rem 0',
    '& *': {
      boxShadow: 'none !important',
    },
  },
  variantSuccess: {
    backgroundColor: SUCCESS_MAIN,
    fontWeight: 500,
  },
  variantError: {
    backgroundColor: ERROR_MAIN,
    fontWeight: 500,
  },
  variantInfo: {
    fontWeight: 500,
  },
  variantWarning: {
    backgroundColor: WARNING_MAIN,
    fontWeight: 500,
  },
}))

const initialState: Viewer = {
  didRequest: false,
  total: undefined,
}

export const App = () => {
  const { container, wrapper } = useStyle()
  const [viewer, setViewer] = useState(initialState)
  const [enabled, setEnabled] = useState(true)
  const { enqueueSnackbar } = useSnackbar()
  const history = useHistory()
  useQuery('whoAmI', WHO_AM_I, {
    refetchOnMount: false,
    enabled: enabled || !viewer.didRequest,
    onSuccess: ({ data }) => setViewer({ ...data, didRequest: true }),
  })
  useQuery('refreshToken', REFRESH_TOKEN, {
    refetchIntervalInBackground: true,
    enabled: !!viewer?.id,
    refetchInterval: 850 * 1000,
  })

  useEffect(() => {
    enqueueSnackbar('', {
      anchorOrigin: {
        horizontal: 'center',
        vertical: 'top',
      },
      onClick: () => window.open('https://github.com/developedBySJ', '_blank'),
      content: () => {
        return (
          <Alert severity="info">
            Build With ReactJS | NodeJS | TS By{' '}
            <a href="https://github.com/developedBySJ" target="_blank">
              {' '}
              Swapnil J
            </a>
          </Alert>
        )
      },
    })
    setEnabled(false)
  }, [])

  useEffect(() => {
    setViewer((prev) => ({ ...prev, total: undefined }))
  }, [viewer.id])

  return (
    <div id="my-app-wrapper" className={wrapper}>
      <Navbar viewer={viewer} />
      <ScrollToTop />
      <AppRouter viewer={viewer} setViewer={setViewer} />
      <Footer />
    </div>
  )
}

const queryClient = (onError: (err: unknown) => void) =>
  new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        onError,
      },
    },
  })

const AppWrapper = () => {
  const notifyError = useOnErrorNotify()
  const queryClientRef = useRef(queryClient(notifyError))
  return (
    <QueryClientProvider client={queryClientRef.current}>
      <ThemeProvider theme={PegasusUI}>
        <CssBaseline />
        <BrowserRouter>
          <MuiPickersUtilsProvider utils={MomentUtils}>
            <App />
          </MuiPickersUtilsProvider>
        </BrowserRouter>
      </ThemeProvider>
    </QueryClientProvider>
  )
}

export default AppWrapper
