import { useNavigation } from '@react-navigation/native'
import { useEffect } from 'react'

export const usePreventGoBack = (shouldPrevent = true): void => {
  const navigation = useNavigation()

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const callback = (event: any) => {
      if (!shouldPrevent) {
        return
      }

      event?.preventDefault()
    }

    navigation.addListener('beforeRemove', callback)

    return () => navigation.removeListener('beforeRemove', callback)
  }, [navigation, shouldPrevent])
}
