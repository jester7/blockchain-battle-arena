import { IMintable } from './sprites'
import { MintableItem } from './MintableItem'
import styled from 'styled-components'

const ItemGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
`

interface IItemsProps {
  items: IMintable[]
}

export const ItemsGrid = ({ items }: IItemsProps) => {
  return (
    <ItemGrid>
      {items?.map((item, i) => (
        <MintableItem key={i} {...item} />
      ))}
    </ItemGrid>
  )
}
