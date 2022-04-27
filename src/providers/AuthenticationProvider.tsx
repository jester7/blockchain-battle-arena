import { createContext, useContext, useEffect, useState } from 'react'
import { MoralisContextValue, useEnsAddress, useMoralis } from 'react-moralis'

interface IConnectionContext {
  isConnected: boolean
  account: Nullable<string>
  accountDisplayName: Nullable<string>
}

const defaultAuthenticationContext: IConnectionContext = {
  isConnected: false,
  account: '',
  accountDisplayName: '',
}

const AuthenticationContext = createContext(defaultAuthenticationContext)

const AuthenticationProvider = ({ children }: IProps) => {
  const {
    isAuthenticated,
    isWeb3Enabled,
    account,
    isWeb3EnableLoading,
  }: MoralisContextValue = useMoralis()
  const [isConnected, setIsConnected] = useState<boolean>(false)
  const [accountDisplayName, setAccountDisplayName] = useState<string>('')
  const { name: ensName } = useEnsAddress(account || '')
  const isCompletelyConnected: boolean =
    isAuthenticated && !isWeb3Enabled && !isWeb3EnableLoading

  const _formatDisplayName = () => {
    if (ensName) {
      setAccountDisplayName(ensName)
    } else {
      const shortAccountDisplay = `${account?.substring(
        5,
        account.length - 1
      )}...`
      setAccountDisplayName(shortAccountDisplay)
    }
  }

  useEffect(() => {
    if (isCompletelyConnected) {
      _formatDisplayName()
      setIsConnected(true)
    } else {
      setIsConnected(false)
    }
  }, [isWeb3Enabled, isAuthenticated, account]) // eslint-disable-line
  return (
    <AuthenticationContext.Provider
      value={{ isConnected, account, accountDisplayName }}
    >
      {children}
    </AuthenticationContext.Provider>
  )
}

const useAuthentication = () => useContext(AuthenticationContext)

export { useAuthentication, AuthenticationProvider }
