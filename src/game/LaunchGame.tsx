import './Game.css';
import { useEffect, useRef } from 'react';
import BCBA from './BCBA';

export default function LaunchGame() {
    const canvasRef: any = useRef(null);
    
    useEffect(() => {
        const BCBAinstance = BCBA.init(canvasRef, true);        
    }, [])

    return <canvas id="game-canvas" ref={canvasRef}></canvas>;
}