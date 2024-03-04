import { StatusBar } from 'expo-status-bar'
import { StyleSheet, Text, View } from 'react-native'
import { Navigation } from '~navigation'
import { Providers } from '~providers'

const App = (): JSX.Element => {
  return (
    <Providers>
      <Navigation />
    </Providers>
  )
}

export default App

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})
