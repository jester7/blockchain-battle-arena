import styled from 'styled-components'
import { FlashingButton } from '../shared'
import { useMint } from '../../providers'

const MintButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  margin: 0 0 1rem 0;
`

export const MintButton = () => {
  const { handleMint } = useMint()
  return (
    <MintButtonContainer>
      <FlashingButton onClick={() => handleMint()}>Mint</FlashingButton>
    </MintButtonContainer>
  )
}
