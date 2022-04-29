import { Acessory } from "./Acessory"
import { ACESSORIES } from "./sprites"
import styled from 'styled-components'

const AcessorySelectContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
`

export const AcessorySelection = () => {
  const handleAcessorySelect = (id: string) => {
  }
  return (
    <>
      <AcessorySelectContainer>
        {ACESSORIES?.map((acessory, i) => (
          <Acessory key={i} {...acessory} handleSelect={handleAcessorySelect} />
        ))}
      </AcessorySelectContainer>
    </>
  )
}
