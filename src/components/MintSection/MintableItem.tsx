import { useMint, useConnection } from '../../providers'
import type { IRawGameObject } from '../../providers/types'
import {
  ItemWrapper,
  ItemGraphic,
  ItemOverlay,
  ItemSelectedCheck,
} from '../shared'
import { useState } from 'react'

export const GameItem = (gameObject: IRawGameObject) => {
  const [isSelected, setIsSelected] = useState<boolean>(false)
  const { selection, handleSelection } = useMint()
  const { isConnected } = useConnection()

  const handleSelect = (mechSuit: IRawGameObject) => {
    handleSelection(mechSuit)
    const sameSelected = selection?.objectName === gameObject.objectName
    if (isSelected === null) {
      setIsSelected(true)
      return
    }
    if (isSelected && sameSelected) {
      setIsSelected(false)
      return
    }

    if (!isSelected) {
      setIsSelected(true)
      return
    }
  }

  return (
    <ItemWrapper
      $selected={isSelected}
      onClick={() => handleSelect(gameObject)}
    >
      <ItemSelectedCheck $selected={isSelected} />
      <ItemOverlay $isConnected={isConnected} selected={isSelected} />
      <ItemGraphic $image={gameObject.objectImageUrl} />
    </ItemWrapper>
  )
}
