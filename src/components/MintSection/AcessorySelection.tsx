import { Acessory } from "./Acessory"
import { ACESSORIES, IAcessory } from "./sprites"
import styled from 'styled-components'

const AcessorySelectContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
`

export const AcessorySelection = () => {
  const handleSelect = (acessory: IAcessory) => {
  }
  return (
    <>
      <AcessorySelectContainer>
        {ACESSORIES?.map((acessory, i) => (
          <Acessory key={i} acessory={acessory} handleSelect={handleSelect} />
        ))}
      </AcessorySelectContainer>
    </>
  )
}
