import { useState, useContext, createContext } from 'react'

interface ILoadingContext {
  isLoading: boolean
  startLoading: (message: string) => void
  stopLoading: () => void
  loadingMessage: string
}

const defaultLoadingContext: ILoadingContext = {
  isLoading: false,
  startLoading: () => {},
  stopLoading: () => {},
  loadingMessage: '',
}

const LoadingContext = createContext(defaultLoadingContext)

const LoadingProvider = ({ children }: IProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [loadingMessage, setLoadingMessage] = useState<string>('')
  const startLoading = (message: string) => {
    setIsLoading(true)
    setLoadingMessage(message)
  }
  const stopLoading = () => {
    setLoadingMessage('')
    setIsLoading(false)
  }
  return (
    <LoadingContext.Provider
      value={{ isLoading, loadingMessage, startLoading, stopLoading }}
    >
      {children}
    </LoadingContext.Provider>
  )
}

const useLoading = () => useContext(LoadingContext)

export { LoadingProvider, useLoading }
