import { ConnectionSection } from '../Connection'
import { FullScreenLoader } from '../shared/FullScreenLoader'
import { LeftSection } from './LeftSection'
import { NavbarSection } from './NavbarSection'
import { RightSection } from './RightSection'
import { ToastContainer } from 'react-toastify'
import { useLoading } from '../../providers'
import styled from 'styled-components'

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
            <ConnectionSection />
          </>
        </RightSection>
      </MainContainer>
    </>
  )
}
