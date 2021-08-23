import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js'
import { FormEvent } from 'react'
import { useMutation, useQuery } from 'react-query'
import { CREATE_CHARGE } from '../api/Mutation/createCharge'

interface Options<T> {
  onSuccess?: (data: T) => void
  onError?: (error: any) => void
}
export function usePaymentForm(
  amount: number,
  orderId: string,
  { onError, onSuccess }: Options<unknown> = {},
) {
  const stripe = useStripe()
  const elements = useElements()
  const pay = useMutation('createCharge', CREATE_CHARGE, {
    onSuccess,
    onError,
  })
  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()

    const amountToCharge = amount * 100

    const cardElement = elements?.getElement(CardElement)

    if (!stripe || !elements || !cardElement) {
      return
    }

    const stripeResponse = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
    })

    const { error, paymentMethod } = stripeResponse

    if (error || !paymentMethod) {
      return
    }

    const paymentMethodId = paymentMethod.id

    return pay.mutate({ amount: amountToCharge, orderId, paymentMethodId })
  }
  return {
    handleSubmit,
    data: pay,
  }
}
