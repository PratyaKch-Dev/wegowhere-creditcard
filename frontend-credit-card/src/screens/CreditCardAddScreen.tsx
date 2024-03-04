import React, { useRef } from 'react'
import { StyleSheet, View, ScrollView, KeyboardAvoidingView, Platform } from 'react-native'
import Button from '~components/Button'
import CreditCardForm, { CreditCardFormMethods, FormModel } from '~components/CreditCardForm'
import { SubmitHandler } from 'react-hook-form'
import { useCard } from '~hooks'
import { usePreventGoBack } from '~hooks'
import { useNavigation } from '@react-navigation/native'
import { useCallback } from 'react'

export const CreditCardAddScreen = (): JSX.Element => {
  const formRef = useRef<CreditCardFormMethods>(null)
  const { addCard } = useCard()
  const { goBack } = useNavigation()

  const handleFormSubmit = useCallback<SubmitHandler<FormModel>>(
    async (data) => {
      console.log('Form data received in CreditCardAddScreen:', data)
      addCard(data)
      goBack()
    },
    [addCard, goBack]
  )

  return (
    <KeyboardAvoidingView
      style={styles.screenContainer}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}
    >
      <ScrollView contentContainerStyle={styles.content}>
        <CreditCardForm ref={formRef} onSubmit={handleFormSubmit} />
      </ScrollView>
      <View style={styles.buttonContainer}>
        <Button
          title="Add Card"
          onPress={() => formRef.current?.submitForm()}
          style={{ backgroundColor: '#4AD8DA', height: 45, borderRadius: 30 }}
          textStyle={{ fontSize: 16, color: '#FFFFFF', fontWeight: '700' }}
        />
      </View>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 36,
  },
  buttonContainer: {
    paddingHorizontal: 36,
    paddingBottom: 20,
  },
})
