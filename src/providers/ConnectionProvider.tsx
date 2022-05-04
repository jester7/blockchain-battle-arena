import { createContext, useContext, useEffect, useState } from 'react'
import { MoralisContextValue, useEnsAddress, useMoralis } from 'react-moralis'

interface IConnectionContext {
  isConnected: boolean
  account: Nullable<string>
  accountDisplayName: Nullable<string>
  isConnecting: boolean
}

const defaultAuthenticationContext: IConnectionContext = {
  isConnected: false,
  account: '',
  accountDisplayName: '',
  isConnecting: false,
}

const AuthenticationContext = createContext(defaultAuthenticationContext)

const ConnectionProvider = ({ children }: IProps) => {
  const {
    isAuthenticated,
    isWeb3Enabled,
    account,
    isWeb3EnableLoading,
    isUserUpdating,
    isAuthenticating,
    isInitializing,
    enableWeb3,
  }: MoralisContextValue = useMoralis()
  const [isConnected, setIsConnected] = useState<boolean>(false)
  const [isConnecting, setIsConnecting] = useState<boolean>(false)
  const [accountDisplayName, setAccountDisplayName] = useState<string>('')
  const { name: ensName } = useEnsAddress(account || '')

  const _formatDisplayName = () => {
    if (ensName) {
      return ensName
    } else {
      const shortAccountDisplay = `${account?.substring(0, 8)}...`
      return shortAccountDisplay
    }
  }

  useEffect(() => {
    const shouldEnableWeb3 = isAuthenticated && !isWeb3Enabled && !account

    if (shouldEnableWeb3) {
      enableWeb3()
    }
  }, [isAuthenticated, isWeb3Enabled]) // eslint-disable-line

  useEffect(() => {
    const isCompletelyConnected: boolean = isAuthenticated && isWeb3Enabled
    if (isCompletelyConnected) {
      const displayName = _formatDisplayName()
      setIsConnected(true)
      setAccountDisplayName(displayName)
    } else {
      setAccountDisplayName('')
      setIsConnected(false)
    }
  }, [isWeb3Enabled, isAuthenticated, account]) // eslint-disable-line

  useEffect(() => {
    const connecting =
      isUserUpdating ||
      isAuthenticating ||
      isInitializing ||
      isWeb3EnableLoading
    if (connecting) {
      setIsConnecting(true)
      return
    }
    setIsConnecting(false)
  }, [isUserUpdating, isAuthenticating, isInitializing, isWeb3EnableLoading])

  return (
    <AuthenticationContext.Provider
      value={{ isConnected, account, accountDisplayName, isConnecting }}
    >
      {children}
    </AuthenticationContext.Provider>
  )
}

const useConnection = () => useContext(AuthenticationContext)

export { useConnection, ConnectionProvider }
