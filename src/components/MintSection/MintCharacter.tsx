import { Character } from './Character'
import { CHARACTERS } from './nfts'

export const MintCharacter = () => {
  const mintCharacter = () => {}
  return (
    <>
      <h1>Mint a character</h1>
      <p>
        Click on a character to mint it. Minting is free and only costs gas
        payable with fake ETH on the Rinkeby testnet.
      </p>
      <div className='nft-container'>
        {CHARACTERS?.map((character) => (
          <Character {...character} handleMint={mintCharacter} />
        ))}
      </div>
    </>
  )
}
