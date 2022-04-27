interface IActionHeadingProps {
  text: string
}
export const ActionHeading = ({ text }: IActionHeadingProps): JSX.Element => {
  return <h4 className='action-heading'>{text}</h4>
}
