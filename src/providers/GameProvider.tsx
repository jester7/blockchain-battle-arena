import { useState, useContext, createContext } from 'react'
import { useMoralisWeb3Api } from 'react-moralis'
import { useConnection } from './ConnectionProvider'
import { useToast } from './ToastProvider'
import { useLoading } from './LoadingProvider'

interface IGameContext {
  playerNfts: any[]
  fetchNfts: () => any
  selectedNft: Nullable<INft>
  handleSelection: (nft: INft) => void
  readyToLaunch: boolean
  launchGame: () => void
}

interface INft {
  name: string
  token_id: string
  metadata: string
  token_uri: string
}

const defaultGameContext: IGameContext = {
  playerNfts: [],
  fetchNfts: () => {},
  selectedNft: null,
  handleSelection: (nft: INft) => {},
  readyToLaunch: false,
  launchGame: () => {}
}

const GameContext = createContext(defaultGameContext)

const GameProvider = ({ children }: IProps) => {
  const { isConnected, account } = useConnection()
  const [selectedNft, setSelectedNft] = useState<Nullable<INft>>(null)
  const { startLoading, stopLoading } = useLoading()
  const { triggerError } = useToast()
  const web3Api = useMoralisWeb3Api()
  const [playerNfts, setPlayerNfts] = useState<INft[]>([])

  const readyToLaunch = true
  // const readyToLaunch = Object.values(selectedNft || {}).length !== 0

  const launchGame = () => {
    fetchNfts()
  }
  const fetchNfts = async () => {
    try {
      if (isConnected) {
        startLoading('fetching nfts')
        const { result } = await web3Api.account.getNFTs({
          chain: 'rinkeby',
          address: account || '',
        })
        const nfts: INft[] =
          result?.map((nft) => ({
            name: nft.name || '',
            metadata: '',
            token_id: '',
            token_uri: '',
          })) || []
        const displayableNfts = nfts?.filter(nft => {
          const { name, token_id } = nft
          return name && token_id
        })
        console.log({ nfts })
        setPlayerNfts(displayableNfts)
        stopLoading()
      } else {
        triggerError('You need to connect your wallet first')
      }
    } catch (e) {
      console.error(e)
      triggerError('There was an error fetching your nfts!')
    }
  }

  const handleSelection = (nft: INft) => {
    setSelectedNft(nft)
  }

  return (
    <GameContext.Provider
      value={{
        playerNfts,
        fetchNfts,
        selectedNft,
        handleSelection,
        readyToLaunch,
        launchGame,
      }}
    >
      {children}
    </GameContext.Provider>
  )
}

const useGame = () => useContext(GameContext)

export { GameProvider, useGame }
