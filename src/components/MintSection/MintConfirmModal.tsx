// import { useMint } from '../../providers'
// import { COLORS, FONTS } from '../../styles'
// import styled from 'styled-components'
import { SectionContainer, HeaderText, FlashingButton } from '../shared'

export const MintConfirmModal = () => {
  // const { confirmModalOpen, triggerConfirmModal, mintGameObject } = useMint()

  return (
    <SectionContainer>
      <HeaderText>Confirm Mint</HeaderText>
      <FlashingButton>Ok</FlashingButton>
      <FlashingButton>Cancel</FlashingButton>
    </SectionContainer>
  )
}
