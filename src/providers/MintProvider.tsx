import { createContext, useContext, useState } from 'react'
import { useConnection, useToast, useLoading } from '.'
import { useMoralis } from 'react-moralis'
import ContractInterface from './BBGameObject.json'
import type { IMintable } from '../components/MintSection/sprites'

interface IMintContext {
  minting: boolean
  minted: boolean
  selection: Nullable<IMintable>
  handleSelection: (selection: IMintable) => void
  handleMint: () => void
  confirmModalOpen: boolean
  triggerConfirmModal: (val: boolean) => void
  mintGameObject: () => void
}

const defaultMintContext: IMintContext = {
  minting: false,
  minted: false,
  selection: null,
  handleSelection: (selection: IMintable) => {},
  handleMint: () => {},
  confirmModalOpen: false,
  triggerConfirmModal: (val: boolean) => {},
  mintGameObject: () => {},
}

const MintContext = createContext(defaultMintContext)

const MintProvider = ({ children }: IProps) => {
  const [selection, setSelection] = useState<Nullable<IMintable>>()
  const [confirmModalOpen, setConfirmModal] = useState(false)
  const [minting, setMinting] = useState<boolean>(false)
  const [minted, setMinted] = useState<boolean>(false)
  const { triggerError, triggerSuccess } = useToast()
  const { startLoading, stopLoading } = useLoading()
  const { isConnected } = useConnection()
  const { Moralis } = useMoralis()

  const handleSelection = (gameObject: IMintable) => {
    if (isConnected) {
      setSelection(gameObject)
    } else {
      setSelection(null)
    }
  }

  const triggerConfirmModal = (val: boolean) => {
    setConfirmModal(val)
  }

  const handleMint = () => {
    if (!selection) {
      triggerError('You must make a selection')
      setSelection(null)
      return
    } else {
      triggerConfirmModal(true)
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
        selection?.name,
        selection?.description,
        selection?.url,
        selection?.type
      )

      const receipt = await tx.wait()
      console.log({ receipt })
      setMinted(true)
      setSelection(null)
      stopLoading()
      triggerSuccess(
        `Minted!\nhash:${tx.hash}`
      )
    } catch (err: any) {
      console.error(err)
      triggerConfirmModal(false)
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
        confirmModalOpen,
        triggerConfirmModal,
        mintGameObject,
      }}
    >
      {children}
    </MintContext.Provider>
  )
}

const useMint = () => useContext(MintContext)

export { MintProvider, useMint }
