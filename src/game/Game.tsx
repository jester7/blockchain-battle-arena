import './Game.css';
import { useEffect, useRef, useState } from 'react';
//import { useNavigate, useParams } from 'react-router-dom';

import BCBA from './BCBA';
import { useLocalStorage } from '../hooks/useLocalStorage';


export type GameCharacter = {
    characterNum: number,
    mechColor: string,
    gunName: string
}


export default function Game() {
    const [gameInstance, setGameInstance] = useState<BCBA>();
    const canvasRef: any = useRef(null);

    const [characterNum, setCharacterNum] = useLocalStorage("characterNum", 1);
    const [mech, setMech] = useLocalStorage("mech", "red");
    const [gun, setGun] = useLocalStorage("gun", "biggun");

    useEffect(() => {
        console.log("Game...");

        setGameInstance(BCBA.init(canvasRef, {
            characterNum: characterNum,
            mechColor: mech,
            gunName: gun
        }, false));
    }, [characterNum, mech, gun])

    return <canvas id="game-canvas" ref={canvasRef}></canvas>;
}