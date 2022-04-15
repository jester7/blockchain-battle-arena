import './Game.css';
import { useEffect, useState } from 'react';

export default function LaunchGame() {
    const [nftCharacter, setNftCharacter] = useState<any>(null);
    const [mech, setMech] = useState<any>("red");
    const [gun, setGun] = useState<any>("biggun");

    const setCharacter = () => {
    }

    useEffect(() => {

    }, []);

    return (
        <main>

            <div className="logo">

            </div>
            <div className="prelaunch container">
                <h1>Choose one of your NFTs for battle</h1>
                <p>Click on a character to pick it.</p>
                <div className="items-container nfts">
                    <div className="character-image" id="character1" onClick={()=>{setCharacter();}}></div>
                    <div className="character-image" id="character2" ></div>
                    <div className="character-image" id="character3" ></div>

                </div>
                <h2>Choose a Mech</h2>
                <p></p>
                <div className="items-container mechs">
                    <div className="accessory-image" id="cigarette"></div>
                    <div className="accessory-image" id="eyelenser"></div>
                    <div className="accessory-image" id="hat"></div>

                </div>
                <h2>Choose a Gun</h2>
                <p></p>
                <div className="items-container mechs">
                    <div className="accessory-image" id="cigarette"></div>
                    <div className="accessory-image" id="eyelenser"></div>
                    <div className="accessory-image" id="hat"></div>

                </div>
            </div>

        </main>);
}