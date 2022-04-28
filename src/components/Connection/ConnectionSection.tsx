import { AccountInfo } from './AccountInfo'
import { COLORS, SPACING } from '../../styles'
import { ConnectButton } from './ConnectButton'
import { useAuthentication } from '../../providers'
import styled from 'styled-components'

const SectionContainer = styled.div`
  all: revert;
  display: flex;
  font-family: good-times, sans-serif;
  flex-direction: column;
  justify-content: flex-start;
  overflow-y: auto;
  overflow-x: hidden;
  scrollbar-color: ${COLORS.blueMedium} ${COLORS.blueDarkAlpha};
  scrollbar-width: thin;
  text-align: left;
  padding: 0.8rem ${SPACING.large};
  border-radius: ${SPACING.smallRadius};
  background-color: ${COLORS.greyDarkAlpha};
  box-shadow: ${COLORS.shadowBlueLight};
`

export const ConnectionSection = () => {
  const { isConnected } = useAuthentication()
  return (
    <SectionContainer>
      {isConnected ? <AccountInfo /> : <ConnectButton />}
    </SectionContainer>
  )
}
