import { useState } from 'react'
import { useEnsAddress, useMoralis } from 'react-moralis'
import { ActionButton } from '../shared'
import styled from 'styled-components'

const ActionText = styled.p`
  margin: 0.25em 0em 0.5em 0em;
`
// FIXME: Clobbered CSS
const ActionSubText = styled.p`
  font-size: 12px;
`
export const MintButtonSection = () => {
  const [isMinting, setIsMinting] = useState<boolean>(false)
  const { account } = useMoralis()
  const { name: ensName } = useEnsAddress(account || '')
  const handleMint = () => {
    setIsMinting(true)
  }
  return (
    <div className='section action-container'>
      <ActionText>{`Connected as ${ensName || account} `}</ActionText>
      <ActionSubText>
        make your selection above to mint a character or accessory then click
        Launch Game to play.
      </ActionSubText>
      <ActionButton text='Mint' disabled={isMinting} onClick={handleMint} />
    </div>
  )
}
