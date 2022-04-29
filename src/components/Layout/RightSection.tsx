import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin: 1.4rem;
  justify-content: space-around;
`

export const RightSection = ({ children }: IProps) => {
  return <Container>{children}</Container>
}
