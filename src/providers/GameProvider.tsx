import { useConnection } from './ConnectionProvider'
import { useLoading } from './LoadingProvider'
import { useMoralisWeb3Api } from 'react-moralis'
import { useState, useContext, createContext, useEffect } from 'react'
import { useToast } from './ToastProvider'

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
  launchGame: () => {},
}

const GameContext = createContext(defaultGameContext)

const GameProvider = ({ children }: IProps) => {
  const [readyToLaunch, setReadyToLaunch] = useState<boolean>(false)
  const [selectedNft, setSelectedNft] = useState<Nullable<INft>>(null)
  const [playerNfts, setPlayerNfts] = useState<INft[]>([])
  const { startLoading, stopLoading } = useLoading()
  const { isConnected, account } = useConnection()
  const { triggerError } = useToast()
  const web3Api = useMoralisWeb3Api()

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
        const displayableNfts = nfts?.filter((nft) => {
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

  const launchGame = () => {
    if (!readyToLaunch) {
      triggerError('you must select a player')
      return
    }
  }

  const handleSelection = (nft: INft) => {
    setSelectedNft(nft)
  }

  useEffect(() => {
    const hasSelected = Object.values(selectedNft || {}).length !== 0
    if (hasSelected) {
      setReadyToLaunch(true)
      return
    }
    setReadyToLaunch(false)
  }, [selectedNft])

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
