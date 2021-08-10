import { ThemeProvider, CssBaseline, Container, makeStyles } from '@material-ui/core'
import { Footer, Navbar } from './lib/components'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { PegasusUI } from './Theme'
import { QueryClient, QueryClientProvider, useQuery } from 'react-query'
import { SnackbarProvider } from 'notistack'
import { ERROR_MAIN, SUCCESS_MAIN, WARNING_MAIN } from './Theme/token'
import { useEffect, useState } from 'react'
import { WHO_AM_I } from './lib/api/query'
import { REFRESH_TOKEN } from './lib/api/query/refreshToken'
import { Viewer } from './lib/types/viewer'
import { AppRouter } from './Router'
import SwiperCore, { Navigation, Thumbs, Pagination, Scrollbar, A11y } from 'swiper'

import 'swiper/swiper-bundle.css'
import { ScrollToTop } from './lib/components/ScrollTop'

SwiperCore.use([Thumbs, Navigation, Pagination, Scrollbar, A11y])

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
const useSnackBarStyles = makeStyles(() => ({
  root: {
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

  useQuery('whoAmI', WHO_AM_I, {
    refetchOnMount: false,
    enabled,
    onSuccess: ({ data }) => setViewer({ ...data, didRequest: true }),
  })
  useQuery('refreshToken', REFRESH_TOKEN, {
    refetchOnMount: false,
    enabled: !!viewer?.id,
    refetchInterval: 850 * 1000,
  })

  useEffect(() => {
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

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
})

const AppWrapper = () => {
  const classes = useSnackBarStyles()
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={PegasusUI}>
        <CssBaseline />
        <BrowserRouter>
          <SnackbarProvider autoHideDuration={3000} preventDuplicate classes={classes}>
            <App />
          </SnackbarProvider>
        </BrowserRouter>
      </ThemeProvider>
    </QueryClientProvider>
  )
}

export default AppWrapper
