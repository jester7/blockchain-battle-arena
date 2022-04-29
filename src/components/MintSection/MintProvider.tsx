import { createContext, useContext, useState } from 'react'
import type { ICharacter } from './sprites'

const defaultMintContext = {
  minting: false,
  openseaAddress: '',
  minted: false,
  handleMint: (character: ICharacter) => {},
}

const MintContext = createContext(defaultMintContext)

const MintProvider = ({ children }: IProps) => {
  const [minting, setMinting] = useState<boolean>(false)
  const [minted, setMinted] = useState<boolean>(false)
  const [openseaAddress, setOpenseaAddress] = useState<string>('')

  const handleMint = (CHARACTER: ICharacter) => {
    setMinting(true)
    const mintAddress = ''
    const tokenId = 0
    const nftAddress = `https://testnets.opensea.io/assets/${mintAddress}/${tokenId}`
    setOpenseaAddress(nftAddress)
    setMinted(true)
  }

  return (
    <MintContext.Provider
      value={{
        minting,
        openseaAddress,
        minted,
        handleMint,
      }}
    >
      {children}
    </MintContext.Provider>
  )
}

const useMint = () => useContext(MintContext)

export { MintProvider, useMint }
