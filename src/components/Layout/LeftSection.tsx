import { SIZES } from '../../styles'
import BCBALogo from '../../bcba-logo.png'
import SampleCharacter from '../../sample-character-nft.png'
import SampleCharacterSuit from '../../mech-fighter-red-large.png'
import styled, { keyframes } from 'styled-components'

const LeftCharacterBlock = styled.div`
  display: flex;
  flex-direction: column;
`

const HeaderLogo = styled.div`
  background-image: url('${BCBALogo}');
  background-repeat: no-repeat;
  background-size: contain;
  min-width: 70%;
  height: 50%;
  margin: ${SIZES.large} auto;
`

const shakeAnimation = keyframes`
  0% {
    transform: rotate(0deg);
  }
  25% {
    transform: rotate(1.5deg);
  }
  50% {
    transform: rotate(0deg);
  }
  75% {
    transform: rotate(-1.5deg);
  }
  100% {
    transform: rotate(0deg);
  }
`

const MechSuitCharacter = styled.div`
  margin: 0 0 16px 0;
  flex: fit-content;
  display: flex;
  justify-content: center;
  rotate: 0deg;
  transform-origin: bottom;
  animation-duration: 0.5s;
  position: relative;
  width: 100%;
  height: 70%;
  min-height: 500px;
  transform: rotate(0deg);
  &:hover {
    animation: ${shakeAnimation} 0.4s linear 2;
  }
`
const MechSuit = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 10;
`

const MechSuitInner = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  background-image: url('${SampleCharacterSuit}');
  background-size: contain, contain;
  background-position: bottom center, bottom center;
  background-repeat: no-repeat;
  z-index: 10;
`

const Character = styled.div`
  display: block;
  position: absolute;
  background-image: url('${SampleCharacter}');
  background-size: contain, contain;
  background-position: bottom center, bottom center;
  background-repeat: no-repeat;
  height: 100%;
  width: 100%;
  z-index: 1;
  /* bottom:2%; */
`

export const LeftSection = () => {
  return (
    <LeftCharacterBlock>
      <HeaderLogo />
      <MechSuitCharacter>
        <MechSuit>
          <Character />
          <MechSuitInner />
        </MechSuit>
      </MechSuitCharacter>
    </LeftCharacterBlock>
  )
}
