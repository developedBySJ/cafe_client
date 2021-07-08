import {
  Container,
  TextField,
  Button,
  makeStyles,
  Typography,
  Paper,
  lighten,
} from '@material-ui/core'
import { useFormik } from 'formik'
import { useState } from 'react'
import { useMutation } from 'react-query'
import * as yup from 'yup'
import { ForgotPasswordPayload, FORGOT_PASSWORD } from '../../lib/api/Mutation/forgotPassword'
import { useOnErrorNotify } from '../../lib/hooks/useOnErrorNotify'
import { useOnSuccessNotify } from '../../lib/hooks/useOnSuccessNotify'
import { Mail } from 'react-feather'
import { useTheme, Box } from '@material-ui/core'

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
})

export const ForgotPassword = () => {
  const { wrapper, margin, container, heading, marginTop } = useStyle()
  const theme = useTheme()
  const [isSuccessOpen, setIsSuccessOpen] = useState(false)

  const notifyError = useOnErrorNotify()
  const notifySuccess = useOnSuccessNotify()

  const { data, isLoading, mutate } = useMutation(FORGOT_PASSWORD)

  const onSubmit = (values: ForgotPasswordPayload) => {
    mutate(values, {
      onError: notifyError,
      onSuccess: (data) => {
        setIsSuccessOpen(true)
      },
    })
  }

  const formik = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema: validationSchema,
    validateOnBlur: true,
    validateOnChange: true,
    onSubmit,
  })

  return (
    <Container maxWidth="sm" className={container}>
      <Paper className={wrapper} elevation={0}>
        {isSuccessOpen ? (
          <>
            <Box textAlign="center">
              <Box
                bgcolor={lighten(theme.palette.primary.light, 0.8)}
                padding="1rem 1rem 0.6rem 1rem"
                display="inline-block"
                borderRadius="16px"
                marginBottom="1rem"
              >
                <Mail size="48px" strokeWidth="2px" color={theme.palette.primary.main} />
              </Box>
            </Box>
            <Typography variant="h4" align="center">
              Check Your Email
            </Typography>
            <Typography variant="body1" className={marginTop} align="center">
              We have sent a password recover <br />
              instruction to your email
            </Typography>
          </>
        ) : (
          <>
            <Typography variant="h3" className={heading} align="center">
              Forgot Password
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
              <Button
                variant="contained"
                color="primary"
                fullWidth
                size="large"
                className={marginTop}
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? 'Loading' : 'Next'}
              </Button>
            </form>
          </>
        )}
      </Paper>
    </Container>
  )
}
