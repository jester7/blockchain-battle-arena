interface IAcessoryProps {
  id: string
  idx: number
  handleMint: (idx: number) => void
}

export const Acessory = ({ id, idx, handleMint }: IAcessoryProps) => {
  return (
    <div
      className='accessory-image nft-item image'
      id={id}
      onClick={() => handleMint(idx)}
    ></div>
  )
}
