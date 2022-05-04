import type { IRawGameObject } from '../../providers/types'
import { useConnection } from '../../providers'
import { useState } from 'react'
import {
  BackgroundWrapper,
  DEFAULT_WEAPONS,
  ItemGraphic,
  ItemGrid,
  ItemOverlay,
  ItemSelectedCheck,
  SubHeading,
} from '../shared'

const WeaponObject = (gameObject: IRawGameObject) => {
  const { isConnected } = useConnection()
  const [isSelected, setIsSelected] = useState<boolean>(false)
  const [selectedWeapon, setSelectedWeapon] = useState<IRawGameObject>()

  const handleSelection = (mechSuit: IRawGameObject) => {
    setSelectedWeapon(mechSuit)
    const sameSelected = selectedWeapon?.objectName === gameObject.objectName
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

export const WeaponSelect = () => {
  return (
    <>
      <SubHeading>Select your weapon</SubHeading>
      <ItemGrid>
        {DEFAULT_WEAPONS?.map((item, i) => (
          <WeaponObject key={i} {...item} />
        ))}
      </ItemGrid>
    </>
  )
}
