import styled from 'styled-components'
import { SPACING } from '../../styles'

const Container = styled.div`
  display: grid;
  height: calc(100vh - ${SPACING.medium});
  grid-template-rows: 10% 80% 12%;
`

export const RightSection = ({ children }: IProps) => {
  return <Container>{children}</Container>
}
