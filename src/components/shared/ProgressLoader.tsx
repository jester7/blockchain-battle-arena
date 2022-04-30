import styled, { keyframes } from "styled-components"
import { COLORS } from "../../styles"
import { Paragraph } from "./Paragraph"
const anim = keyframes`
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
`

const LoadingIndicator = styled.div`
  background: ${COLORS.gradientRed};
  background-size: 111% 111%;
  width: 100%;
  padding-top: 0.25em;
  height: 1.75em;
  animation: ${anim} 2.5s linear infinite;
  border-radius: 8px;
  color: ${COLORS.highlight};
  text-shadow: 1px 1px 3px ${COLORS.redDeep};
  text-align: center;
  font-size: 2rem;
`

const LoadText = styled(Paragraph)`
  position: relative;
  font-size: 2rem;
  margin: 0.5rem 0 0 0;
  padding: 0;
`

export const ProgressLoader = () => (
  <LoadingIndicator><LoadText>Connecting...</LoadText></LoadingIndicator>
)
