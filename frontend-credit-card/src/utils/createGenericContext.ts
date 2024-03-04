import { createContext, useContext } from 'react'

export const createGenericContext = <T>(contextName: string) => {
  const genericContext = createContext<T | undefined>(undefined)

  const useGenericContext = () => {
    const contextIsDefined = useContext(genericContext)
    if (!contextIsDefined) {
      throw new Error(`${contextName} context must be used within a ${contextName} Provider`)
    }
    return contextIsDefined
  }

  return [useGenericContext, genericContext.Provider] as const
}

export default createGenericContext
