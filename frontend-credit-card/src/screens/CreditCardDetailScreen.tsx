import React, { useCallback, useMemo, useState, useEffect } from 'react'
import {
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native'
import { RouteProp, useRoute } from '@react-navigation/native'
import { usePayment } from '~hooks/usePayment'
import { PaymentDataObject } from '~services/requests/paymentService'

interface CreditCardProps {
  holderName: string
  cardNumber: string
  expiration: string
  cvv: string
}

type CreditCardDetailRouteProp = RouteProp<
  { CreditCardDetail: { cardData: CreditCardProps } },
  'CreditCardDetail'
>

export const CreditCardDetailScreen = (): JSX.Element => {
  const route = useRoute<CreditCardDetailRouteProp>()
  const { cardData } = route.params
  const [randomPayment, setRandomPayment] = useState<number | null>(null)
  const [paymentResponse, setPaymentResponse] = useState<PaymentDataObject | null>(null)

  const formatCardNumber = useCallback((cardNumber: string) => {
    const visibleDigits = cardNumber.slice(-4)
    const hiddenDigits = '•'.repeat(cardNumber.length - 4)
    return hiddenDigits + visibleDigits
  }, [])

  const renderedCardNumber = useMemo(
    () => formatCardNumber(cardData.cardNumber),
    [cardData.cardNumber, formatCardNumber]
  )

  const { makePayment } = usePayment()
  const [loading, setLoading] = useState(false)
  const [paymentSuccess, setPaymentSuccess] = useState(false)
  const [paymentError, setPaymentError] = useState<string | null>(null)

  const handleMakePayment = useCallback(async () => {
    if (loading) return
    try {
      setLoading(true)
      setPaymentSuccess(false)
      setPaymentError(null)
      const currentYear = new Date().getFullYear()
      const twoDigitYear = parseInt(cardData.expiration.split('/')[1])
      const century = Math.floor(currentYear / 100) * 100
      const fullYear = century + twoDigitYear
      const cleanCardNumber = cardData.cardNumber.replace(/\s/g, '').toString()

      const paymentData = {
        name: cardData.holderName,
        number: cleanCardNumber,
        expiration_month: parseInt(cardData.expiration.split('/')[0]),
        expiration_year: fullYear,
        city: 'Bangkok',
        postal_code: '10240',
        security_code: cardData.cvv,
        amount: randomPayment,
        currency: 'thb',
        autoCapture: true,
      }
      const response = await makePayment(paymentData)
      console.log('Payment response:', response)
      setPaymentSuccess(true)
      setPaymentResponse(response)
    } catch (error) {
      console.error('Error making payment:', error)
      setPaymentError('Error processing payment. Please try again.')
    } finally {
      setLoading(false)
    }
  }, [cardData, makePayment, loading, randomPayment])

  useEffect(() => {
    const generateRandomPayment = () => {
      const min = 20
      const max = 999
      return Math.floor(Math.random() * (max - min + 1)) + min
    }
    setRandomPayment(generateRandomPayment())
  }, [])

  return (
    <KeyboardAvoidingView
      style={styles.screenContainer}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}
    >
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        <View style={styles.content}>
          <Text>{`Holder Name: ${cardData.holderName}`}</Text>
          <Text>{`Card Number: ${renderedCardNumber}`}</Text>
          <Text>{`Expiration: ${cardData.expiration}`}</Text>
          <Text>{`CVV: ***`}</Text>
          <Text style={styles.randomPaymentText}>{`Payment Amount: \n${randomPayment} ฿`}</Text>
          {!paymentSuccess && (
            <TouchableOpacity
              style={styles.paymentButton}
              onPress={handleMakePayment}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color="white" />
              ) : (
                <Text style={styles.paymentButtonText}>Make Payment</Text>
              )}
            </TouchableOpacity>
          )}

          {paymentSuccess && <Text style={styles.successMessage}>Payment Successful!</Text>}
          {paymentSuccess && (
            <View style={styles.paymentDetails}>
              <Text style={styles.paymentDetailLabel}>Payment Details:</Text>
              <Text>{`Net: ${paymentResponse?.net}`}</Text>
              <Text>{`Total Amount: ${paymentResponse?.totalAmount}`}</Text>
              <Text>{`Total Fee: ${paymentResponse?.totalFee}`}</Text>
            </View>
          )}
          {paymentError && <Text style={styles.errorMessage}>{paymentError}</Text>}
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
  },
  scrollViewContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    paddingHorizontal: 36,
    alignItems: 'center',
  },
  randomPaymentText: {
    fontSize: 24,
    textAlign: 'center',
    marginTop: 20,
  },
  paymentButton: {
    marginTop: 20,
    backgroundColor: '#4AD8DA',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  paymentButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  successMessage: {
    marginTop: 10,
    color: 'green',
    fontWeight: 'bold',
  },
  paymentDetails: {
    marginTop: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 8,
  },
  paymentDetailLabel: {
    fontWeight: 'bold',
    marginBottom: 10,
  },
  errorMessage: {
    marginTop: 10,
    color: 'red',
    fontWeight: 'bold',
  },
})

export default CreditCardDetailScreen
