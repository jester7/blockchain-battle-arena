import { GameItem } from './MintableItem'
import { ItemGrid } from '../shared'
import type { IRawGameObject } from '../../providers/types'

interface IItemsProps {
  items: IRawGameObject[]
}

export const ItemsGrid = ({ items }: IItemsProps) => {
  return (
    <ItemGrid>
      {items?.map((item, i) => (
        <GameItem key={i} {...item} />
      ))}
    </ItemGrid>
  )
}
