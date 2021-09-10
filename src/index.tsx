import { SnackbarProvider } from 'notistack'
import React from 'react'
import ReactDOM from 'react-dom'
import App, { useSnackBarStyles } from './App'
import reportWebVitals from './reportWebVitals'

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

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
