import styled from 'styled-components'
import { COLORS } from '../../styles'
import type { ICharacter } from './sprites'

const CharacterWrapper = styled.div`
  cursor: pointer;
  border-radius: 16px;
  border: 1px solid ${COLORS.tan};
  margin: 1rem;
  width: 200px;
  height: 200px;
`

const CharacterImage = styled((props) => <div {...props} />)`
  background-image: url('${(props) => props.image}');
  background-repeat: no-repeat;
  background-size: cover;
  width: 200px;
  height: 200px;
`

interface ICharacterProps extends ICharacter {
  handleSelect: (name: string) => void
}

export const Character = ({ img, name, handleSelect }: ICharacterProps) => {
  return (
    <CharacterWrapper>
      <CharacterImage onClick={() => handleSelect(name)} image={img} />
    </CharacterWrapper>
  )
}
