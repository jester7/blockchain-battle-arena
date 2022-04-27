import { createContext, useContext, useState } from 'react'

const defaultMintContext = {
  minting: false,
  openseaAddress: '',
  handleMint: () => {},
}

const MintContext = createContext(defaultMintContext)

const MintProvider = ({ children }: IProps) => {
  const [minting, setMinting] = useState<boolean>(false)
  const [openseaAddress, setOpenseaAddress] = useState('')
  const handleMint = () => {
    const tokenId = 'from mint'
    const mintAddress = 'from mint'
    setMinting(true)
    const nftAddress = `https://testnets.opensea.io/assets/${mintAddress}/${tokenId}`
    setOpenseaAddress(nftAddress)
  }

  return (
    <MintContext.Provider
      value={{
        minting,
        openseaAddress,
        handleMint,
      }}
    >
      {children}
    </MintContext.Provider>
  )
}

const useMint = () => useContext(MintContext)

export { MintProvider, useMint }
