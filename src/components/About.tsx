import Header from "./Header";
import Navbar from "./Navbar";


export default function About() {


  return (<>
    <div className="home section visible">
      <h1 className="main-heading">About</h1>
      <ul>
        <li>Jack Bohm</li>
        <li>Jovan Jester</li>
      </ul>
      <p>
        <span className="bcba">Blockchain Battle Arena </span>
        is a battle game for your NFT characters.
      </p>
      <h3>Tech Stack</h3>

      <ul>
        <li>
          React/TypeScript
        </li>
        <li>
          Kaboom game engine
        </li>
        <li>
          Solidity on Rinkeby
        </li>

      </ul>
      <h3>Coming Soon</h3>
      <ul>
        <li>
          Multiplayer
        </li>
        <li>
          Use your NFTs on the Ethereum mainnet
        </li>
        
      </ul>
    </div>
  </>
  );

}