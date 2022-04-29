import styled from "styled-components"
import { COLORS } from "../../styles"

interface IAcessoryProps {
  id: string
  img: any
  handleSelect: (id: string) => void
}

const AcessoryWrapper = styled.div`
  cursor: pointer;
  border-radius: 16px;
  border: 1px solid ${COLORS.tan};
  margin: 1rem;
  width: 200px;
  height: 200px;
`

const AcessoryImage = styled((props) => <div {...props} />)`
  background-image: url('${(props) => props.image}');
  background-repeat: no-repeat;
  background-size: cover;
  width: 200px;
  height: 200px;
`

export const Acessory = ({ id, img, handleSelect }: IAcessoryProps) => {
  return (
    <AcessoryWrapper>
      <AcessoryImage onClick={() => handleSelect(id)} image={img} />
    </AcessoryWrapper>
  )
}
