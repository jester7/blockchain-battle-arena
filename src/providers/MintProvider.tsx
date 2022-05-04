import { createContext, useContext, useState } from 'react'
import { IRawGameObject } from './types'
import { useConnection, useToast, useLoading } from '.'
import { useMoralis } from 'react-moralis'
import ContractInterface from './BBGameObject.json'

interface IMintContext {
  minting: boolean
  minted: boolean
  selection: Nullable<IRawGameObject>
  handleSelection: (selection: IRawGameObject) => void
  handleMint: () => void
  confirmMint: boolean
  triggerConfirmMint: (val: boolean) => void
  mintGameObject: () => void
  openseaAddress: string
}

const defaultMintContext: IMintContext = {
  minting: false,
  minted: false,
  selection: null,
  handleSelection: (selection: IRawGameObject) => {},
  handleMint: () => {},
  confirmMint: false,
  triggerConfirmMint: (val: boolean) => {},
  mintGameObject: () => {},
  openseaAddress: '',
}

const MintContext = createContext(defaultMintContext)

const MintProvider = ({ children }: IProps) => {
  const [selection, setSelection] = useState<Nullable<IRawGameObject>>()
  const [openseaAddress, setOpenseaAddress] = useState<string>('')
  const [confirmMint, setConfirmMint] = useState(false)
  const [minting, setMinting] = useState<boolean>(false)
  const [minted, setMinted] = useState<boolean>(false)
  const { triggerError, triggerSuccess } = useToast()
  const { startLoading, stopLoading } = useLoading()
  const { isConnected } = useConnection()
  const { Moralis } = useMoralis()

  const handleSelection = (gameObject: IRawGameObject) => {
    if (isConnected) {
      setSelection(gameObject)
    } else {
      setSelection(null)
    }
  }

  const triggerConfirmMint = (val: boolean) => {
    setConfirmMint(val)
  }

  const handleMint = () => {
    if (!selection) {
      triggerError('You must make a selection')
      setSelection(null)
      return
    } else {
      triggerConfirmMint(true)
    }
  }
  const mintGameObject = async (): Promise<void> => {
    try {
      startLoading('minting nft...')
      setMinting(true)

      const provider = await Moralis.enableWeb3()
      const ethers = Moralis.web3Library

      const contract = new ethers.Contract(
        process.env.REACT_APP_GAME_CONTRACT || '',
        ContractInterface.abi,
        provider.getSigner()
      )

      const tx = await contract.mintGameObject(
        selection?.objectName,
        selection?.objectDesc,
        selection?.objectImageUrl,
        selection?.objectType
      )

      const receipt = await tx.wait()
      const tokenId = receipt.events[1].args[1]
      console.log({ receipt })

      const openseaAddress = `https://testnets.opensea.io/assets/${receipt.transactionHash}/${tokenId}`
      console.log({ openseaAddress })
      setOpenseaAddress(openseaAddress)
      setMinted(true)
      setSelection(null)
      stopLoading()
      triggerConfirmMint(false)
      triggerSuccess(`Minted!\nView on Opensea!\n${openseaAddress}`)
    } catch (err: any) {
      console.error(err)
      triggerConfirmMint(false)
      triggerError('There was an error minting your nft.')
      stopLoading()
      setSelection(null)
    }
  }

  return (
    <MintContext.Provider
      value={{
        minting,
        minted,
        handleMint,
        selection,
        handleSelection,
        confirmMint: confirmMint,
        triggerConfirmMint: triggerConfirmMint,
        mintGameObject,
        openseaAddress,
      }}
    >
      {children}
    </MintContext.Provider>
  )
}

const useMint = () => useContext(MintContext)

export { MintProvider, useMint }
