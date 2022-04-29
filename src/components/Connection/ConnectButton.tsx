import { useState } from 'react'
import { useMoralis } from 'react-moralis'
import { useAuthentication } from '../../providers'
import { ProgressLoader } from '../shared'
import { FlashingButton } from './FlashingButton'

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
    <FlashingButton disabled={loading} onClick={connectWallet}>
      Connect Wallet
    </FlashingButton>
  ) : null
}
