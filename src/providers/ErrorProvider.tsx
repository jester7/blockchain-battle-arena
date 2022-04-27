import { MoralisContextValue, useMoralis } from 'react-moralis'
import { createContext, useContext, useEffect, useState } from 'react'

interface IErrorContext {
  error: string
  setError: (message: string) => void
}

const defaultErrorContext: IErrorContext = {
  error: '',
  setError: () => {},
}

const ErrorContext = createContext(defaultErrorContext)

const ErrorProvider = ({ children }: IProps) => {
  const [error, setError] = useState<string>('')
  const {
    userError,
    authError,
    isWeb3EnableLoading,
    web3EnableError,
  }: MoralisContextValue = useMoralis()

  useEffect(() => {
    if (isWeb3EnableLoading) {
      setError('')
    }
    if (web3EnableError) {
      setError('There was an error enabling web3')
    }
    if (userError) {
      setError('A user error occurred')
    }
    if (authError) {
      setError('There was an error authenticating')
    }
    if (!!error) {
      setError(error)
    }
  }, [error, userError, authError, web3EnableError, isWeb3EnableLoading])
  return (
    <ErrorContext.Provider value={{ error, setError }}>
      {children}
    </ErrorContext.Provider>
  )
}

const useError = () => useContext(ErrorContext)

export { ErrorProvider, useError }
