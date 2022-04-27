import { Acessory } from "./Acessory"
import { ACESSORIES } from "./nfts"

export const MintAcessory = () => {
  const mintAccessory = () => {
  }
  return (
    <>
      <h3>Mint an accessory</h3>
      <p>Click on an accessory to mint it.</p>
      <div className='nft-container'>
        {ACESSORIES?.map(({ id, idx }) => (
          <Acessory id={id} idx={idx} handleMint={mintAccessory} />
        ))}
      </div>
    </>
  )
}
