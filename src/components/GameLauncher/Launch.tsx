import { useEffect } from 'react'
import { useLocalStorage } from '../../hooks/useLocalStorage'
import { useNavigate } from 'react-router-dom'
import { SectionContainer } from '../shared/SectionContainer'
import { SubHeading } from '../shared/SubHeading'
import { Paragraph } from '../shared/Paragraph'
import './launch.css'

export const Launch = () => {
  const [characterNum, setCharacterNum] = useLocalStorage('characterNum', 1)
  const [mech, setMech] = useLocalStorage('mech', 'red')
  const [gun, setGun] = useLocalStorage('gun', 'biggun')
  const navigate = useNavigate()

  const launchGame = () => {
    console.log('launchGame: ' + characterNum + ' ' + mech + ' ' + gun)
    navigate('/game')
  }

  useEffect(() => {}, [])

  return (
    <>
      <SectionContainer>
        <SubHeading>Keyboard Controls</SubHeading>
        <ul>
          <li>Move with left and right arrow keys</li>
          <li>Jump with the space bar</li>
          <li>Shoot with either control key</li>
          <li>Activate shield with either shift key</li>
        </ul>

        <SubHeading>Choose one of your NFTs for battle</SubHeading>
        <Paragraph>Click on a character to pick it.</Paragraph>
        <div className='nft-container nfts'>
          <div
            className={
              'nft-item character-image ' + (characterNum === 1 ? 'chosen' : '')
            }
            id='character1'
            onClick={() => {
              setCharacterNum(1)
            }}
          ></div>
          <div
            className={
              'nft-item character-image ' + (characterNum === 2 ? 'chosen' : '')
            }
            id='character2'
            onClick={() => {
              setCharacterNum(2)
            }}
          ></div>
          <div
            className={
              'nft-item character-image ' + (characterNum === 3 ? 'chosen' : '')
            }
            id='character3'
            onClick={() => {
              setCharacterNum(3)
            }}
          ></div>
        </div>
        <SubHeading>Choose a Mech</SubHeading>
        <p></p>
        <div className='nft-container mechs'>
          <div
            className={
              'nft-item accessory-image ' + (mech === 'red' ? 'chosen' : '')
            }
            id='mech-fighter-red'
            onClick={() => {
              setMech('red')
            }}
          ></div>
          <div
            className={
              'nft-item accessory-image ' + (mech === 'blue' ? 'chosen' : '')
            }
            id='mech-fighter-blue'
            onClick={() => {
              setMech('blue')
            }}
          ></div>
        </div>
        <SubHeading>Choose a Gun</SubHeading>
        <div className='nft-container guns'>
          <div
            className={
              'nft-item accessory-image ' + (gun === 'smallgun' ? 'chosen' : '')
            }
            id='smallgun'
            onClick={() => {
              setGun('smallgun')
            }}
          ></div>
          <div
            className={
              'nft-item accessory-image ' + (gun === 'biggun' ? 'chosen' : '')
            }
            id='biggun'
            onClick={() => {
              setGun('biggun')
            }}
          ></div>
        </div>
      </SectionContainer>
      <SectionContainer>
        <span className={true ? 'hidden' : 'action-message'}>
          Make your selection above then click the button to play.
        </span>
        <button
          className={true ? 'action-button' : 'action-button hidden'}
          onClick={launchGame}
          disabled={false}
        >
          Start Game
        </button>
      </SectionContainer>
    </>
  )
}
