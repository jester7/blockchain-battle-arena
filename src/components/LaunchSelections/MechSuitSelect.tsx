import { useConnection } from '../../providers'
import { useState } from 'react'
import type { IRawGameObject } from '../../providers/types'
import {
  BackgroundWrapper,
  DEFAULT_MECH_SUITS,
  ItemGraphic,
  ItemGrid,
  ItemOverlay,
  ItemSelectedCheck,
  SubHeading,
} from '../shared'

const MechSuitObject = (gameObject: IRawGameObject) => {
  const [selectedMechSuit, setSelectedMechSuit] = useState<IRawGameObject>()
  const [isSelected, setIsSelected] = useState<Nullable<boolean>>(null)
  const { isConnected } = useConnection()

  const handleSelection = (mechSuit: IRawGameObject) => {
    setSelectedMechSuit(mechSuit)
    const sameSelected = selectedMechSuit?.objectName === gameObject.objectName
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
    <BackgroundWrapper
      $selected={isSelected}
      onClick={() => handleSelection(gameObject)}
    >
      <ItemSelectedCheck $selected={isSelected} />
      <ItemOverlay $isConnected={isConnected} selected={isSelected} />
      <ItemGraphic $image={gameObject.objectImageUrl} />
    </BackgroundWrapper>
  )
}

export const MechSuitSelect = () => {
  return (
    <>
      <SubHeading>Select your mech suit</SubHeading>
      <ItemGrid>
        {DEFAULT_MECH_SUITS?.map((item, i) => (
          <MechSuitObject key={i} {...item} />
        ))}
      </ItemGrid>
    </>
  )
}
