import { MoralisContextValue, useMoralis } from 'react-moralis'
import { createContext, useContext, useEffect, useRef, useState } from 'react'
import { toast } from 'react-toastify'

interface IErrorContext {
  error: string
  triggerError: (message: string) => void
  setError: (message: string) => void
}

const defaultErrorContext: IErrorContext = {
  error: '',
  triggerError: () => {},
  setError: () => {},
}

const ErrorContext = createContext(defaultErrorContext)

const ErrorProvider = ({ children }: IProps) => {
  const [error, setError] = useState<string>('')
  const toastId = useRef('')
  const {
    userError,
    authError,
    isWeb3EnableLoading,
    web3EnableError,
  }: MoralisContextValue = useMoralis()

  const triggerError = (message: string) => {
    if (!message) return
    setError(message)
    if (!toast.isActive(toastId.current)) {
      toast.error(message, {
        toastId: message,
        position: 'top-center',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      })
    }

  }

  useEffect(() => {
    if (web3EnableError) {
      triggerError('There was an error enabling web3')
    }
    if (userError) {
      triggerError('A user error occurred')
    }
    if (authError) {
      triggerError('There was an error authenticating')
    }
  }, [error, userError, authError, web3EnableError, isWeb3EnableLoading])
  return (
    <ErrorContext.Provider value={{ error, setError, triggerError }}>
      {children}
    </ErrorContext.Provider>
  )
}

const useError = () => useContext(ErrorContext)

export { ErrorProvider, useError }
