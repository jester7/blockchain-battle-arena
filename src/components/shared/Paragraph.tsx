import styled from 'styled-components'
import { COLORS, SIZES, FONTS } from '../../styles'

export const Paragraph = styled.p`
  all: revert;
  font-family: ${FONTS.primary};
  font-size: ${SIZES.paragraph};
  line-height: 1.8rem;
  margin: 0;
  padding: 0.5rem 0;
  color: ${COLORS.highlight};
`
