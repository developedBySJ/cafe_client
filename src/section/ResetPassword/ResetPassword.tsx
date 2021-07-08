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
import { useOnErrorNotify } from '../../lib/hooks/useOnErrorNotify'
import { useOnSuccessNotify } from '../../lib/hooks/useOnSuccessNotify'
import { CheckCircle } from 'react-feather'
import { useTheme, Box } from '@material-ui/core'
import { ResetPasswordPayload, RESET_PASSWORD } from '../../lib/api/Mutation/resetPassword'
import { useHistory, useParams } from 'react-router-dom'

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
  password: yup
    .string()
    .min(6, 'Password should be of minimum 8 characters length')
    .max(16, 'Password should be of maximum 16 characters length')
    .required('Password is required'),
})

export const ResetPassword = () => {
  const { wrapper, margin, container, heading, marginTop } = useStyle()
  const theme = useTheme()
  const params = useParams<{ token: string }>()
  const history = useHistory()
  const [isSuccessMsgOpen, setIsSuccessMsgOpen] = useState(false)
  const notifyError = useOnErrorNotify()
  const notifySuccess = useOnSuccessNotify()

  const { data, isLoading, mutate } = useMutation(RESET_PASSWORD)

  const onSubmit = (values: ResetPasswordPayload) => {
    mutate(values, {
      onError: notifyError,
      onSuccess: (data) => {
        setIsSuccessMsgOpen(true)
        notifySuccess('Password Reset Successfully!')
      },
    })
  }

  const formik = useFormik({
    initialValues: {
      password: '',
    },
    validationSchema: validationSchema,
    validateOnBlur: true,
    validateOnChange: true,
    onSubmit: ({ password }) => onSubmit({ password, token: params.token }),
  })

  return (
    <Container maxWidth="sm" className={container}>
      <Paper className={wrapper} elevation={0}>
        {isSuccessMsgOpen ? (
          <>
            <Box textAlign="center">
              <Box
                bgcolor={lighten(theme.palette.success.light, 0.8)}
                padding="1rem 1rem 0.6rem 1rem"
                display="inline-block"
                borderRadius="16px"
                marginBottom="1rem"
              >
                <CheckCircle size="48px" strokeWidth="2px" color={theme.palette.success.main} />
              </Box>
            </Box>
            <Typography variant="h4" align="center">
              Password Reset
            </Typography>
            <Typography variant="body1" align="center" className={marginTop}>
              Your password has been reset successfully
            </Typography>
            <br />
            <Button
              fullWidth
              color="primary"
              variant="contained"
              onClick={() => history.push('/login')}
              className={marginTop}
            >
              Go To Login
            </Button>
          </>
        ) : (
          <>
            <Typography variant="h3" className={heading} align="center">
              Reset Password
            </Typography>
            <form onSubmit={formik.handleSubmit}>
              <TextField
                id="password"
                label="New Password"
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
                disabled={isLoading}
              >
                {isLoading ? 'Loading' : 'Reset Password'}
              </Button>
            </form>
          </>
        )}
      </Paper>
    </Container>
  )
}
