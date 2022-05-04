import { useConnection } from './ConnectionProvider'
import { useLoading } from './LoadingProvider'
import { useMint } from './MintProvider'
import { useMoralisWeb3Api } from 'react-moralis'
import { useNavigate } from 'react-router-dom'
import { useState, useContext, createContext, useEffect } from 'react'
import { useToast } from './ToastProvider'
import type { IPlayer, IRawGameObject } from './types'
import { DEFAULT_ACESSORIES, DEFAULT_MECH_SUITS, DEFAULT_WEAPONS } from '../components/shared'
interface IGameContext {
  playerNfts: any[]
  fetchNfts: () => any
  selectedCharacter: Nullable<IRawGameObject>
  selectedAcessory: Nullable<IRawGameObject>
  selectedWeapon: string
  selectedMechSuitColor: string
  setSelectedCharacter: (char: IRawGameObject) => void
  setSelectedAcessory: (ass: IRawGameObject) => void
  setSelectedWeapon: (weap: string) => void
  setSelectedMechSuit: (color: string) => void
  player: Nullable<IPlayer>
  readyToLaunch: boolean
  launchGame: () => void
}

const defaultGameContext: IGameContext = {
  playerNfts: [],
  fetchNfts: () => {},
  selectedCharacter: null,
  selectedAcessory: null,
  selectedWeapon: '',
  selectedMechSuitColor: '',
  setSelectedMechSuit: (color: string) => {},
  setSelectedCharacter: (char: any) => {},
  setSelectedAcessory: (char: any) => {},
  setSelectedWeapon: (weap: string) => {},
  readyToLaunch: false,
  launchGame: () => {},
  player: null,
}

const GameContext = createContext(defaultGameContext)

const GameProvider = ({ children }: IProps) => {
  const [selectedCharacter, setSelectedCharacter] = useState<IRawGameObject>()
  const [selectedAcessory, setSelectedAcessory] = useState<IRawGameObject>()
  const [selectedMechSuit, setSelectedMechSuit] = useState<string>('')
  const [readyToLaunch, setReadyToLaunch] = useState<boolean>(false)
  const [selectedWeapon, setSelectedWeapon] = useState<string>('')
  const [playerNfts, setPlayerNfts] = useState<any[]>([])
  const { startLoading, stopLoading } = useLoading()
  const { isConnected, account } = useConnection()
  const [player, setPlayer] = useState<IPlayer>()
  const { accountDisplayName } = useConnection()
  const { triggerError } = useToast()
  const web3Api = useMoralisWeb3Api()
  const navigate = useNavigate()
  const { minted } = useMint()

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
    navigate('/game')
  }

  useEffect(() => {
    const hasCharacter = !!selectedCharacter?.objectName
    if (hasCharacter) {
      setPlayer({
        displayName: accountDisplayName || 'Anonymous',
        character: selectedCharacter,
        acessory: selectedAcessory || DEFAULT_ACESSORIES[0],
        weapon: selectedWeapon || DEFAULT_WEAPONS[0].objectName,
        mechSuitColor: selectedMechSuit || DEFAULT_MECH_SUITS[0].objectName,
      })
      setReadyToLaunch(true)
      return
    }
    setReadyToLaunch(false)
  }, [
    selectedCharacter,
    selectedAcessory,
    selectedWeapon,
    accountDisplayName,
    selectedMechSuit,
  ])

  useEffect(() => {
    if (isConnected) {
      // fetchNfts()
    }
  }, [isConnected, minted]) // eslint-disable-line

  return (
    <GameContext.Provider
      value={{
        playerNfts,
        fetchNfts,
        selectedCharacter,
        selectedWeapon,
        selectedAcessory,
        selectedMechSuitColor: selectedMechSuit,
        setSelectedMechSuit: setSelectedMechSuit,
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
