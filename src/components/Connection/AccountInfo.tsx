import { FlashingButton, Paragraph } from '../shared'
import { useConnection, useGame } from '../../providers'
import styled from 'styled-components'

const AccountContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 90%;
`
const AccountText = styled(Paragraph)`
  padding: 0;
  margin: 0;
`
const Yellow = styled.span`
  color: yellow;
`

export const AccountInfo = () => {
  const { readyToLaunch, launchGame } = useGame()
  const { accountDisplayName } = useConnection()

  return (
    <AccountContainer>
      {readyToLaunch ? (
        <FlashingButton onClick={launchGame}>Launch Game</FlashingButton>
      ) : (
        <AccountText>
          Connected as <Yellow>{accountDisplayName}</Yellow>
        </AccountText>
      )}
    </AccountContainer>
  )
}
