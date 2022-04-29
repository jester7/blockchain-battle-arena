import { AccountInfo } from './AccountInfo'
import { ConnectButton } from './ConnectButton'
import { SectionContainer } from '../shared/SectionContainer'
import { useAuthentication } from '../../providers'
import styled from 'styled-components'
import { SPACING } from '../../styles'

const ConnectSection = styled(SectionContainer)`
  padding: ${SPACING.primary};
`

export const ConnectionSection = () => {
  const { isConnected } = useAuthentication()
  return (
    <ConnectSection>
      {isConnected ? <AccountInfo /> : <ConnectButton />}
    </ConnectSection>
  )
}
