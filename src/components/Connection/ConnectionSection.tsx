import { AccountInfo } from './AccountInfo'
import { ConnectButton } from './ConnectButton'
import { useAuthentication } from '../../providers'

export const ConnectionSection = () => {
  const { isConnected } = useAuthentication()
  return (
    <div className='section action-container'>
      {isConnected ? <AccountInfo /> : <ConnectButton />}
    </div>
  )
}
