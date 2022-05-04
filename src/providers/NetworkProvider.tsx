import { createContext, useContext, useEffect, useState } from 'react'
import { MoralisContextValue, useMoralis } from 'react-moralis'

const ALLOWED_NETWORKS = {
  1: 'Ethereum Mainnet',
  4: 'Rinkeby Testnet',
}

interface INetworkContext {
  chainId: Nullable<string>
  isAllowedNetwork: boolean
  networkName: string
}

const defaultNetworkContext: INetworkContext = {
  chainId: '',
  isAllowedNetwork: false,
  networkName: 'Not Connected',
}

const NetworkContext = createContext(defaultNetworkContext)

const NetworkProvider = ({ children }: IProps) => {
  const { chainId }: MoralisContextValue = useMoralis()
  const [isAllowedNetwork, setIsAllowedNetwork] = useState<boolean>(false)
  const [networkName, setNetworkName] = useState<string>('')

  useEffect(() => {
    if (chainId) {
      const name = ALLOWED_NETWORKS[chainId]
      const isAllowed = !!ALLOWED_NETWORKS[chainId] || false
      const currentNetworkName = name || 'unknown network'
      setIsAllowedNetwork(isAllowed)
      setNetworkName(currentNetworkName)
    }
  }, [chainId])

  return (
    <NetworkContext.Provider value={{ chainId, isAllowedNetwork, networkName }}>
      {children}
    </NetworkContext.Provider>
  )
}

const useNetwork = () => useContext(NetworkContext)

export { NetworkProvider, useNetwork }
