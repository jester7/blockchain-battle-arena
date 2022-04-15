import Header from "./Header";
import Navbar from "./Navbar";

export default function Mint() {
    return (
        <>
            <main>
                <Header />
                <Navbar />
                <div className="logo">

                </div>
                <div className="container">
                    <h1>Mint a character</h1>
                    <p>Click on a character to mint it. Minting is free and only costs gas payable with fake ETH on the Rinkeby testnet.</p>
                    <div className="items-container">
                        <div className="character-image" id="character1"></div>
                        <div className="character-image" id="character2"></div>
                        <div className="character-image" id="character3"></div>

                    </div>
                    <h2>Mint an accessory</h2>
                    <p>Click on a character to mint it.</p>
                    <div className="items-container">
                        <div className="accessory-image" id="eyelenser"></div>
                        <div className="accessory-image" id="hat"></div>
                        <div className="accessory-image" id="cigarette"></div>

                    </div>
                </div>
            </main>
        </>
    );
}
