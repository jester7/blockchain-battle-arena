import { createContext, useContext, useState } from 'react'
import { useMoralis, useWeb3ExecuteFunction } from 'react-moralis'
import { useConnection, useToast, useLoading } from '.'
import type { IMintable } from '../components/MintSection/sprites'
import ContractInterface from './BBGameObject.json'
interface IMintContext {
  minting: boolean
  openseaAddress: string
  minted: boolean
  selections: IMintable[]
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
  selections: [],
  handleSelection: (selection: IMintable) => {},
  handleMint: () => {},
  confirmModalOpen: false,
  triggerConfirmModal: () => {},
  mintGameObject: () => {},
}

const MintContext = createContext(defaultMintContext)

const MintProvider = ({ children }: IProps) => {
  const { triggerError, triggerSuccess } = useToast()
  const { startLoading, stopLoading } = useLoading()
  const [minting, setMinting] = useState<boolean>(false)
  const [minted, setMinted] = useState<boolean>(false)
  const [confirmModalOpen, setConfirmModal] = useState(false)
  const [selections, setSelections] = useState<IMintable[]>([])
  const [openseaAddress, setOpenseaAddress] = useState<string>('')
  const { isConnected } = useConnection()
  const { Moralis } = useMoralis()
  const { fetch: sendMintTx, data: mintTxData } = useWeb3ExecuteFunction()

  const handleSelection = (selection: IMintable) => {
    if (isConnected) {
      const alreadyHave: boolean =
        selections.findIndex((item) => item.name === selection.name) >= 0
      if (alreadyHave) {
        const removed = selections.filter(
          (item) => item.name !== selection.name
        )
        setSelections(removed)
        return
      } else {
        // we dont already have one
        setSelections([...selections, selection])
      }
    }
  }

  const triggerConfirmModal = () => {
    setConfirmModal(!confirmModalOpen)
  }
  const _sendMintTx = async (character: IMintable, acessory: IMintable) => {
    const NFT_CONTRACT = '0x98D537973d607F7370B16c4D091a9f4865775721'
    const sendOptions = {
      contractAddress: NFT_CONTRACT,
      functionName: 'mintGameObject',
      abi: ContractInterface.abi,
      params: {
        name: character.name,
        desc: character.description,
        url: character.url,
        acessoryName: acessory.name,
        acessoryUrl: acessory.url,
      },
    }
    // await sendMintTx(sendOptions)
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
        if (selections.length === 0) {
          triggerError("You haven't selected anything to mint")
          return
        } else {
          triggerError('')

          const character = selections?.filter(
            (obj) => obj.type === 'character'
          )
          const acessory = selections?.filter((obj) => obj.type === 'acessory')

          if (character.length !== 1 || acessory.length !== 1) {
            triggerError('Select one character and one acessory')
            stopLoading()
            return
          }
          startLoading('minting nft...')
          setMinting(true)

          await _sendMintTx(character[0], acessory[0])
          console.log({ mintTxData })
        //   setSelections([])
        //   stopLoading()
        //   triggerSuccess(
        //     `Minted! ${tx.hash}\nPlease wait a few min for the tx to settle`
        //   )
        }

        // const mintAddress = ''
        // const tokenId = 0
        // const nftAddress = `https://testnets.opensea.io/assets/${mintAddress}/${tokenId}`
        // setOpenseaAddress(nftAddress)
        // setMinted(true)
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
