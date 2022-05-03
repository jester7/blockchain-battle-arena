import { MainLayout } from '../components/Layout/MainLayout'

export const AboutView = () => {
  return (
    <MainLayout>
      <div className='home section visible'>
        <h1 className='main-heading'>About</h1>
        <p>
          <span className='bcba'>Blockchain Battle Arena</span> is a battle game for your NFT characters. It was developed by the following team:
        </p>
        <ul>
          <li>CYUBEART</li>
          <li>Jovan Jester</li>
          <li>Rimraf.eth</li>
        </ul>
        <h3>Coming Soon</h3>
        <ul>
          <li>Use your NFTs on the Ethereum mainnet</li>
          <li>Multiplayer</li>
        </ul>
        <h3>Licensing</h3>
        <p>All source code is provided under a GPL 3 license. Art is &copy;2022 CYUBEART, all rights reserved, and is not provided under an
          open source or creative commons license.</p>
          <p>Sound effects were obtained royalty free under the Creative Commons CC0 license.</p>
        <h3>Tech Stack</h3>
        <ul>
          <li>React/TypeScript</li>
          <li>Kaboom game engine</li>
          <li>Solidity</li>
        </ul>
        
      </div>
    </MainLayout>
  )
}
