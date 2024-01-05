import { createContext, useCallback, useContext, useState, useMemo, type FC } from 'react'
import { ROUTES } from '../../constants'

interface IStoreContext {
  currentPage: string
  changePage: (page: string) => void
}

const StoreContext = createContext<IStoreContext | undefined>(undefined)

const StoreProvider: FC<any> = ({ children }) => {
  const [currentPage, setCurrentPage] = useState<string>(ROUTES.MAIN)

  const changePage = useCallback((page: string) => {
    setCurrentPage(page)
  }, [])

  const value = useMemo(
    () => ({
      currentPage,
      changePage
    }),
    [currentPage, changePage]
  )

  return (
    <StoreContext.Provider value={value}>
      {children}
    </StoreContext.Provider>
  )
}

const useStore = () => {
  const context = useContext(StoreContext)
  if (context === undefined) {
    throw new Error('useStore must be used within a Provider')
  }
  return context
}

export { StoreContext, StoreProvider, useStore }
