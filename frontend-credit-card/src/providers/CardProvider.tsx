import React, { FC, PropsWithChildren, useCallback, useState } from 'react'
import { CardContext, CreditCardProps, CardContextType } from '~contexts/CardContext'

export const CardProvider: FC<PropsWithChildren<{}>> = ({ children }) => {
  const [cards, setCards] = useState<CreditCardProps[]>([])

  const addCard = useCallback((card: CreditCardProps) => {
    setCards((prevCards) => [...prevCards, card])
  }, [])

  const removeCard = useCallback((cardNumber: string) => {
    setCards((prevCards) => prevCards.filter((card) => card.cardNumber !== cardNumber))
  }, [])

  const updateCard = useCallback((cardNumber: string, updatedCard: CreditCardProps) => {
    setCards((prevCards) =>
      prevCards.map((card) => (card.cardNumber === cardNumber ? updatedCard : card))
    )
  }, [])

  const value: CardContextType = {
    cards,
    addCard,
    removeCard,
    updateCard,
  }

  return <CardContext.Context.Provider value={value}>{children}</CardContext.Context.Provider>
}
