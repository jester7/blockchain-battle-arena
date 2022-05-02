import { useEffect, useRef } from 'react'
import { useGame } from '../providers'
import BCBA from '../game/BCBA'

import '../game/Game.css'
import { SectionContainer } from '../components/shared/SectionContainer'
import { HeaderText } from '../components/shared/HeaderText'

export const GameView = () => {
  const { readyToLaunch, player } = useGame()
  const canvasRef: any = useRef(null)

  useEffect(() => {
    if (readyToLaunch) {
      BCBA.init(
        canvasRef,
        player,
        false
      )
    }
  }, [readyToLaunch, player])

  return !readyToLaunch ? (
    <SectionContainer>
      <HeaderText>Please Select a character before playing!</HeaderText>
    </SectionContainer>
  ) : <canvas id='game-canvas' ref={canvasRef}></canvas>
}
