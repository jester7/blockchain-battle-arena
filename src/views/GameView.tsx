import { useEffect, useRef, useState } from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage'
import BCBA from '../game/BCBA'

import '../game/Game.css'

export const GameView = () => {
  const [gameInstance, setGameInstance] = useState<BCBA>()
  const canvasRef: any = useRef(null)

  const [characterNum, setCharacterNum] = useLocalStorage('characterNum', 1)
  const [mech, setMech] = useLocalStorage('mech', 'red')
  const [gun, setGun] = useLocalStorage('gun', 'biggun')

  useEffect(() => {
    console.log('Game...')

    setGameInstance(
      BCBA.init(
        canvasRef,
        {
          characterNum: characterNum,
          mechColor: mech,
          gunName: "smallgun", // for testing laser ball rotation
        },
        false
      )
    )
  }, [characterNum, mech, gun])

  return <canvas id='game-canvas' ref={canvasRef}></canvas>
}
