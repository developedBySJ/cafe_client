import {
  Container,
  TextField,
  Button,
  makeStyles,
  Grid,
  Typography,
  useTheme,
  Paper,
} from '@material-ui/core'
import { useFormik } from 'formik'
import { Link } from 'react-router-dom'
import * as yup from 'yup'

const useStyle = makeStyles((theme) => ({
  wrapper: {
    [theme.breakpoints.down('xs')]: {
      padding: '2rem 1rem',
    },
    padding: '4rem 2rem',
    margin: '2rem 0',
    backgroundColor: theme.palette.grey[50],
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
  gridItem: {
    [theme.breakpoints.down('xs')]: {
      paddingBottom: '0 !important',
      paddingTop: '0 !important',
      '&:last-child': {
        marginBottom: '0.5rem',
      },
    },
  },
}))

const validationSchema = yup.object({
  firstName: yup
    .string()
    .min(3, 'First Name should be of minimum 3 characters length')
    .max(64, 'First Name should be of maximum 64 characters length')
    .required('First Name is required'),
  lastName: yup
    .string()
    .min(3, 'Last Name should be of minimum 3 characters length')
    .max(64, 'Last Name should be of maximum 64 characters length'),
  email: yup
    .string()
    .email('Enter valid Email')
    .min(3, 'Email should be of minimum 3 characters length')
    .max(100, 'Email should be of maximum 100 characters length')
    .required('Email is required'),
  password: yup
    .string()
    .min(6, 'Password should be of minimum 6 characters length')
    .max(16, 'Password should be of maximum 16 characters length')
    .required('Password is required'),
})

export const SignUp = () => {
  const { wrapper, margin, container, heading, marginTop, gridItem } = useStyle()
  const theme = useTheme()

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
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
          Sign Up
        </Typography>
        <form onSubmit={formik.handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} className={gridItem}>
              <TextField
                id="firstName"
                label="First Name"
                variant="filled"
                fullWidth
                type="text"
                className={margin}
                onBlur={formik.handleBlur}
                value={formik.values.firstName}
                onChange={formik.handleChange}
                error={formik.touched.firstName && !!formik.errors.firstName}
                helperText={formik.touched.firstName && formik.errors.firstName}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6} className={gridItem}>
              <TextField
                id="lastName"
                label="Last Name"
                variant="filled"
                fullWidth
                type="text"
                className={margin}
                onBlur={formik.handleBlur}
                value={formik.values.lastName}
                onChange={formik.handleChange}
                error={formik.touched.lastName && !!formik.errors.lastName}
                helperText={formik.touched.lastName && formik.errors.lastName}
              />
            </Grid>
          </Grid>
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
          <Button variant="contained" color="primary" size="large" fullWidth className={marginTop}>
            Sign Up
          </Button>
          <Typography color="textSecondary" className={marginTop} align="center">
            Already Have Account ? <Link to="/login">Login</Link>
          </Typography>
        </form>
      </Paper>
    </Container>
  )
}
