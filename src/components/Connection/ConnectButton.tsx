import { useState } from 'react'
import { useMoralis } from 'react-moralis'
import { useConnection } from '../../providers'
import { ProgressLoader } from '../shared'
import { FlashingButton } from '../shared/FlashingButton'

export const ConnectButton = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const { authenticate } = useMoralis()
  const { isConnecting } = useConnection()

  const renderLoadingBar = () => {
    return <ProgressLoader />
  }

  const connectWallet = async () => {
    try {
      setLoading(true)
      await authenticate()
      setLoading(false)
    } catch (e) {
      console.log('connect error')
    }
  }

  if (loading) {
    return renderLoadingBar()
  }

  return isConnecting ? (
    <ProgressLoader />
  ) : (
    <FlashingButton disabled={loading} onClick={connectWallet}>
      Connect Wallet
    </FlashingButton>
  )
}
