import { FONTS, SPACING } from '../styles'
import { MainLayout } from '../components/Layout'
import styled from 'styled-components'
import {
  HeaderText,
  Paragraph,
  SectionContainer,
  SubHeading,
} from '../components/shared'

const HomeSectionContainer = styled(SectionContainer)`
  text-align: left;
  padding: ${SPACING.medium} ${SPACING.medium} ${SPACING.large};
  margin: ${SPACING.primary} 0;
`

const TextContainer = styled.div`
  margin: 0;
`

const EmphasisText = styled.span`
  all: revert;
  font-family: ${FONTS.heading};
  font-weight: 900;
`

export const HomeView = () => {
  return (
    <MainLayout>
      <HomeSectionContainer>
        <HeaderText>Welcome</HeaderText>
        <TextContainer>
          <Paragraph>
            <EmphasisText>Blockchain Battle Arena </EmphasisText>
            will be a cross-chain multiplayer battle game for NFTs.
            Any standard NFT on most Ethereum Virtual Machine compatible blockchains
            will be usable inside of the game. Your NFT characters will come to life
            as they don a mech suit and battle each other using a variety of weapons.
            The concept is loosely based on the Super Smash Brothers series of games,
            but with a more Sci Fi aesthetic.
          </Paragraph>
          <Paragraph>
            The current demo is single player with a simple AI opponent and we only
            have one battle stage, but the underpinnings are there for 4 to 6 player
            multiplayer support, both local and over the internet. For local multiplayer,
            this will be achieved through gamepad input support in addition to the keyboard.
            Gamepads will be supported for online play as well, of course.
          </Paragraph>
          <SubHeading>Competition</SubHeading>
          <Paragraph>
            Though NFTs from different blockchains will be supported, we are still
            figuring out the competition mechanics and how outcomes will be stored
            and tracked. We would eventually like to have a leaderboard for both
            individual players, tracked by wallet address, and for NFT collections,
            tracked by contact address and chain id.
          </Paragraph>
          <Paragraph>
            The initial version of this system will likely be on a traditional database
            system while we figure out the specifics of the on-chain storage.
          </Paragraph>
        </TextContainer>
        <SubHeading>The Future of NFTs</SubHeading>
        <Paragraph>
          It seems NFT creators and collectors have become fixated on the 10k profile
          picture collection model of distribution for NFTs. Though NFT collectibles are
          fun to own and trade, we suspect the collectibles market is nearing saturation
          and collectors are becoming fatigued by this model.
        </Paragraph>
        <Paragraph>
          We would like to evolve the NFT standard to include the ability to mint and
          trade accessories. This would mean collections could be made much bigger, not
          just limited to 10k, and the monetization possibilities for creators would
          increase as they can release seasonal accessory collections for their NFTs and
          even usable by other collections as well. This would be a win for collectors as
          well because it would allow greater customization and hence allow more creative
          self expression.
        </Paragraph>
        <Paragraph>
          In addition to accessories, we are also proposing evolving the NFT standard to
          include methods in the smart contracts that provide the base NFT image with a
          transparent background and perhaps a few simple different poses or expressions
          for the character. These methods would unlock amazing interoperability with
          different games and dApps from the get-go, instead of collectors having to wait
          for the creators of their NFTs to launch a game or partner with other companies.
        </Paragraph>
        <Paragraph>
          <EmphasisText>
            In summary, we are imagining a future for digital collectibles on the blockchain
            that provide instant utility from day one, by being customizable through
            allowing the minting of accessories and immediate interoperability with a range
            of web3 games and dApps in general.
          </EmphasisText>
        </Paragraph>
      </HomeSectionContainer>
    </MainLayout>
  )
}
