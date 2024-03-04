import { createStackNavigator } from '@react-navigation/stack'
import { FC } from 'react'
import { View, TouchableOpacity } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { CreditCardListScreen, CreditCardAddScreen, CreditCardDetailScreen } from '~screens'
import { useCallback, useNavigation } from '~hooks'

export const RootStackScreens = {
  CreditCardList: 'CreditCardList',
  CreditCardAdd: 'CreditCardAdd',
  CreditCardDetail: 'CreditCardDetail',
} as const

const { Navigator, Screen } = createStackNavigator<RootStackParamList>()

const RootNavigatorMobile: FC = () => {
  const navigation = useNavigation()

  return (
    <Navigator>
      <Screen
        name={RootStackScreens.CreditCardList}
        component={CreditCardListScreen}
        options={{
          title: 'sign in',
          headerRight: () => (
            <View style={{ paddingRight: 10 }}>
              <TouchableOpacity onPress={() => navigation.navigate(RootStackScreens.CreditCardAdd)}>
                <Ionicons name="add-outline" size={30} color="black" />
              </TouchableOpacity>
            </View>
          ),
        }}
      />
      <Screen
        name={RootStackScreens.CreditCardAdd}
        component={CreditCardAddScreen}
        options={{
          title: '',
        }}
      />
      <Screen
        name={RootStackScreens.CreditCardDetail}
        component={CreditCardDetailScreen}
        options={{
          title: 'Payment',
        }}
      />
    </Navigator>
  )
}

export const RootNavigator = RootNavigatorMobile
