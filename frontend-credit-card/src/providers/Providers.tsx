import { ReactNode } from 'react'
import { StyleSheet } from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { CardProvider } from './CardProvider'

export const Providers = ({ children }: { children: ReactNode }): JSX.Element => {
  return (
    <GestureHandlerRootView style={styles.gestureHandlerRootView}>
      <CardProvider>{children}</CardProvider>
    </GestureHandlerRootView>
  )
}

const styles = StyleSheet.create({
  gestureHandlerRootView: {
    flex: 1,
  },
})
