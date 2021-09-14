import { SnackbarProvider } from 'notistack'
import React from 'react'
import ReactDOM from 'react-dom'
import App, { useSnackBarStyles } from './App'

const AppWithSnackbar = () => {
  const classes = useSnackBarStyles()
  return (
    <SnackbarProvider autoHideDuration={3000} preventDuplicate classes={classes}>
      <App />
    </SnackbarProvider>
  )
}

ReactDOM.render(
  <React.StrictMode>
    <AppWithSnackbar />
  </React.StrictMode>,
  document.getElementById('root'),
)
