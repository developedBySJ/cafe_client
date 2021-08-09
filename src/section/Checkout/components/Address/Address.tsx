import {
  Button,
  Container,
  Grid,
  InputBase,
  InputLabel,
  makeStyles,
  Typography,
  FormHelperText,
} from '@material-ui/core'
import { useFormik } from 'formik'
import React from 'react'
import { useHistory } from 'react-router-dom'
import * as yup from 'yup'

const useStyle = makeStyles((theme) => ({
  margin: {
    margin: '0.5rem 0',
  },
  heading: {
    margin: '2.5rem 0 3rem 0',
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
  inputBase: {
    padding: '1rem',
    margin: '0.5rem 0',
  },
  inputLabel: { fontWeight: 450, marginTop: '1.5rem' },

  marginTop: {
    marginTop: '1.5rem',
  },
}))

const validationSchema = yup.object({
  address: yup
    .string()
    .min(3, 'Address should be of minimum 3 characters length')
    .max(200, 'Address should be of maximum 200 characters length')
    .required('Address is required'),
  notes: yup
    .string()
    .min(3, 'Delivery Instruction should be of minimum 3 characters length')
    .max(100, 'Delivery Instruction should be of maximum 100 characters length'),
})

interface InitialState {
  address: string
  notes?: string
}

interface AddressProps {
  initialValues: InitialState
  onSubmit: (args: InitialState) => void
}

export const Address: React.FC<AddressProps> = ({ onSubmit, initialValues }) => {
  const classes = useStyle()
  const history = useHistory()
  const formik = useFormik({
    initialValues,
    validationSchema: validationSchema,
    validateOnBlur: true,
    validateOnChange: true,
    onSubmit,
  })

  return (
    <Container maxWidth="md">
      <Typography variant="h4" align="center" className={classes.heading}>
        Address
      </Typography>
      <form onSubmit={formik.handleSubmit}>
        <InputLabel className={classes.inputLabel} required>
          Complete Delivery Address
        </InputLabel>
        <InputBase
          id="address"
          multiline
          rows={3}
          fullWidth
          type="text"
          className={classes.inputBase}
          onBlur={formik.handleBlur}
          value={formik.values.address}
          onChange={formik.handleChange}
          error={formik.touched.address && !!formik.errors.address}
          required
        />
        {formik.errors.address && <FormHelperText error>{formik.errors.address}</FormHelperText>}
        <InputLabel style={{ fontWeight: 450 }} className={classes.inputLabel}>
          Delivery Instructions
        </InputLabel>
        <InputBase
          id="notes"
          multiline
          rows={3}
          fullWidth
          type="text"
          className={classes.inputBase}
          onBlur={formik.handleBlur}
          value={formik.values.notes}
          onChange={formik.handleChange}
          error={formik.touched.notes && !!formik.errors.notes}
        />
        {formik.errors.notes && <FormHelperText error>{formik.errors.notes}</FormHelperText>}
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Button
              fullWidth
              size="large"
              className={classes.marginTop}
              onClick={() => history.push('/cart')}
            >
              Prev
            </Button>
          </Grid>
          <Grid item xs={6}>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              size="large"
              className={classes.marginTop}
              type="submit"
            >
              Next
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  )
}
