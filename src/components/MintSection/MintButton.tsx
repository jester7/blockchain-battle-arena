import styled from 'styled-components'
import { FlashingButton } from '../shared/FlashingButton'
import { useMint } from '../../providers/MintProvider'

const MintButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  margin: 0 0 1rem 0;
`

export const MintButton = () => {
  const { triggerConfirmModal } = useMint()
  return (
    <MintButtonContainer>
      <FlashingButton onClick={triggerConfirmModal}>Mint</FlashingButton>
    </MintButtonContainer>
  )
}
