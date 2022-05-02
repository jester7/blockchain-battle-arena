import { MainLayout } from '../components/Layout/MainLayout'
import { SectionContainer } from '../components/shared/SectionContainer'
import { SubHeading } from '../components/shared/SubHeading'
import { Paragraph } from '../components/shared/Paragraph'
import { UnorderedList, ListItem } from '../components/shared/Lists'
import { useGame } from '../providers'
import styled from 'styled-components'

const ItemGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
`

const ObjectWrapper = styled((props) => <div {...props} />)`
  position: relative;
  cursor: pointer;
  border-radius: 1rem;
  margin: 1rem;
  width: 200px;
  height: 200px;
`
const ObjectGraphic = styled((props) => <div {...props} />)`
  position: relative;
  border-radius: 1rem;
  background-image: url('${(props) => props.$image}');
  background-repeat: no-repeat;
  background-size: cover;
  width: 200px;
  height: 200px;
`


const renderCharacters = (nfts: any[]) => {
  const filteredCharacters = nfts?.filter(n => n.objectType === 'character')
  return (
    <>
      <SubHeading>Choose a Mech</SubHeading>
      <ItemGrid>
        {filteredCharacters.length !== 0 ? (<>
          {filteredCharacters.map((char, i) => {
            return (
              <ObjectWrapper key={i}>
                <ObjectGraphic $image={char.objectImageUrl} />
              </ObjectWrapper>
            )
          })}
        </>) : <p>No playable NFTs found</p>}
      </ItemGrid>
    </>
  )
}

export const LaunchView = () => {
  const { playerNfts } = useGame()

  return (
    <MainLayout>
      <>
        <SectionContainer>
          <SubHeading>Keyboard Controls</SubHeading>
          <UnorderedList>
            <ListItem>Move with left and right arrow keys</ListItem>
            <ListItem>Jump with the space bar</ListItem>
            <ListItem>Shoot with either control key</ListItem>
            <ListItem>Activate shield with either shift key</ListItem>
          </UnorderedList>
          <SubHeading>Choose one of your NFTs for battle</SubHeading>
          <Paragraph>Click on a character to pick it.</Paragraph>
          {playerNfts && renderCharacters(playerNfts)}
          <SubHeading>Choose a Gun</SubHeading>
          {/* <div className='nft-container guns'>
            <div
              className={
                'nft-item accessory-image ' +
                (gun === 'smallgun' ? 'chosen' : '')
              }
              id='smallgun'
              onClick={() => {
                setGun('smallgun')
              }}
            ></div>
            <div
              className={
                'nft-item accessory-image ' + (gun === 'biggun' ? 'chosen' : '')
              }
              id='biggun'
              onClick={() => {
                setGun('biggun')
              }}
            ></div>
          </div> */}{' '}
        </SectionContainer>
      </>
    </MainLayout>
  )
}
