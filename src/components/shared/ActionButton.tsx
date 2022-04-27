interface IActionButtonProps {
  text: string
  disabled: boolean
  onClick: () => void
}

export const ActionButton = ({
  text,
  disabled,
  onClick,
}: IActionButtonProps): JSX.Element => {
  return (
    <button className='action-button' disabled={disabled} onClick={onClick}>
      {text}
    </button>
  )
}
