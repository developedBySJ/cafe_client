import { ThemeProvider, CssBaseline, Container, makeStyles } from '@material-ui/core'
import { Login, SignUp } from './section'
import { Navbar } from './lib/component'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { PegasusUI } from './Theme'
import { QueryClient, QueryClientProvider } from 'react-query'
import { SnackbarProvider } from 'notistack'
import { ERROR_MAIN, SUCCESS_MAIN, WARNING_MAIN } from './Theme/token'

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

export const App = () => {
  const { container, wrapper } = useStyle()
  return (
    <div id="my-app-wrapper" className={wrapper}>
      <Navbar />
      <Switch>
        <Container maxWidth="xl" className={container}>
          <Route path="/login" exact>
            <Login />
          </Route>
          <Route path="/signup" exact>
            <SignUp />
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
