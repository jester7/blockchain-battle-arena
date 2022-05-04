import { useGame } from '../../providers'
import { useState } from 'react'
import styled from 'styled-components'
import type { IRawGameObject } from '../../providers/types'
import {
  DEFAULT_CHARACTERS,
  ItemGraphic,
  ItemGrid,
  ItemOverlay,
  ItemSelectedCheck,
  ItemWrapper,
  Paragraph,
  SubHeading,
} from '../shared'

const SubParagraph = styled(Paragraph)`
  padding: 0;
  margin: 0;
  font-size: 0.8rem;
`

export const CharacterItem = (character: IRawGameObject) => {
  const { selectedCharacter, setSelectedCharacter } = useGame()
  const [isSelected, setIsSelected] = useState<boolean>(false)

  const handleSelection = (character: IRawGameObject) => {
    setSelectedCharacter(character)

    const sameSelected = selectedCharacter?.objectName === character.objectName
    if (isSelected === null) {
      setIsSelected(true)
      return
    }
    if (isSelected && sameSelected) {
      setIsSelected(false)
      return
    }

    if (!isSelected) {
      setIsSelected(true)
      return
    }
  }
  return (
    <ItemWrapper onClick={() => handleSelection(character)}>
      <ItemOverlay $selected={isSelected} />
      <ItemSelectedCheck $selected={isSelected} />
      <ItemGraphic $image={character.objectImageUrl} />
    </ItemWrapper>
  )
}

export const DefaultPlayerSelect = () => {
  return (
    <>
      <SubHeading>Select a default character</SubHeading>
      <Paragraph>We couldnt find a playable NFT in your wallet...</Paragraph>
      <SubParagraph>Select one of our defaults</SubParagraph>
      <ItemGrid>
        {DEFAULT_CHARACTERS.map((char, i) => (
          <CharacterItem key={i} {...char} />
        ))}
      </ItemGrid>
    </>
  )
}
