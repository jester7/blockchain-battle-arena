import { ConnectionFooter } from '../Connection'
import { ErrorDisplay } from '../shared/ErrorDisplay'
import { LeftSection } from './LeftSection'
import { NavbarSection } from './NavbarSection'
import { RightSection } from './RightSection'
import styled from 'styled-components'

const MainContainer = styled.div`
  all: revert;
  display: grid;
  grid-template-columns: 40% auto;
  grid-template-rows: 100%;
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
