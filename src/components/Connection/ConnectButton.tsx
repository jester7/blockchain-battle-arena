import { useState } from 'react'
import { useMoralis } from 'react-moralis'
import { useAuthentication } from '../../providers'
import { ActionButton, ActionHeading, ProgressLoader } from '../shared'

export const ConnectButton = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const { authenticate } = useMoralis()
  const { isConnected } = useAuthentication()

  const renderLoadingBar = () => {
    return <ProgressLoader />
  }

  const connectWallet = async () => {
    setLoading(true)
    await authenticate()
    setLoading(false)
  }

  if (loading) {
    return renderLoadingBar()
  }

  return !isConnected ? (
    <div>
      <ActionHeading text='Connect your wallet' />
      <ActionButton disabled={loading} text='Connect' onClick={connectWallet} />
    </div>
  ) : null
}
