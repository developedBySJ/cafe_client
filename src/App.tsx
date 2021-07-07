import { ThemeProvider, CssBaseline, Container, makeStyles } from '@material-ui/core'
import { Login, SignUp } from './section'
import { Navbar } from './lib/component'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { PegasusUI } from './Theme'
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from 'react-query'

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
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={PegasusUI}>
        <CssBaseline />
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ThemeProvider>
    </QueryClientProvider>
  )
}

export default AppWrapper
