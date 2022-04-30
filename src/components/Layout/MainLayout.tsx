import { ConnectionFooter } from '../Connection'
import { ErrorDisplay } from '../shared/ErrorDisplay'
import { LeftSection } from './LeftSection'
import { NavbarSection } from './NavbarSection'
import { RightSection } from './RightSection'
import styled from 'styled-components'
import { ToastContainer } from 'react-toastify'
import { FullScreenLoader } from '../shared/FullScreenLoader'
import { useLoading } from '../../providers'

const MainContainer = styled.div`
  display: grid;
  grid-template-columns: 40% auto;
`
const Notifications = styled.div`
  position: relative;
  z-index: 1000;
`

export const MainLayout = ({ children }: IProps) => {
  const { isLoading } = useLoading()
  return (
    <>
      <Notifications>
        <ToastContainer />
        {isLoading && <FullScreenLoader />}
      </Notifications>
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
    </>
  )
}
