import styled from "styled-components"
import { COLORS } from "../../styles"

interface ICharacterProps {
  id: string
  img: any
  handleSelect: (id: string) => void
}

const CharacterWrapper = styled.div`
  cursor: pointer;
  border-radius: 16px;
  border: 1px solid ${COLORS.tan};
  margin: 1rem;
  width: 200px;
  height: 200px;
`

const CharacterImage = styled((props) => <div {...props} />)`
  background-image: url('${props => props.image}');
  background-repeat: no-repeat;
  background-size: cover;
  width: 200px;
  height: 200px;
`

export const Character = ({ id, img, handleSelect }: ICharacterProps) => {
  return (
    <CharacterWrapper>
      <CharacterImage onClick={() => handleSelect(id)} image={img} />
    </CharacterWrapper>
  )
}
