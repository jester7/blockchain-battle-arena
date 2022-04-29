import { ConnectionFooter } from '../Connection'
import { ErrorDisplay } from '../shared/ErrorDisplay'
import { LeftSection } from './LeftSection'
import { NavbarSection } from './NavbarSection'
import { RightSection } from './RightSection'
import styled from 'styled-components'

const MainContainer = styled.div`
  display: grid;
  height: 100vh;
  grid-template-columns: 40% auto;
`

export const MainLayout = ({ children }: IProps) => {
  return (
    <MainContainer>
      <LeftSection />
      <RightSection>
        <>
          <ErrorDisplay />
          <NavbarSection />
          {children}
          <ConnectionFooter />
        </>
      </RightSection>
    </MainContainer>
  )
}
