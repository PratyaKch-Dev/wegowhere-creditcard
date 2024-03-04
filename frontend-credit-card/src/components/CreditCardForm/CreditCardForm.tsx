import React, { useRef, useState, useEffect, forwardRef, useImperativeHandle } from 'react'
import { StyleSheet, View, Image } from 'react-native'
import { cardNumberFormatter, expirationDateFormatter } from '~/utils/formatters'
import CardIcon from '~components/CardIcon'

import FormTextField from '~components/FormTextField'
import { useForm, FormProvider, SubmitHandler } from 'react-hook-form'
import cardValidator from 'card-validator'

const secure_payment = require('./images/secure_payment.png')

export interface FormModel {
  holderName: string
  cardNumber: string
  expiration: string
  cvv: string
}
export interface CreditCardFormMethods {
  submitForm: () => void
}

const CreditCardForm = forwardRef<CreditCardFormMethods, { onSubmit: SubmitHandler<FormModel> }>(
  (props, ref) => {
    const { onSubmit } = props

    const formMethods = useForm<FormModel>({
      defaultValues: {
        holderName: '',
        cardNumber: '',
        expiration: '',
        cvv: '',
      },
    })
    useImperativeHandle(ref, () => ({
      submitForm: () => formMethods.handleSubmit(onSubmit)(),
    }))

    return (
      <View style={styles.container}>
        <FormProvider {...formMethods}>
          <FormTextField
            style={styles.textField}
            title={'ATM/Debit/Credit card number'}
            name="cardNumber"
            label="0000 0000 0000 0000"
            keyboardType="number-pad"
            maxLength={19}
            rules={{
              required: 'Card number is required.',
              validate: {
                isValid: (value: string) => {
                  return cardValidator.number(value).isValid || 'This card number looks invalid.'
                },
              },
            }}
            endEnhancer={<CardIcon cardNumber={formMethods.getValues('cardNumber')} />}
            formatter={cardNumberFormatter}
          />
          <FormTextField
            title={'Name on Card'}
            style={styles.textField}
            name="holderName"
            label="Ty Lee"
            rules={{
              required: 'Cardholder name is required.',
              validate: {
                isValid: (value: string) => {
                  return (
                    cardValidator.cardholderName(value).isValid || 'Cardholder name looks invalid.'
                  )
                },
              },
            }}
          />

          <View style={styles.row}>
            <FormTextField
              title={'Expiry date'}
              style={[
                styles.textField,
                {
                  marginRight: 24,
                },
              ]}
              name="expiration"
              label="MM/YY"
              rules={{
                required: 'Expiration date is required.',
                validate: {
                  isValid: (value: string) => {
                    return (
                      cardValidator.expirationDate(value).isValid ||
                      'This expiration date looks invalid.'
                    )
                  },
                },
              }}
              formatter={expirationDateFormatter}
            />
            <FormTextField
              title={'CVV'}
              style={styles.textField}
              name="cvv"
              label=""
              keyboardType="number-pad"
              maxLength={4}
              rules={{
                required: 'Security code is required.',
                validate: {
                  isValid: (value: string) => {
                    const cardNumber = formMethods.getValues('cardNumber')
                    const { card } = cardValidator.number(cardNumber)
                    const cvvLength = card?.type === 'american-express' ? 4 : 3
                    return (
                      cardValidator.cvv(value, cvvLength).isValid ||
                      'This security code looks invalid.'
                    )
                  },
                },
              }}
            />
          </View>
          <View style={styles.imageContainer}>
            <Image style={styles.image} source={secure_payment} />
          </View>
        </FormProvider>
      </View>
    )
  }
)
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    marginBottom: 40,
  },
  textField: {
    flex: 1,
    marginTop: 24,
  },
  floatingButton: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  image: {
    width: 191,
    height: 21,
    resizeMode: 'contain',
  },
})
export default CreditCardForm
