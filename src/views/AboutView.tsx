import { MainLayout } from '../components/Layout/MainLayout'
import { HeaderText } from '../components/shared/HeaderText'
import { SectionContainer } from '../components/shared/SectionContainer'
import { UnorderedList, LineItem } from '../components/shared/Lists'
import { SubHeading } from '../components/shared/SubHeading'
import { Paragraph } from '../components/shared/Paragraph'

export const AboutView = () => {
  return (
    <MainLayout>
      <SectionContainer>
        <HeaderText>About</HeaderText>
        <Paragraph>
          Blockchain Battle Arena is a battle game for your NFT characters.
        </Paragraph>
        <SubHeading>Contributors</SubHeading>
        <UnorderedList>
          <LineItem>StrictlyKappa</LineItem>
          <LineItem>Jovan Jester</LineItem>
          <LineItem>Rimraf</LineItem>
        </UnorderedList>
        <SubHeading>Tech Stack</SubHeading>
        <UnorderedList>
          <LineItem>React/TypeScript</LineItem>
          <LineItem>Kaboom game engine</LineItem>
          <LineItem>Solidity on Rinkeby</LineItem>
        </UnorderedList>
        <SubHeading>Coming Soon</SubHeading>
        <UnorderedList>
          <LineItem>Multiplayer</LineItem>
          <LineItem>Use your NFTs on the Ethereum mainnet</LineItem>
        </UnorderedList>
      </SectionContainer>
    </MainLayout>
  )
}
