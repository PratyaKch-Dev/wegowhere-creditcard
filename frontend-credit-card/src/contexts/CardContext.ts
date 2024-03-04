import { createContext, useContext, Context } from 'react'

export interface CreditCardProps {
  holderName: string
  cardNumber: string
  expiration: string
  cvv: string
}

export interface CardContextType {
  cards: CreditCardProps[]
  addCard: (card: CreditCardProps) => void
  removeCard: (cardNumber: string) => void
  updateCard: (cardNumber: string, updatedCard: CreditCardProps) => void
}

export namespace CardContext {
  export const Context = createContext<CardContextType | undefined>(undefined)
  export type ProviderType = typeof Context.Provider
}

export const useCardContext = () => {
  const context = useContext(CardContext.Context)
  if (!context) {
    throw new Error('useCardContext must be used within a CardProvider')
  }
  return context
}
