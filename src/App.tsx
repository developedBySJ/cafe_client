import { ThemeProvider } from '@material-ui/core'
import Button from '@material-ui/core/Button'
import { BrowserRouter } from 'react-router-dom'
import { PegasusUI } from './Theme'

export const App = () => {
  return (
    <Button variant="contained" color="primary">
      Hello World
    </Button>
  )
}

const AppWrapper = () => {
  return (
    <ThemeProvider theme={PegasusUI}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default AppWrapper
