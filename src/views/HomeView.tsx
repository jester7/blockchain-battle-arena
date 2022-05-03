import { Link } from 'react-router-dom'
import { MainLayout } from '../components/Layout/MainLayout'

export const HomeView = () => {
  return (
    <MainLayout>
      <div className='home section'>
        <h1 className='main-heading'>Welcome</h1>
        <p>
          <span className='bcba'>Blockchain Battle Arena</span> is a battle game for your NFT characters.
          We have included a small
          sample NFT collection with some exciting innovations beyond that of
          the ERC721 NFT standard that is used by most profile picture NFT
          collectibles today.
        </p>
        <h3>Work in progress</h3>
        <p>
          Please click on <Link to='/launch-game'>Launch Game</Link> to play a demo of the game.
            For now minting is disabled since we are updating the minting functionality and the web app. Please check back in a couple of days.
        </p>
        
      </div>
    </MainLayout>
  )
}
