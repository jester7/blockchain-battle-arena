import { ConnectionFooter } from '../Connection'
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
  z-index: 10000;
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
            <NavbarSection />
            {children}
            <ConnectionFooter />
          </>
        </RightSection>
      </MainContainer>
    </>
  )
}
