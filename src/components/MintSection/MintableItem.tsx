import { useState } from 'react'
import styled from 'styled-components'
import { useConnection } from '../../providers'
import { useMint } from '../../providers/MintProvider'
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
  background-image: url('${(props) => props.image}');
  background-repeat: no-repeat;
  background-size: cover;
  width: 200px;
  height: 200px;
`

interface IOverlayProps {
  isConnected: boolean
  selected: boolean
}

const overlayForConnected = ({ isConnected, selected }: IOverlayProps) => {
  const enable = !selected && isConnected
  return enable ? 'block' : 'none'
}

const Overlay = styled((props) => <div {...props} />)`
  display: ${overlayForConnected};
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
  display: ${(props) => (props.selected ? 'block' : 'none')};
  &:before {
    position: absolute;
    content: '✓';
    color: green;
    font-size: 5rem;
    width: 100px;
    height: 100px;
    top: -20px;
    left: 10px;
    z-index: 30;
  }
`

export const GameItem = (character: IMintable) => {
  const { selections, handleSelection } = useMint()
  const [isSelected, setIsSelected] = useState<boolean>(false)
  const { isConnected } = useConnection()

  const select = (character: IMintable) => {
    const foundInSelectionState =
      selections?.filter((s) => s.name === character.name).length !== 0
    if (foundInSelectionState && isSelected) {
      setIsSelected(false)
      handleSelection(character)
      return
    } else {
      setIsSelected(true)
      handleSelection(character)
    }
  }

  return (
    <ItemWrapper selected={isSelected} onClick={() => select(character)}>
      <SelectedCheck selected={isSelected} />
      <Overlay isConnected={isConnected} selected={isSelected} />
      <ItemGraphic image={character.image} />
    </ItemWrapper>
  )
}
