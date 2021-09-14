import {
  Container,
  Typography,
  Avatar,
  Button,
  Box,
  makeStyles,
  TextField,
} from '@material-ui/core'
import { useFormik } from 'formik'
import { useMutation } from 'react-query'

import { PrivateRouteComponent } from '../../../../lib'
import { UPDATE_USERS } from '../../../../lib/api/Mutation/updateUser'
import { DateInput } from '../../../../lib/components/EditResource/components'
import { useOnErrorNotify, useOnSuccessNotify } from '../../../../lib/hooks'

const useStyles = makeStyles((theme) => ({
  margin: {
    marginBottom: '1rem',
  },
  avatar: {
    width: '128px',
    height: '128px',
    margin: '0 auto',
  },
}))

export const AccountDetails: PrivateRouteComponent = ({ viewer: { total, ...initialValues } }) => {
  const classes = useStyles()
  const notifySuccess = useOnSuccessNotify()
  const notifyError = useOnErrorNotify()

  const updateUser = useMutation(UPDATE_USERS, {
    onSuccess: () => notifySuccess('User updated successfully'),
    onError: notifyError,
  })

  const formik = useFormik({
    initialValues,
    onSubmit: (values) => {
      const id = values?.id
      if (id) {
        updateUser.mutate({ id, ...values })
      }
    },
  })

  return (
    <Container style={{ marginTop: '2rem' }}>
      <Typography variant="h4" gutterBottom>
        Account Details{' '}
      </Typography>
      <Container maxWidth="sm" style={{ marginTop: '2rem', padding: 0 }}>
        <Box margin="2rem 0">
          <Avatar className={classes.avatar} src={formik.values.avatar} />
        </Box>
        <form onSubmit={formik.handleSubmit}>
          <TextField
            id="email"
            label="Email"
            variant="filled"
            fullWidth
            type="email"
            className={classes.margin}
            value={formik.values.email}
            disabled
          />
          <TextField
            id="firstName"
            label="First Name"
            variant="filled"
            fullWidth
            type="text"
            className={classes.margin}
            onBlur={formik.handleBlur}
            value={formik.values.firstName}
            onChange={formik.handleChange}
            error={formik.touched.firstName && !!formik.errors.firstName}
            helperText={formik.touched.firstName && formik.errors.firstName}
            required
          />
          <TextField
            id="lastName"
            label="Last Name"
            variant="filled"
            fullWidth
            type="text"
            className={classes.margin}
            onBlur={formik.handleBlur}
            value={formik.values.lastName}
            onChange={formik.handleChange}
            error={formik.touched.lastName && !!formik.errors.lastName}
            helperText={formik.touched.lastName && formik.errors.lastName}
          />
          <DateInput
            formik={formik}
            id="dateOfBirth"
            label="Birth Date"
            className={classes.margin}
          />
          <TextField
            id="address"
            label="Address"
            variant="filled"
            fullWidth
            type="date"
            multiline
            rows={3}
            className={classes.margin}
            onBlur={formik.handleBlur}
            value={formik.values.address}
            onChange={formik.handleChange}
            error={formik.touched.address && !!formik.errors.address}
            helperText={formik.touched.address && formik.errors.address}
          />
          <Button variant="contained" color="primary" size="large" fullWidth type="submit">
            Update
          </Button>
        </form>
      </Container>
    </Container>
  )
}
