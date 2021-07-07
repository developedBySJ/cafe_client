import {
  Container,
  TextField,
  Button,
  makeStyles,
  Typography,
  useTheme,
  Paper,
} from '@material-ui/core'
import { useFormik } from 'formik'
import { Link } from 'react-router-dom'
import * as yup from 'yup'

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
  const theme = useTheme()
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: validationSchema,
    validateOnBlur: true,
    validateOnChange: true,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2))
    },
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
          <Button
            variant="contained"
            color="primary"
            fullWidth
            size="large"
            className={marginTop}
            type="submit"
          >
            Login
          </Button>
        </form>
        <Typography color="textSecondary" className={marginTop} align="center">
          Don't Have Account ? <Link to="/signup">Sign Up</Link>
        </Typography>
      </Paper>
    </Container>
  )
}
