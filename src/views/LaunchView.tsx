import { DefaultPlayerSelect } from '../components/LaunchSelections/DefaultPlayerSelect'
import { FlashingButton } from '../components/shared/FlashingButton'
import { MainLayout } from '../components/Layout'
import { MechSuitSelect } from '../components/LaunchSelections/MechSuitSelect'
import { PlayerNFTsSelect } from '../components/LaunchSelections/PlayerNFTsSelect'
import { useGame } from '../providers'
import { WeaponSelect } from '../components/LaunchSelections/WeaponSelect'
import {
  UnorderedList,
  ListItem,
  SubHeading,
  SectionContainer,
} from '../components/shared'

export const LaunchView = () => {
  const { playerNfts, readyToLaunch } = useGame()
  const filteredCharacters = playerNfts?.filter(
    (n) => n.objectType === 'character'
  )
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
          {filteredCharacters.length !== 0 ? (
            <PlayerNFTsSelect />
          ) : (
            <DefaultPlayerSelect />
          )}
          <WeaponSelect />
          <MechSuitSelect />
        </SectionContainer>
      </>
    </MainLayout>
  )
}
