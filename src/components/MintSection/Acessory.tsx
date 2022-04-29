import styled from 'styled-components'
import { COLORS } from '../../styles'
import type { IAcessory } from './sprites'

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

export const Acessory = ({
  acessory,
  handleSelect,
}: {
  acessory: IAcessory
  handleSelect: (acessory: IAcessory) => void
}) => {
  return (
    <AcessoryWrapper>
      <AcessoryImage
        onClick={() => handleSelect(acessory)}
        image={acessory.img}
      />
    </AcessoryWrapper>
  )
}
