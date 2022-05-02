import { ACESSORIES, CHARACTERS } from "./sprites"
import { Link } from 'react-router-dom'

const OpenSeaLink = () => {
  const openseaAddress = 'foo'
  return (
    <p>
      Click here to view it on OpenSea
      <span>
        <Link to={openseaAddress} target='_blank' rel='noreferrer'></Link>
      </span>
      . It may take a minute or so to appear.
    </p>
  )
}

export const MintedCharacter = () => {
  // get index from mint
  const charIdx = 1
  const characterImageUrl = `url('${CHARACTERS[charIdx]}')` // TODO: get image a better way
  // get index from minted acessory
  const accIdx = 1
  const acessoryImageUrl = `url('${ACESSORIES[accIdx]}')`
  return (
    <div
      className='minted character'
      style={{ backgroundImage: characterImageUrl }}
    >
      <div
        className={'minted accessory accessory' + charIdx}
        style={{ backgroundImage: acessoryImageUrl }}
      ></div>
      <OpenSeaLink />
    </div>
  )
}
