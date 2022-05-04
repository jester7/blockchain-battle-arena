import { AccountInfo } from './AccountInfo'
import { ConnectButton } from './ConnectButton'
import { SectionContainer } from '../shared/SectionContainer'
import { useConnection } from '../../providers'

export const ConnectionSection = () => {
  const { isConnected } = useConnection()
  return (
    <SectionContainer>
      {isConnected ? <AccountInfo /> : <ConnectButton />}
    </SectionContainer>
  )
}
