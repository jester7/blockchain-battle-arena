import { FlashingButton, ProgressLoader } from '../shared'
import { useConnection, useToast } from '../../providers'
import { useMoralis } from 'react-moralis'
import { useState } from 'react'

export const ConnectButton = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const { isConnecting } = useConnection()
  const { authenticate } = useMoralis()
  const { triggerError } = useToast()

  const renderLoadingBar = () => {
    return <ProgressLoader />
  }

  const connectWallet = async () => {
    try {
      setLoading(true)
      await authenticate({ signingMessage: 'Blockchain Battle Arena' })
      setLoading(false)
    } catch (e) {
      console.log('connect error')
      triggerError('Therre was an issue connecting wallet')
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
