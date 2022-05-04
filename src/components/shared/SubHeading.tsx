import { COLORS, FONTS, SPACING } from '../../styles'
import styled from 'styled-components'

export const SubHeading = styled.h3`
  revert: all;
  font-family: ${FONTS.heading};
  color: ${COLORS.redPink};
  font-size: 1.3rem;
  margin: ${SPACING.primary} 0;
  padding: 0;
  line-height: 2.5rem;
  border-bottom: 2px dotted ${COLORS.blueMedium};
`
