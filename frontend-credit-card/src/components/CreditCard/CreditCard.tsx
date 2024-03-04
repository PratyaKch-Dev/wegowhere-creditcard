import React, { useState, useCallback, useMemo } from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'
import cardValidator from 'card-validator'

interface CreditCardProps {
  holderName: string
  cardNumber: string
  expiration: string
  cvv: string
}

const VISA = require('./images/visa.png')
const MASTERCARD = require('./images/mastercard.png')
const AMEX = require('./images/amex.png')
const DISCOVER = require('./images/discover.png')

const CreditCard = ({ holderName, cardNumber, expiration, cvv }: CreditCardProps) => {
  const [isFlipped, setIsFlipped] = useState(false)

  const { card } = cardValidator.number(cardNumber)

  let cardImageSource
  switch (card?.type) {
    case 'visa':
      cardImageSource = VISA
      break
    case 'mastercard':
      cardImageSource = MASTERCARD
      break
    case 'discover':
      cardImageSource = DISCOVER
      break
    case 'american-express':
      cardImageSource = AMEX
      break
    default:
      break
  }

  const formatCardNumber = useCallback((cardNumber: string) => {
    const visibleDigits = cardNumber.slice(-4)
    const hiddenDigits = '•'.repeat(cardNumber.length - 4)
    return hiddenDigits + visibleDigits
  }, [])

  const renderedCardNumber = useMemo(
    () => formatCardNumber(cardNumber),
    [cardNumber, formatCardNumber]
  )
  return (
    <View style={styles.card}>
      {isFlipped ? (
        // Card Back
        <View style={[styles.cardPart, styles.cardBack]}>
          <View style={styles.blackLine} />
          <View style={styles.backContent}>
            <View style={styles.secret}>
              <Text style={styles.secretLast}>{cvv}</Text>
            </View>
          </View>
        </View>
      ) : (
        // Card Front
        <View style={[styles.cardPart, styles.cardFront]}>
          <Image style={styles.logo} source={cardImageSource} />

          <Text style={styles.cardNumber}>{renderedCardNumber}</Text>
          <View style={styles.space75}>
            <Text style={styles.label}>Card holder</Text>
            <Text style={styles.info}>{holderName}</Text>
          </View>
          <View style={styles.space25}>
            <Text style={styles.label}>Expires</Text>
            <Text style={styles.info}>{expiration}</Text>
          </View>
        </View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  card: {
    width: 320,
    height: 190,
  },
  cardPart: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'flex-start',
    backfaceVisibility: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.26,
    shadowRadius: 20,
    elevation: 5,
    borderWidth: 0.5,
    borderColor: '#f4f0f0',
  },
  cardFront: {
    backgroundColor: '#FFFFFF',
  },
  cardBack: {
    backgroundColor: '#303030',
  },
  square: {
    width: 30,
    height: 30,
    borderRadius: 5,
    backgroundColor: '#303030',
  },
  logo: {
    width: 66,
    height: 21.8,
    position: 'absolute',
    top: 18,
    left: 18,
    backgroundColor: '#fff',
  },
  cardNumber: {
    color: '#808080',
    fontSize: 20,
    paddingLeft: 18,
  },
  space75: {
    position: 'absolute',
    bottom: 40,
    left: 20,
  },
  space25: {
    position: 'absolute',
    bottom: 40,
    right: 20,
  },
  label: {
    fontSize: 10,
    color: '#8F8F8F',
    textTransform: 'uppercase',
  },
  info: {
    fontSize: 16,
    color: '#000000',
    textTransform: 'uppercase',
  },
  blackLine: {
    width: '100%',
    height: 38,
    backgroundColor: '#000',
    position: 'absolute',
    top: 0,
  },
  backContent: {
    position: 'absolute',
    top: 40,
    width: '100%',
    alignItems: 'center',
  },
  secret: {
    width: '100%',
    backgroundColor: '#fff',
    padding: 5,
  },
  secretLast: {
    color: '#303030',
    fontSize: 14,
  },
})

export default CreditCard
