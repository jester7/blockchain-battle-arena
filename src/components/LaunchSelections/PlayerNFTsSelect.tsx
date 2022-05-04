import { SubHeading, ItemGrid, ItemGraphic, ItemWrapper, ItemOverlay, ItemSelectedCheck } from '../shared'
import { useConnection, useGame } from '../../providers'
import { useState } from 'react'
import type { IRawGameObject } from '../../providers/types'

const CharacterObject = (gameObject: IRawGameObject) => {
  const [isSelected, setIsSelected] = useState<Nullable<boolean>>(null)
  const { selectedCharacter, setSelectedCharacter } = useGame()
  const { isConnected } = useConnection()

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
    <ItemWrapper onClick={() => handleSelection(gameObject)}>
      <ItemSelectedCheck $selected={isSelected} />
      <ItemOverlay $isConnected={isConnected} selected={isSelected} />
      <ItemGraphic $image={gameObject.objectImageUrl} />
    </ItemWrapper>
  )
}

export const PlayerNFTsSelect = () => {
  const { playerNfts } = useGame()

  const filteredCharacters = playerNfts?.filter(
    (n) => n.objectType === 'character'
  )
  return (
    <>
      <SubHeading>Choose an NFT Character</SubHeading>
      <ItemGrid>
        {filteredCharacters.map((char, i) => (
          <CharacterObject key={i} {...char} />
        ))}
      </ItemGrid>
    </>
  )
}
