import { Box, Button, Container, makeStyles, Typography } from '@material-ui/core'
import { FormikValues, useFormik } from 'formik'
import { Redirect, useHistory, useLocation } from 'react-router'
import {
  NumberInput,
  TextAreaInput,
  TextInput,
} from '../../../../lib/components/EditResource/components'
import * as yup from 'yup'
import { useOnErrorNotify, useOnSuccessNotify } from '../../../../lib/hooks'
import { useMutation, useQuery } from 'react-query'
import { GET_ORDER_DETAIL } from '../../../../lib/api/query/orderDetail'
import {
  CreateCashPaymentPayload,
  CREATE_CASH_PAYMENT,
} from '../../../../lib/api/Mutation/createPayment'

const useStyles = makeStyles((theme) => ({
  mb: {
    marginBottom: '1rem',
  },
}))

const validationSchema = yup.object({
  amount: yup.number().required().min(1),
  orderId: yup.string().required().uuid(),
  description: yup.string().min(3),
})

export const PaymentCreate = () => {
  const location = useLocation()
  const q = new URLSearchParams(location.search)
  const orderId = q.get('order')

  const classes = useStyles()
  const history = useHistory()
  const notifyError = useOnErrorNotify()
  const notifySuccess = useOnSuccessNotify()

  const cashPayment = useMutation(CREATE_CASH_PAYMENT)

  const formik = useFormik({
    initialValues: {
      amount: 0,
      description: `Payment for Order #${orderId || ''}`,
      orderId: orderId || '',
    } as FormikValues,
    onSubmit: (values) => {
      cashPayment.mutate({ ...values, amount: values.amount * 100 } as CreateCashPaymentPayload, {
        onSuccess: (data) => {
          notifySuccess(`Payment created successfully`)
          history.push(`/orders/${values.orderId}/invoice`)
        },
        onError: () => notifyError('Something Went Wrong While Making Payment!'),
      })
    },
    validationSchema,
  })

  const { data, isLoading } = useQuery(
    ['getOrderDetails', formik.values.orderId],
    (params) => (!formik.errors.orderId ? GET_ORDER_DETAIL(params.queryKey[1]) : undefined),
    {
      enabled: !!(orderId?.length && !formik.errors.orderId),
      onSuccess: (data) => {
        notifySuccess('Order Found!')
        formik.setFieldValue('amount', data?.data?.total)
      },
      retry: 1,
      onError: (error) => {
        notifyError(error)
        formik.setFieldValue('amount', 0)
      },
    },
  )

  const orderDetails = data?.data

  if (orderDetails && orderDetails.payment) {
    notifyError('Order Already Paid!')
    return <Redirect to="/orders" />
  }

  return (
    <Box style={{ ...(isLoading && { opacity: 0.5, pointerEvents: 'none' }) }}>
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Typography variant="h5" className={classes.mb} gutterBottom>
          Create cash payment
        </Typography>
      </Box>
      <form onSubmit={formik.handleSubmit}>
        <NumberInput
          formik={formik}
          id="amount"
          label="Amount"
          required
          className={classes.mb}
          min={1}
        />
        <TextAreaInput
          formik={formik}
          id="description"
          label="Description"
          className={classes.mb}
        />
        <TextInput formik={formik} id="orderId" label="Order Id" required className={classes.mb} />
        <Button variant="contained" color="primary" type="submit" size="large" disabled={isLoading}>
          Submit
        </Button>
      </form>
    </Box>
  )
}
