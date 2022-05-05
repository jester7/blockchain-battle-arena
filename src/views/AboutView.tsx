import { MainLayout } from '../components/Layout'
import {
  HeaderText,
  ListItem,
  Paragraph,
  SectionContainer,
  SubHeading,
  UnorderedList,
} from '../components/shared'

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
          <ListItem>CYUBEART</ListItem>
          <ListItem>Rimraf</ListItem>
          <ListItem>Jovan Jester</ListItem>
        </UnorderedList>
        <SubHeading>Tech Stack</SubHeading>
        <UnorderedList>
          <ListItem>Node with React/TypeScript</ListItem>
          <ListItem>Kaboom</ListItem>
          <ListItem>Solidity</ListItem>
        </UnorderedList>
        <SubHeading>Coming Soon</SubHeading>
        <UnorderedList>
          <ListItem>Multiplayer</ListItem>
          <ListItem>Use your NFTs from any EVM compatible mainnet, including Ethereum, of course, Polygon, KardiaChain, Harmony, Avalance and others</ListItem>
        </UnorderedList>
      </SectionContainer>
    </MainLayout>
  )
}
