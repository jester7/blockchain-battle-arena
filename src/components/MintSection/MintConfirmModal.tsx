import React from 'react'
import Modal from 'react-modal'
import { useMint } from '../../providers/MintProvider'
import { COLORS, FONTS } from '../../styles'
import styled from 'styled-components'
import { SectionContainer } from '../shared/SectionContainer'

const modalStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    transform: 'translate(-50%, -50%)',
    background: 'rgba(0,0,0, 0.1)',
    borderRadius: '1rem',
  },
}

const ConfirmContainer = styled(SectionContainer)`
  margin: 2.8rem 0.5rem 1rem;
  min-width: 500px;
  z-index: 500;
`

const ConfirmText = styled.h1`
  color: ${COLORS.highlight};
  text-align: center;
  margin: 3rem 0;
  font-family: ${FONTS.heading};
  font-size: 3rem;
`

const Button = styled.button`
  font-size: 2rem;
  border: none;
  margin: 0.5rem;
  padding: 1rem;
  min-width: 40%;
`

const CancelButton = styled(Button)``

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin: 0 0 1.5rem 0;
`

export const MintConfirmModal = () => {
  const { confirmModalOpen, triggerConfirmModal, mintGameObject } = useMint()

  return (
    <Modal
      isOpen={confirmModalOpen}
      style={modalStyles}
      contentLabel="Confirm Mint"
      ariaHideApp={false}
    >
      <ConfirmContainer>
        <ConfirmText>Confirm Mint</ConfirmText>
        <ButtonContainer>
          <Button onClick={mintGameObject}>ok</Button>
          <CancelButton onClick={triggerConfirmModal}>cancel</CancelButton>
        </ButtonContainer>
      </ConfirmContainer>
    </Modal>
  )
}
