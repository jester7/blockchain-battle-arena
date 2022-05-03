import { MainLayout } from '../components/Layout/MainLayout'
import { SectionContainer } from '../components/shared/SectionContainer'
import { SubHeading } from '../components/shared/SubHeading'
import { Paragraph } from '../components/shared/Paragraph'
import { UnorderedList, ListItem } from '../components/shared/Lists'
import { useGame, useToast } from '../providers'
import { DEFAULT_CHARACTERS } from '../sprites'
import styled from 'styled-components'
import { useState } from 'react'
import { FlashingButton } from '../components/shared/FlashingButton'

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

const renderDefaultCharacters = (selectDefalutCharacter: (char: any) => void) => {
  return (
    <>
      <ItemGrid>
        {DEFAULT_CHARACTERS.map((char, i) => {
          return (
            <ObjectWrapper key={i} onClick={() => selectDefalutCharacter(char)}>
              <ObjectGraphic $image={char.objectImageUrl} />
            </ObjectWrapper>
          )
        })}
      </ItemGrid>
    </>
  )
}

const renderCharacters = (nfts: any[], selectCharacter: (char: any) => void) => {
  const filteredCharacters = nfts?.filter((n) => n.objectType === 'character')

  return (
    <>
      <SubHeading>Choose a Mech</SubHeading>
      <ItemGrid>
        {filteredCharacters.length !== 0 ? (
          <>
            {filteredCharacters.map((char, i) => {
              return (
                <ObjectWrapper key={i} onClick={() => selectCharacter(char)}>
                  <ObjectGraphic $image={char.objectImageUrl} />
                </ObjectWrapper>
              )
            })}
          </>
        ) : (
          <p>No playable characters found</p>
        )}
      </ItemGrid>
    </>
  )
}

const renderAcessories = (
  nfts: any[],
  selectAcessory: (char: any) => void
) => {
  const filteredAcessories = nfts?.filter((n) => n.objectType === 'acessory')
  return (
    <>
      <SubHeading>Choose an acessory</SubHeading>
      <ItemGrid>
        {filteredAcessories.length !== 0 ? (
          <>
            {filteredAcessories.map((acessory, i) => {
              return (
                <ObjectWrapper
                  key={i}
                  onClick={() => selectAcessory(acessory)}
                >
                  <ObjectGraphic $image={acessory.objectImageUrl} />
                </ObjectWrapper>
              )
            })}
          </>
        ) : (
          <p>No playable acessories found</p>
        )}
      </ItemGrid>
    </>
  )
}

const renderWeapons = (nfts: any[], selectWeapon: (char: any) => void) => {
  const filteredAcessories = nfts?.filter((n) => n.objectType === 'weapon')
  return (
    <>
      <SubHeading>Choose a weapon</SubHeading>
      <ItemGrid>
        {filteredAcessories.length !== 0 ? (
          <>
            {filteredAcessories.map((weapon, i) => {
              return (
                <ObjectWrapper key={i} onClick={() => selectWeapon(weapon)}>
                  <ObjectGraphic $image={weapon.objectImageUrl} />
                </ObjectWrapper>
              )
            })}
          </>
        ) : (
          <p>No playable weaponse found</p>
        )}
      </ItemGrid>
    </>
  )
}

export const LaunchView = () => {
  const { playerNfts, readyToLaunch, launchGame } = useGame()
  const { triggerError } = useToast()
  const [selectedCharacter, setSelectedCharacter] = useState()
  const [selectedAcessory, setSelectedAcessory] = useState()
  const [selectedWeapon, setSelectedWeapon] = useState()


  const handleLaunch = () => {
    if(!readyToLaunch) {
      triggerError('Please select your character and items before launching')
      return
    }
    launchGame()
  }

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
          {playerNfts.length !== 0 ? (
            <>
              <SubHeading>Choose one of your NFTs for battle</SubHeading>
              <Paragraph>Click on a character to pick it.</Paragraph>
              {playerNfts && renderCharacters(playerNfts, setSelectedCharacter)}
              {playerNfts && renderAcessories(playerNfts, setSelectedAcessory)}
              {playerNfts && renderWeapons(playerNfts, setSelectedWeapon)}
            </>
          ) : (
            <>
              <SubHeading>No Game NFTs found</SubHeading>
              <Paragraph>Choose a default character</Paragraph>
              {renderDefaultCharacters(setSelectedCharacter)}
            </>
          )}
          {readyToLaunch && <FlashingButton>Launch Game!</FlashingButton>}
        </SectionContainer>
      </>
    </MainLayout>
  )
}
