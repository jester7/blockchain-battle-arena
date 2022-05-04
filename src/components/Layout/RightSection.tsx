import { SPACING } from '../../styles'
import styled from 'styled-components'

const Container = styled.div`
  display: grid;
  height: calc(100vh - ${SPACING.medium});
  grid-template-rows: 10% 1fr 12%;
`

export const RightSection = ({ children }: IProps) => {
  return <Container>{children}</Container>
}
