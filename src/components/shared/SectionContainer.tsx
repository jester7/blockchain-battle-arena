import { COLORS, SPACING } from '../../styles'
import styled from 'styled-components'

export const SectionContainer = styled.div`
  all: revert;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  overflow-y: auto;
  overflow-x: hidden;
  scrollbar-color: ${COLORS.blueMedium} ${COLORS.blueDarkAlpha};
  padding: 0.8rem ${SPACING.medium};
  border-radius: ${SPACING.smallRadius};
  background-color: ${COLORS.greyDarkAlpha};
  box-shadow: ${COLORS.shadowBlueLight};
`
