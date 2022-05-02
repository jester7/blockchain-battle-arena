import { createContext, useContext, useState } from 'react'
import { useConnection, useToast, useLoading } from '.'
import { useMoralis } from 'react-moralis'
import ContractInterface from './BBGameObject.json'
import type { IMintable } from '../components/MintSection/sprites'

interface IMintContext {
  minting: boolean
  openseaAddress: string
  minted: boolean
  selections: (IMintable | null)[]
  handleSelection: (selection: IMintable) => void
  handleMint: () => void
  confirmModalOpen: boolean
  triggerConfirmModal: any
  mintGameObject: () => void
}

const defaultMintContext: IMintContext = {
  minting: false,
  openseaAddress: '',
  minted: false,
  selections: [null, null],
  handleSelection: (selection: IMintable) => {},
  handleMint: () => {},
  confirmModalOpen: false,
  triggerConfirmModal: () => {},
  mintGameObject: () => {},
}

const MintContext = createContext(defaultMintContext)

const MintProvider = ({ children }: IProps) => {
  const [openseaAddress, setOpenseaAddress] = useState<string>('')
  const [selections, setSelections] = useState<(IMintable | null)[]>([
    null,
    null,
  ])
  const [confirmModalOpen, setConfirmModal] = useState(false)
  const [minting, setMinting] = useState<boolean>(false)
  const [minted, setMinted] = useState<boolean>(false)
  const { triggerError, triggerSuccess } = useToast()
  const { startLoading, stopLoading } = useLoading()
  const { isConnected } = useConnection()
  const { Moralis } = useMoralis()

  const handleSelection = (gameObject: IMintable) => {
    if (isConnected) {
      if (gameObject.type === 'character') {
        const same = gameObject.name === selections[0]?.name
        const selectionsToSet = [same ? null : gameObject, selections[1]]
        setSelections(selectionsToSet)
      } else if (gameObject.type === 'acessory') {
        const same = gameObject.name === selections[1]?.name
        const selectionsToSet = [selections[0], same ? null : gameObject]
        setSelections(selectionsToSet)
      } else {
        triggerError('unknown game object type')
      }
    }
  }

  const triggerConfirmModal = () => {
    setConfirmModal(!confirmModalOpen)
  }

  const handleMint = () => {
    const hasSelection = selections.length !== 0
    if (!hasSelection) {
      triggerError('You must make a selection')
      return
    }
    triggerConfirmModal()
    mintGameObject()
  }

  const mintGameObject = async (): Promise<void> => {
    try {
      triggerConfirmModal()
      if (isConnected) {
        if (!selections[0] || !selections[1]) {
          triggerError("You haven't selected anything to mint")
          return
        } else {
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
            selections[0].name,
            selections[0].description,
            selections[0].url,
            selections[1].name,
            selections[1].url
          )

          const receipt = await tx.wait()
          setMinted(true)

          const { transactionHash, token_id } = receipt
          console.log({ receipt })

          const nftAddress = `https://testnets.opensea.io/assets/${transactionHash}/${token_id}`
          setOpenseaAddress(nftAddress)

          setSelections([])
          stopLoading()
          triggerSuccess(
            `Minted! ${tx.hash}\nPlease wait a few min for the tx to settle`
          )
        }
      }
    } catch (err: any) {
      console.error(err)
      triggerError('There was an error minting your nft.')
      stopLoading()
      setSelections([])
    }
  }

  return (
    <MintContext.Provider
      value={{
        minting,
        openseaAddress,
        minted,
        handleMint,
        selections,
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
