import { createContext, useContext, useEffect, useRef } from 'react'
import { MoralisContextValue, useMoralis } from 'react-moralis'
import { toast } from 'react-toastify'

interface IToastContext {
  triggerError: (message: string) => void
  triggerSuccess: (message: string) => void
}

const defaultErrorContext: IToastContext = {
  triggerError: () => {},
  triggerSuccess: () => {},
}

const ToastContext = createContext(defaultErrorContext)

const ToastProvider = ({ children }: IProps) => {
  const toastId = useRef('')
  const {
    userError,
    authError,
    isWeb3EnableLoading,
    web3EnableError,
  }: MoralisContextValue = useMoralis()

  const triggerError = (message: string) => {
    if (!message) return
    if (!toast.isActive(toastId.current)) {
      toast.error(message, {
        toastId: message,
        position: 'top-center',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      })
    }
  }

  const triggerSuccess = (message: string) => {
    if (!message) return
    if (!toast.isActive(toastId.current)) {
      toast.success(message, {
        toastId: message,
        position: 'top-center',
        autoClose: 3000,
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
  }, [userError, authError, web3EnableError, isWeb3EnableLoading])
  return (
    <ToastContext.Provider value={{ triggerSuccess, triggerError }}>
      {children}
    </ToastContext.Provider>
  )
}

const useToast = () => useContext(ToastContext)

export { ToastProvider, useToast }
