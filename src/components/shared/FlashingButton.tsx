import styled, { keyframes } from 'styled-components'
import { COLORS, FONTS, SPACING } from '../../styles'

const pulsate = keyframes`
  0% {
      background-color: ${COLORS.redDeep};
      box-shadow: none;
  }
  50% {
    background-color: ${COLORS.redMedium};
    box-shadow: 0px 0px 18px var(--color-blue-light-alpha);
    color: var(--color-highlight);
  }
  100% {
    background-color: ${COLORS.redDeep};
    box-shadow: none;
  }
`

export const FlashingButton = styled(props => <button {...props}/>)`
  font-family: ${FONTS.heading};
  font-size: 1.6rem;
  color: ${COLORS.highlight};
  background: ${COLORS.redDeep};
  border: none;
  border-radius: ${SPACING.smallRadius};
  box-shadow: none;
  padding: ${SPACING.primary};
  margin: ${SPACING.small};
  width: 100%;
  animation: ${pulsate} 2.5s ease-in-out infinite;
  &:hover {
    color: ${COLORS.redPink};
  }
`
