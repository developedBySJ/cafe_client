import { ThemeProvider, CssBaseline, Container, makeStyles } from '@material-ui/core'
import { Login, SignUp } from './section'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { PegasusUI } from './Theme'

const useStyle = makeStyles((theme) => ({
  container: {
    backgroundColor: theme.palette.grey[100],
    minHeight: '100vh',
  },
}))

export const App = () => {
  const { container } = useStyle()
  return (
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
  )
}

const AppWrapper = () => {
  return (
    <ThemeProvider theme={PegasusUI}>
      <CssBaseline />
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default AppWrapper
