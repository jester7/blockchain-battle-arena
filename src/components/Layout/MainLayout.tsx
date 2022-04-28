import { ConnectionFooter } from '../Connection'
import { ErrorDisplay } from '../shared/ErrorDisplay'
import { LeftCharacterSection } from './LeftCharacterSection'
import {NavbarSection} from './NavbarSection'

export const MainLayout = ({ children }: IProps) => {
  return (
    <>
      <LeftCharacterSection />
      <main className='main-container'>
        <>
          <ErrorDisplay />
          <NavbarSection />
          {children}
          <ConnectionFooter />
        </>
      </main>
    </>
  )
}
