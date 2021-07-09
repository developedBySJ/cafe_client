import { ThemeProvider, CssBaseline, Container, makeStyles } from '@material-ui/core'
import { Login, SignUp, ForgotPassword } from './section'
import { Navbar } from './lib/component'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { PegasusUI } from './Theme'
import { QueryClient, QueryClientProvider, useQuery } from 'react-query'
import { SnackbarProvider } from 'notistack'
import { ERROR_MAIN, SUCCESS_MAIN, WARNING_MAIN } from './Theme/token'
import { ResetPassword } from './section/ResetPassword'
import { useState } from 'react'
import { WHO_AM_I } from './lib/api/query'
import { REFRESH_TOKEN } from './lib/api/query/refreshToken'
import { Viewer } from './lib/types/viewer'

const useStyle = makeStyles((theme) => ({
  container: {
    minHeight: '200vh',
  },
  wrapper: {
    backgroundColor: theme.palette.grey[100],
    paddingTop: '56px',
    [theme.breakpoints.up('sm')]: {
      paddingTop: '64px',
    },
  },
}))
const useSnackBarStyles = makeStyles(() => ({
  root: {
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
}

const Demo = () => {
  return (
    <div>
      <h1>HII</h1>
    </div>
  )
}

export const App = () => {
  const { container, wrapper } = useStyle()
  const [viewer, setViewer] = useState(initialState)

  useQuery('whoAmI', WHO_AM_I, {
    refetchOnMount: false,
    onSuccess: ({ data }) => setViewer({ ...data, didRequest: true } || { didRequest: true }),
  })
  useQuery('refreshToken', REFRESH_TOKEN, {
    refetchOnMount: false,
    enabled: !!viewer?.id,
    refetchInterval: 850 * 1000,
  })

  return (
    <div id="my-app-wrapper" className={wrapper}>
      <Navbar viewer={viewer} />
      <Switch>
        <Container maxWidth="xl" className={container}>
          <Route path="/login" exact>
            <Login viewer={viewer} setViewer={setViewer} />
          </Route>
          <Route path="/signup" exact>
            <SignUp />
          </Route>
          <Route path="/forgot-password" exact>
            <ForgotPassword />
          </Route>
          <Route path="/reset-password/:token" exact>
            <ResetPassword />
          </Route>
        </Container>
      </Switch>
    </div>
  )
}

const queryClient = new QueryClient()

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
