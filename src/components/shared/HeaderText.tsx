import styled from 'styled-components'
import { COLORS, SIZES, FONTS } from '../../styles'

export const HeaderText = styled.h1`
  all: revert;
  margin: 0;
  line-height: 3.2rem;
  font-family: ${FONTS.heading};
  font-size: ${SIZES.medium};
  color: ${COLORS.redPink};
  text-shadow: 0.3rem 0.3rem 0.5rem ${COLORS.redDeep};
  border-bottom: 2px dotted ${COLORS.blueMedium};
`
