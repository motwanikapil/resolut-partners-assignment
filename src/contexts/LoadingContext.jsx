import React, { createContext, useContext, useState } from 'react'

const LoadingContext = createContext()

export default function LoadingProvider({ children }) {
  const [isLoading, setIsLoading] = useState(false)

  return (
    <LoadingContext.Provider value={{ isLoading, setIsLoading }}>
      {children}
    </LoadingContext.Provider>
  )
}

function useLoader() {
  const context = useContext(LoadingContext)
  if (!context) {
    throw new Error('LoadingContext is used outside LoadingProvider')
  }
  return context
}

export { LoadingProvider, useLoader }
