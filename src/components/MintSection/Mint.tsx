import { CHARACTERS, ACESSORIES } from './sprites'
import { HeaderText } from '../shared/HeaderText'
import { ItemsGrid } from './ItemsGrid'
import { MintButton } from './MintButton'
import { MintProvider } from './MintProvider'
import { Paragraph } from '../shared/Paragraph'
import { SectionContainer } from '../shared/SectionContainer'
import styled from 'styled-components'
import { useAuthentication } from '../../providers'

const MintSection = styled(SectionContainer)`
  max-height: 700px;
`

export const Mint = () => {
  const { isConnected } = useAuthentication()
  return (
    <MintProvider>
      <MintSection>
        <HeaderText>
          {isConnected ? 'Select a Character' : 'Characters'}
        </HeaderText>
        <Paragraph>
          {isConnected
            ? "Click on a character you'd like to mint. Minting is free and only costs gas payable with fake ETH on the Rinkeby testnet."
            : 'Please connect your wallet to select an nft'}
        </Paragraph>
        <ItemsGrid items={CHARACTERS} />
        <HeaderText>
          {isConnected ? 'Select an accessory' : 'Acessories'}
        </HeaderText>
        <Paragraph>
          {isConnected
            ? "Click on an accessory you'd like to mint."
            : 'Please connect your wallet to choose an acessory to mint'}
        </Paragraph>
        <ItemsGrid items={ACESSORIES} />
        {isConnected ? <MintButton /> : null}
      </MintSection>
    </MintProvider>
  )
}
