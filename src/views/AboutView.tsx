import { MainLayout } from '../components/Layout/MainLayout'

export const AboutView = () => {
  return (
    <MainLayout>
      <div className='home section visible'>
        <h1 className='main-heading'>About</h1>
        <ul>
          <li>StrictlyKappa</li>
          <li>Jovan Jester</li>
        </ul>
        <p>
          <span className='bcba'>Blockchain Battle Arena </span>
          is a battle game for your NFT characters.
        </p>
        <h3>Tech Stack</h3>

        <ul>
          <li>React/TypeScript</li>
          <li>Kaboom game engine</li>
          <li>Solidity on Rinkeby</li>
        </ul>
        <h3>Coming Soon</h3>
        <ul>
          <li>Multiplayer</li>
          <li>Use your NFTs on the Ethereum mainnet</li>
        </ul>
      </div>
    </MainLayout>
  )
}
