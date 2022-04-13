import { Link } from "react-router-dom";

function ExternalLinks() {
    return (<>
        <ul className="external-links">
            <li><a href="https://github.com/jester7/blockchain-battle-arena" className="icon group github"> </a></li>
            <li><a href="https://replit.com/@jovanjester/Blockchain-Battle-Arena" className="icon group replit"> </a></li>
            <li><a href="https://testnets.opensea.io/collection/stick-figure-developers-test-taidwbxjlq" className="icon group opensea"> </a></li>
            <li><a href="https://twitter.com/JackBohmArt" className="icon group twitter jb"> </a></li>
            <li><a href="https://twitter.com/JovanJester" className="icon group twitter jj"> </a></li>
        </ul>
    </>);
}

export default function Navbar() {
    return (<>
        <nav>
            <ExternalLinks />
            <Link className="button" to="about-team">About Us</Link>
            <Link className="button" to="me">My Profile</Link>
            <Link className="button" to="mint">Mint characters and accessories from our collection</Link>
            <Link className="button" to="game">Go to Game</Link>
        </nav>
    </>)
}