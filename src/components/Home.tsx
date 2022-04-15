import Header from "./Header";
import Navbar from "./Navbar";

export default function Home() {
  return (
    <>
      <main>
        <Header />
        <Navbar />
        <div className="logo"></div>
        <div className="container">
          <h1>Welcome</h1>

          <p>
            <span className="bcba">Blockchain Battle Arena </span>
            is a battle game for your NFT characters. We have included a small
            sample NFT collection with some exciting innovations beyond that of
            the ERC721 NFT standard that is used by most profile picture NFT
            collectibles today.
          </p>
          <h3>What's different about our NFTs?</h3>
          <p>
            Though if you mint a sample NFT it will show up on the testnets
            OpenSea marketplace without seeming too different from other NFTs,
            underneath the hood they have a few key differences:
            <ul>
              <li>
                Accessories are separate NFTs that can be equipped on a character
                NFT
              </li>
              <li>
                The child/accesory NFTs can be attached to another NFT as long
                as you are the owner or they can be listed on OpenSea in their
                own right. Transferring or selling an accessory NFT will detach
                it from its parent NFT.
              </li>
              <li>
                This parent NFT can store positioning metadata onchain for all
                accessory NFTs, thus allowing more flexibility in sharing
                accessories between different styles of NFT collections
              </li>
              <li>
                Finally, our proposal includes a method on the NFT smart
                contract to get the token URI for a background free version of
                the NFT character image, allowing drop in use in games or other
                web3 applications
              </li>
            </ul>
          </p>
        </div>
      </main>
    </>
  );
}
