import { SubHeading } from '../shared/SubHeading'
import { useGame } from '../../providers'
import { DEFAULT_CHARACTERS } from '../../sprites'
import styled from 'styled-components'
import { useState } from 'react'
import { IRawGameObject } from '../../providers/types'

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

export const CharacterSelection = () => {
  const { playerNfts } = useGame()
  const [selectedCharacter, setSelectedCharacter] = useState<IRawGameObject>()
  const filteredCharacters = playerNfts?.filter(
    (n) => n.objectType === 'character'
  )
  return (
    <>
      {playerNfts.length !== 0 ? (
        <>
          <SubHeading>Choose a Character</SubHeading>
          <ItemGrid>
            {filteredCharacters.length !== 0 ? (
              <>
                {filteredCharacters.map((char, i) => {
                  return (
                    <ObjectWrapper
                      key={i}
                      onClick={() => setSelectedCharacter(char)}
                    >
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
      ) : (
        <>
          <ItemGrid>
            {DEFAULT_CHARACTERS.map((char, i) => {
              return (
                <ObjectWrapper
                  key={i}
                  onClick={() => setSelectedCharacter(char)}
                >
                  <ObjectGraphic $image={char.objectImageUrl} />
                </ObjectWrapper>
              )
            })}
          </ItemGrid>
        </>
      )}
    </>
  )
}
