type RootStackParamList = {
  CreditCardAdd: undefined
  CreditCardList: undefined
  CreditCardDetail: { cardData: CreditCardProps }
}

namespace ReactNavigation {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface RootParamList extends RootStackParamList {}
}
