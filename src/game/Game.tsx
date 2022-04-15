import './Game.css';
import { useEffect, useRef, useState } from 'react';
import BCBA from './BCBA';

export default function Game() {
    const [gameInstance, setGameInstance] = useState<BCBA>();
    const canvasRef: any = useRef(null);
    
    useEffect(() => {
        setGameInstance( BCBA.init(canvasRef, true) );        
    }, [])

    return <canvas id="game-canvas" ref={canvasRef}></canvas>;
}