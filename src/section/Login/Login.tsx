import {
  Container,
  TextField,
  Button,
  makeStyles,
  Typography,
  Paper,
  CircularProgress,
  Box,
} from '@material-ui/core'
import { useFormik } from 'formik'
import React, { useState } from 'react'
import { useMutation } from 'react-query'
import { Link, Redirect, useHistory } from 'react-router-dom'
import * as yup from 'yup'
import { Spinner } from '../../lib'
import { LOGIN } from '../../lib/api/Mutation'
import { LoginPayload } from '../../lib/api/Mutation/login'
import { useOnErrorNotify } from '../../lib/hooks/useOnErrorNotify'
import { useOnSuccessNotify } from '../../lib/hooks/useOnSuccessNotify'
import { Viewer } from '../../lib/types/viewer'

const useStyle = makeStyles((theme) => ({
  wrapper: {
    padding: '4rem 2rem',
    margin: '2rem 0',
    backgroundColor: theme.palette.grey[50],
    [theme.breakpoints.down('xs')]: {
      padding: '2rem 1rem',
    },
  },
  margin: {
    margin: '0.5rem 0',
  },
  heading: {
    marginBottom: '2.5rem',
  },
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '80vh',
    minHeight: '300px',
    flexDirection: 'column',
    [theme.breakpoints.down('xs')]: {
      padding: 0,
    },
  },
  marginTop: {
    marginTop: '1.5rem',
  },
}))

const validationSchema = yup.object({
  email: yup
    .string()
    .email('Enter valid Email')
    .min(3, 'Email should be of minimum 3 characters length')
    .max(100, 'Email should be of maximum 100 characters length')
    .required('Email is required'),
  password: yup
    .string()
    .min(6, 'Password should be of minimum 8 characters length')
    .max(16, 'Password should be of maximum 16 characters length')
    .required('Password is required'),
})

interface LoginProps {
  viewer: Viewer
  setViewer: (viewer: Viewer) => void
}

export const Login: React.FC<LoginProps> = ({ viewer, setViewer }) => {
  const { wrapper, margin, container, heading, marginTop } = useStyle()

  const history = useHistory()

  const notifyError = useOnErrorNotify()
  const notifySuccess = useOnSuccessNotify()

  const { data, isLoading, mutate } = useMutation(LOGIN)
  const [showSpinner, setShowSpinner] = useState(false)
  const onSubmit = (values: LoginPayload) => {
    mutate(values, {
      onError: notifyError,
      onSuccess: ({ data }) => {
        notifySuccess(`Welcome ${data.firstName} `)
        setViewer(data)
        setShowSpinner(true)
        setTimeout(() => history.push('/'), 1000)
      },
    })
  }

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: validationSchema,
    validateOnBlur: true,
    validateOnChange: true,
    onSubmit,
  })

  if (viewer?.didRequest && viewer?.id) {
    return <Redirect to="/" />
  }
  if (showSpinner) {
    return (
      <Box height="80vh">
        <Spinner size={52} label="Redirecting To Home" fullWidth />
      </Box>
    )
  }

  return (
    <Container maxWidth="sm" className={container}>
      <Paper className={wrapper} elevation={0}>
        <Typography variant="h3" className={heading} align="center">
          Log in
        </Typography>
        <form onSubmit={formik.handleSubmit}>
          <TextField
            id="email"
            label="Email"
            variant="filled"
            fullWidth
            type="email"
            className={margin}
            onBlur={formik.handleBlur}
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched.email && !!formik.errors.email}
            helperText={formik.touched.email && formik.errors.email}
            required
          />
          <TextField
            id="password"
            label="Password"
            variant="filled"
            fullWidth
            type="password"
            className={margin}
            onBlur={formik.handleBlur}
            value={formik.values.password}
            onChange={formik.handleChange}
            error={formik.touched.password && !!formik.errors.password}
            helperText={formik.touched.password && formik.errors.password}
            required
          />
          <Typography color="textSecondary" className={margin} align="right">
            <Link to="/forgot-password">Forgot Password?</Link>
          </Typography>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            size="large"
            className={marginTop}
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? 'Loading' : 'Login'}
          </Button>
        </form>
        <Typography color="textSecondary" className={marginTop} align="center">
          Don't Have Account ? <Link to="/signup">Sign Up</Link>
        </Typography>
      </Paper>
    </Container>
  )
}
