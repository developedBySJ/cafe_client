import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js'
import { FormEvent } from 'react'
import { useMutation, useQuery } from 'react-query'
import { CREATE_CHARGE } from '../api/Mutation/createCharge'

export function usePaymentForm(amount: number, orderId: string) {
  const stripe = useStripe()
  const elements = useElements()
  const pay = useMutation('createCharge', CREATE_CHARGE)
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
