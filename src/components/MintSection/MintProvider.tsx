import { createContext, useContext, useState } from 'react'
// import { useMoralis } from 'react-moralis'
import { useAuthentication, useError, useLoading } from '../../providers'
import type { IMintable } from './sprites'

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
  const { setError } = useError()
  const { startLoading, stopLoading } = useLoading()
  const [minting, setMinting] = useState<boolean>(false)
  const [minted, setMinted] = useState<boolean>(false)
  const [selections, setSelections] = useState<IMintable[]>([])
  const [openseaAddress, setOpenseaAddress] = useState<string>('')
  const { isConnected } = useAuthentication()
  // const { Moralis } = useMoralis()

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

  const handleMint = (selections: IMintable[]): void => {
    if (isConnected) {
      if (selections.length === 0) {
        setError("You haven't selected anything to mint")
        return
      } else {
        // const ethers = Moralis.web3Library
        setError('')
        startLoading('minting nft...')
        setMinting(true)
        ///
        stopLoading()
      }
      setMinting(true)
      const mintAddress = ''
      const tokenId = 0
      const nftAddress = `https://testnets.opensea.io/assets/${mintAddress}/${tokenId}`
      setOpenseaAddress(nftAddress)
      setMinted(true)
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
