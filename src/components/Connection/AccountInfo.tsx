import { useAuthentication } from '../../providers'

export const AccountInfo = () => {
  const { accountDisplayName } = useAuthentication()
  return (
    <div className='section action-container'>
      <p className='action-message'>Connected as {accountDisplayName}</p>
    </div>
  )
}
