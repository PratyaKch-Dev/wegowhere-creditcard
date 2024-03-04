import { useCallback } from 'react'
import { processPayment, PaymentRequestBody } from '~services/requests/paymentService'

export const usePayment = () => {
  const makePayment = useCallback(async (paymentData: PaymentRequestBody) => {
    try {
      const response = await processPayment(paymentData)
      console.log('responseHooks :: ', response)
      return response
    } catch (error) {
      console.error('Error making payment:', error)
      throw error
    }
  }, [])

  return { makePayment }
}
