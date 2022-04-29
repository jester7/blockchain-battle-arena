import { Character } from './Character'
import { CHARACTERS } from './sprites'
import styled from 'styled-components'

const CharacterSelectContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
`

export const CharacterSelection = () => {
  const handleSelect = (name: string) => {}
  return (
    <CharacterSelectContainer>
      {CHARACTERS?.map((character, i) => (
        <Character
          key={i}
          {...character}
          handleSelect={handleSelect}
        />
      ))}
    </CharacterSelectContainer>
  )
}
