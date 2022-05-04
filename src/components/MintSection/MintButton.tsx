import styled from 'styled-components'
import { FlashingButton, Paragraph } from '../shared'
import { useMint } from '../../providers'
import { COLORS } from '../../styles'

const MintButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  margin: 0 0 1rem 0;
`

const ConfirmContainer = styled.div`
  display: grid;
  grid-auto-flow: column;
  grid-gap: 1rem;
  justify-content: stretch;
  align-items: center;
  margin: 1rem 0;
`

const Button = styled.button`
  border: none;
  padding: 1rem;
  border-radius: 0.3rem;
  font-size: 1.5rem;
  color: ${COLORS.highlight};
`

const ConfirmButton = styled(Button)`
  background: green;
`

const CancelButton = styled(Button)`
  background: red;
`

export const MintButton = () => {
  const { handleMint, confirmMint, triggerConfirmMint, mintGameObject } =
    useMint()
  return confirmMint ? (
    <ConfirmContainer>
      <Paragraph>Are you sure?</Paragraph>
      <CancelButton onClick={() => triggerConfirmMint(false)}>
        Cancel
      </CancelButton>
      <ConfirmButton onClick={mintGameObject}>Confirm</ConfirmButton>
    </ConfirmContainer>
  ) : (
    <MintButtonContainer>
      <FlashingButton onClick={() => handleMint()}>Mint</FlashingButton>
    </MintButtonContainer>
  )
}
