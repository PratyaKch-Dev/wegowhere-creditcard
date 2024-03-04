import React from 'react'
import { StyleSheet, View, Text, FlatList, TouchableOpacity } from 'react-native'
import CreditCard from '~components/CreditCard'
import { useCallback, useNavigation } from '~hooks'
import { useCard } from '~hooks'
import { CreditCardProps } from '~contexts/CardContext'

export const CreditCardListScreen = (): JSX.Element => {
  const { navigate } = useNavigation()
  const { cards } = useCard()

  const navigateToSignUp = useCallback(() => navigate('CreditCardAdd'), [navigate])

  const navigateToCreditCardDetail = useCallback(
    (cardData: CreditCardProps) => {
      navigate('CreditCardDetail', { cardData })
    },
    [navigate]
  )

  const generateKey = (item: CreditCardProps, index: number) => `card_${index}`

  const ItemSeparator = () => <View style={{ height: 20 }} />

  const EmptyListComponent = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyHeader}>💳</Text>
      <Text style={styles.emptyTitle}>No Cards Found</Text>
      <Text style={styles.emptySubtitle}>{`We recommend adding a card\nfor easy payment`}</Text>
      <TouchableOpacity style={styles.addButton} onPress={navigateToSignUp}>
        <Text style={styles.addButtonText}>Add New Card</Text>
      </TouchableOpacity>
    </View>
  )

  return (
    <View style={styles.container}>
      <FlatList
        data={cards}
        keyExtractor={generateKey}
        ItemSeparatorComponent={ItemSeparator}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => navigateToCreditCardDetail(item)}>
            <CreditCard
              holderName={item.holderName}
              cardNumber={item.cardNumber}
              expiration={item.expiration}
              cvv={item.cvv}
            />
          </TouchableOpacity>
        )}
        ListEmptyComponent={EmptyListComponent}
        contentContainerStyle={cards.length === 0 ? styles.emptyListContainer : null}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  fullScreenContainer: {
    flex: 1,
  },
  emptyListContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyHeader: {
    fontSize: 40,
    marginBottom: 17,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '400',
    marginBottom: 14,
  },
  emptySubtitle: {
    fontSize: 18,
    textAlign: 'center',
    fontWeight: '400',
    marginBottom: 13,
  },
  addButton: {},
  addButtonText: {
    color: '#4AD8DA',
    fontSize: 18,
    fontWeight: '500',
  },
})
