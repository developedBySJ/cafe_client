import { Container, TextField, Button, makeStyles, Typography, Paper } from '@material-ui/core'
import { useFormik } from 'formik'
import { useMutation } from 'react-query'
import { Link } from 'react-router-dom'
import * as yup from 'yup'
import { LOGIN } from '../../lib/api/Mutation'
import { LoginPayload } from '../../lib/api/Mutation/login'
import { useOnErrorNotify } from '../../lib/hooks/useOnErrorNotify'
import { useOnSuccessNotify } from '../../lib/hooks/useOnSuccessNotify'

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

export const Login = () => {
  const { wrapper, margin, container, heading, marginTop } = useStyle()

  const notifyError = useOnErrorNotify()
  const notifySuccess = useOnSuccessNotify()

  const { data, isLoading, mutate } = useMutation(LOGIN)

  const onSubmit = (values: LoginPayload) => {
    mutate(values, {
      onError: notifyError,
      onSuccess: (data) => {
        notifySuccess('Login Successfully')
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
