import styled from 'styled-components'

export const TILE_SIZE = '250PX'

export const ItemGrid = styled.div`
  display: grid;
  grid-auto-flow: column;
  justify-content: space-evenly;
  margin: 1rem 0;
`

export const ItemWrapper = styled((props) => <div {...props} />)`
  position: relative;
  cursor: pointer;
  border-radius: 1rem;
  width: ${TILE_SIZE};
  height: ${TILE_SIZE};
  box-shadow: 18px 21px 35px 1px rgba(0, 0, 0, 0.57);
  padding: 0.2rem;
`

export const ItemGraphic = styled((props) => <div {...props} />)`
  position: relative;
  border-radius: 1rem;
  background-image: url('${(props) => props.$image}');
  background-repeat: no-repeat;
  background-size: cover;
  width: ${TILE_SIZE};
  height: ${TILE_SIZE};
`

export const ItemOverlay = styled((props) => <div {...props} />)`
  display: ${(props) =>
    !props.$selected && props.$isConnected ? 'block' : 'none'};
  position: absolute;
  border-radius: 1rem;
  width: ${TILE_SIZE};
  height: ${TILE_SIZE};

  z-index: 1;
  &:hover {
    background-color: rgba(255, 153, 36, 0.5);
    transition: background-color 0.5s;
  }
`

export const ItemSelectedCheck = styled((props) => <div {...props} />)`
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

export const BackgroundWrapper = styled(ItemWrapper)`
  background: rgba(40, 50, 60, 0.9);
  padding: 1rem;
`
