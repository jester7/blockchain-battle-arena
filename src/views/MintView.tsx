import { MintButton, ItemsGrid } from '../components/MintSection'
import { MintProvider, useConnection } from '../providers'
import {
  DEFAULT_ACESSORIES,
  DEFAULT_CHARACTERS,
  HeaderText,
  Paragraph,
  SectionContainer,
} from '../components/shared'

export const MintView = () => {
  const { isConnected } = useConnection()
  return (
    <MintProvider>
      <>
        <SectionContainer>
          <HeaderText>
            {isConnected ? 'Select a Character' : 'Characters'}
          </HeaderText>
          <Paragraph>
            {isConnected
              ? "Click on a character you'd like to mint. Minting is free and only costs gas payable with fake ETH on the Rinkeby testnet."
              : 'Please connect your wallet to select an nft'}
          </Paragraph>
          <ItemsGrid items={DEFAULT_CHARACTERS} />
          <HeaderText>
            {isConnected ? 'Select an accessory' : 'Acessories'}
          </HeaderText>
          <Paragraph>
            {isConnected
              ? "Click on an accessory you'd like to mint."
              : 'Please connect your wallet to choose an acessory to mint'}
          </Paragraph>
          <ItemsGrid items={DEFAULT_ACESSORIES} />
          {isConnected ? <MintButton /> : null}
        </SectionContainer>
      </>
    </MintProvider>
  )
}
