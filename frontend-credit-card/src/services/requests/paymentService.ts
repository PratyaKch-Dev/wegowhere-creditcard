import { apiClient } from '../api'

export interface PaymentRequestBody {
  name: string
  number: string
  expiration_month: number
  expiration_year: number
  city: string
  postal_code: string
  security_code: string
  amount: number
  currency: string
  autoCapture: boolean
}

export interface PaymentDataObject {
  object: string
  totalAmount: number
  net: number
  totalFee: number
}

export interface PaymentResponseData {
  isSuccess: boolean
  data: PaymentDataObject
}

export const processPayment = async (
  paymentData: PaymentRequestBody
): Promise<PaymentResponseData> => {
  try {
    const response = await apiClient.post<PaymentResponseData>(
      '/payment/processPayment',
      paymentData
    )
    return response.data
  } catch (error) {
    console.error('Error processing payment:', error)
    throw error
  }
}
