import { createContext, useContext, useState } from 'react'
import { useMoralis } from 'react-moralis'
import { useConnection, useError, useLoading } from '.'
import type { IMintable } from '../components/MintSection/sprites'
import ContractInterface from '../game/util/BattleArenaNFT.json'
interface IMintContext {
  minting: boolean
  openseaAddress: string
  minted: boolean
  selections: IMintable[]
  handleSelection: (selection: IMintable) => void
  handleMint: (selections: IMintable[]) => void
}

const defaultMintContext: IMintContext = {
  minting: false,
  openseaAddress: '',
  minted: false,
  selections: [],
  handleSelection: (selection: IMintable) => {},
  handleMint: (selections: IMintable[]) => {},
}

const MintContext = createContext(defaultMintContext)

const MintProvider = ({ children }: IProps) => {
  const { triggerError } = useError()
  const { startLoading, stopLoading } = useLoading()
  const [minting, setMinting] = useState<boolean>(false)
  const [minted, setMinted] = useState<boolean>(false)
  const [selections, setSelections] = useState<IMintable[]>([])
  const [openseaAddress, setOpenseaAddress] = useState<string>('')
  const { isConnected } = useConnection()
  const { Moralis } = useMoralis()

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
  const NFT_CONTRACT = '0xaF39928783ae90B0893D2D09E492729590DfE9E1'
  const handleMint = async (selections: IMintable[]): Promise<void> => {
    try {
      if (isConnected) {
        if (selections.length === 0) {
          triggerError("You haven't selected anything to mint")
          return
        } else {
          const ethers = Moralis.web3Library
          triggerError('')
          startLoading('minting nft...')
          setMinting(true)

          const contract = new ethers.Contract(
            NFT_CONTRACT,
            ContractInterface.abi,
            ethers.getDefaultProvider()
          )

          const tx = await contract.minCharacter()
          const receipt = await tx.wait()
          console.log({ receipt })
          stopLoading()
        }
        setMinting(true)
        const mintAddress = ''
        const tokenId = 0
        const nftAddress = `https://testnets.opensea.io/assets/${mintAddress}/${tokenId}`
        setOpenseaAddress(nftAddress)
        setMinted(true)
      }
    } catch (err: any) {
      console.error(err?.message)
      triggerError('There was an error minting your nft.')
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
      }}
    >
      {children}
    </MintContext.Provider>
  )
}

const useMint = () => useContext(MintContext)

export { MintProvider, useMint }
