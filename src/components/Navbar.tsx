import { Link } from "react-router-dom";


export default function Navbar() {
    return (<>
        <nav>
            <Link className="button" to="/">Home</Link>
            <Link className="button" to="/about-team">About Us</Link>
            {/* <Link className="button" to="/me">My Profile</Link> */}
            <Link className="button" to="/mint">Mint characters &amp; accessories</Link>
            <Link className="button" to="/game">Go to Game</Link>
        </nav>
    </>)
}