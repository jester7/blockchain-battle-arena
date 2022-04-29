import styled from 'styled-components'
import { FlashingButton } from '../shared/FlashingButton'

const MintButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  margin: 0 0 1rem 0;
`

export const MintButtonSection = () => {
  return (
    <MintButtonContainer>
      <FlashingButton>Mint</FlashingButton>
    </MintButtonContainer>
  )
}
