import { useConnection } from './ConnectionProvider'
import { useLoading } from './LoadingProvider'
import { useMoralisWeb3Api } from 'react-moralis'
import { useState, useContext, createContext, useEffect } from 'react'
import { useToast } from './ToastProvider'
import type { IPlayer, IRawGameObject } from './types'

interface IGameContext {
  playerNfts: any[]
  fetchNfts: () => any
  selectedCharacter: Nullable<IRawGameObject>
  selectedAcessory: Nullable<IRawGameObject>
  selectedWeapon: Nullable<IRawGameObject>
  setSelectedCharacter: (char: IRawGameObject) => void
  setSelectedAcessory: (ass: IRawGameObject) => void
  setSelectedWeapon: (weap: IRawGameObject) => void
  player: Nullable<IPlayer>
  readyToLaunch: boolean
  launchGame: () => void
}

const defaultGameContext: IGameContext = {
  playerNfts: [],
  fetchNfts: () => {},
  selectedCharacter: null,
  selectedAcessory: null,
  selectedWeapon: null,
  setSelectedCharacter: (char: any) => {},
  setSelectedAcessory: (char: any) => {},
  setSelectedWeapon: (char: any) => {},
  readyToLaunch: false,
  launchGame: () => {},
  player: null,
}

const GameContext = createContext(defaultGameContext)

const GameProvider = ({ children }: IProps) => {
  const { accountDisplayName } = useConnection()
  const [readyToLaunch, setReadyToLaunch] = useState<boolean>(false)
  const [selectedCharacter, setSelectedCharacter] = useState<IRawGameObject>()
  const [selectedAcessory, setSelectedAcessory] = useState<IRawGameObject>()
  const [selectedWeapon, setSelectedWeapon] = useState<IRawGameObject>()
  const [player, setPlayer] = useState<IPlayer>()
  const [playerNfts, setPlayerNfts] = useState<any[]>([])
  const { startLoading, stopLoading } = useLoading()
  const { isConnected, account } = useConnection()
  const { triggerError } = useToast()
  const web3Api = useMoralisWeb3Api()

  const normalizeResponse = (result: any[]): IRawGameObject[] => {
    return result?.map((item) => {
      const openseaAddress = `https://testnets.opensea.io/assets/${item.token_hash}/${item.token_id}`

      const metadata = JSON.parse(item.metadata)

      return {
        tokenId: item.token_id,
        contractType: item.contract_type,
        contractName: item.name,
        tokenAddress: item.token_address,
        tokenOwner: item.owner_of,
        amount: item.amount,
        symbol: item.symbol,
        tokenUri: item.token_uri,
        objectName: metadata.name,
        objecetDesc: metadata.description,
        objectImageUrl: metadata.url,
        objectType: metadata.object_type,
        openseaAddress,
      }
    })
  }

  const fetchNfts = async () => {
    try {
      startLoading('fetching nfts')
      const { result }: any =
        (await web3Api.account.getNFTs({
          chain: 'rinkeby',
          address: account || '',
          token_addresses: [process.env.REACT_APP_GAME_CONTRACT || ''],
        })) || []
      const nftData = normalizeResponse(result)
      console.log({ result })
      console.log({ nftData })
      setPlayerNfts(nftData)
      stopLoading()
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

  useEffect(() => {
    const hasSelectedItems =
      !!selectedCharacter && !!selectedAcessory && !!selectedWeapon

    if (hasSelectedItems) {
      setPlayer({
        displayName: accountDisplayName || 'Anonymous',
        character: selectedCharacter,
        acessory: selectedAcessory,
        weapon: selectedWeapon,
      })
      setReadyToLaunch(true)
      return
    }
    setReadyToLaunch(false)
  }, [selectedCharacter, selectedAcessory, selectedWeapon, accountDisplayName])

  useEffect(() => {
    if (isConnected) {
      // fetchNfts()
    }
  }, [isConnected]) // eslint-disable-line

  return (
    <GameContext.Provider
      value={{
        playerNfts,
        fetchNfts,
        selectedCharacter,
        selectedWeapon,
        selectedAcessory,
        setSelectedCharacter,
        setSelectedAcessory,
        setSelectedWeapon,
        readyToLaunch,
        launchGame,
        player,
      }}
    >
      {children}
    </GameContext.Provider>
  )
}

const useGame = () => useContext(GameContext)

export { GameProvider, useGame }
