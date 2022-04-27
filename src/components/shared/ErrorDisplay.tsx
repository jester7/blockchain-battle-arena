import { useError } from '../../providers'

export const ErrorDisplay = () => {
  const { error } = useError()
  return error ? <p>{error}</p> : null
}
