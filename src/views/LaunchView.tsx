import { MainLayout } from '../components/Layout/MainLayout'
import { SectionContainer } from '../components/shared/SectionContainer'
import { SubHeading } from '../components/shared/SubHeading'
import { Paragraph } from '../components/shared/Paragraph'
import { UnorderedList, ListItem } from '../components/shared/Lists'
import { useGame } from '../providers'
import { useEffect } from 'react'

export const LaunchView = () => {
  const { playerNfts } = useGame()

  useEffect(() => {
    ;(async () => {
      try {
        if (true) {

        }
      } catch (e) {
        console.error(e)
      }
    })()
  },[])

  return (
    <MainLayout>
      <>
        <SectionContainer>
          <SubHeading>Keyboard Controls</SubHeading>
          <UnorderedList>
            <ListItem>Move with left and right arrow keys</ListItem>
            <ListItem>Jump with the space bar</ListItem>
            <ListItem>Shoot with either control key</ListItem>
            <ListItem>Activate shield with either shift key</ListItem>
          </UnorderedList>
          <SubHeading>Choose one of your NFTs for battle</SubHeading>
          <Paragraph>Click on a character to pick it.</Paragraph>
          {playerNfts?.map((nft, i) => (
            <pre key={i}>{JSON.stringify(nft, null, 2)}</pre>
          ))}
          <SubHeading>Choose a Mech</SubHeading>
          {/* <p></p>
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
          </div> */}
          <SubHeading>Choose a Gun</SubHeading>
          {/* <div className='nft-container guns'>
            <div
              className={
                'nft-item accessory-image ' +
                (gun === 'smallgun' ? 'chosen' : '')
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
          </div> */}{' '}
        </SectionContainer>
      </>
    </MainLayout>
  )
}
