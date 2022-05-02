import { useConnection } from '../../providers'
import { useMint } from '../../providers/MintProvider'
import styled from 'styled-components'
import type { IMintable } from './sprites'

const ItemWrapper = styled((props) => <div {...props} />)`
  position: relative;
  cursor: pointer;
  border-radius: 1rem;
  margin: 1rem;
  width: 200px;
  height: 200px;
`

const ItemGraphic = styled((props) => <div {...props} />)`
  position: relative;
  border-radius: 1rem;
  background-image: url('${(props) => props.$image}');
  background-repeat: no-repeat;
  background-size: cover;
  width: 200px;
  height: 200px;
`

const Overlay = styled((props) => <div {...props} />)`
  display: ${(props) =>
    !props.$selected && props.$isConnected ? 'block' : 'none'};
  position: absolute;
  border-radius: 1rem;
  width: 200px;
  height: 200px;
  z-index: 1;
  &:hover {
    background-color: rgba(255, 153, 36, 0.5);
    transition: background-color 0.5s;
  }
`

const SelectedCheck = styled((props) => <div {...props} />)`
  display: ${(props) => (props.$selected ? 'block' : 'none')};
  &:before {
    position: absolute;
    content: '✓';
    color: green;
    font-size: 5rem;
    width: 100px;
    height: 100px;
    top: -20px;
    left: 10px;
    z-index: 3;
  }
`

export const GameItem = (gameObject: IMintable) => {
  const { selection, handleSelection } = useMint()
  const { isConnected } = useConnection()

  const isSelected = selection?.name === gameObject.name

  return (
    <ItemWrapper
      $selected={isSelected}
      onClick={() => handleSelection(gameObject)}
    >
      <SelectedCheck $selected={isSelected} />
      <Overlay $isConnected={isConnected} selected={isSelected} />
      <ItemGraphic $image={gameObject.url} />
    </ItemWrapper>
  )
}
