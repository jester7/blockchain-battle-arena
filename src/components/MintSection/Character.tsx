interface ICharacterProps {
  id: string
  idx: number
  handleMint: (idx: number) => void
}

export const Character = ({ id, idx, handleMint }: ICharacterProps) => {
  return (
    <div
      className='nft-item character-image'
      id={id}
      onClick={() => handleMint(idx)}
    ></div>
  )
}
