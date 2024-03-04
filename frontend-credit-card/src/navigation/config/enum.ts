type Keys<T> = keyof T
export const keys = <T extends object>(object: T) => Object.keys(object) as (keyof T)[]

// Root_SCREENS
export const RootStackScreens = {
  CreditCardList: 'CreditCardList',
  CreditCardAdd: 'CreditCardAdd',
  CreditCardDetail: 'CreditCardDetail',
} as const
