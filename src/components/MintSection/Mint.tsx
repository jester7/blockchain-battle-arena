import { CharacterSelection } from './CharacterSelection'
import { AcessorySelection } from './AcessorySelection'
import { MintButtonSection } from './MintButtonSection'
import { MintProvider } from './MintProvider'
import { SectionContainer } from '../shared/SectionContainer'
import styled from 'styled-components'
import { HeaderText } from '../shared/HeaderText'
import { Paragraph } from '../shared/Paragraph'

const MintSection = styled(SectionContainer)`
  max-height: 700px;
`

export const Mint = () => {
  return (
    <MintProvider>
      <MintSection>
        <HeaderText>Select a Character</HeaderText>
        <Paragraph>
          Click on a character you'd like to mint. Minting is free and only costs gas
          payable with fake ETH on the Rinkeby testnet.
        </Paragraph>
        <CharacterSelection />
        <HeaderText>Select an accessory</HeaderText>
        <Paragraph>Click on an accessory you'd like to mint.</Paragraph>
        <AcessorySelection />
        <MintButtonSection />
      </MintSection>
    </MintProvider>
  )
}
