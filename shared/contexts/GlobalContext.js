import React, { useState, useEffect, useContext, createContext } from 'react'

const GlobalContext = createContext({
  loading: {},
})

export const useGlobal = () => {
  return useContext(GlobalContext)
}

export function GlobalProvider({ children }) {
  const [isLoading, setLoading] = useState(false)

  const startLoading = () => { setLoading(true) }
  const stopLoading = () => { setLoading(false) }

  return (
    <GlobalContext.Provider value={{
      loading: { isChecked: isLoading, start: startLoading, stop: stopLoading },
    }}>{children}
    </GlobalContext.Provider>
  )
}