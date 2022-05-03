import { ConnectionFooter } from '../Connection'
import { ErrorDisplay } from '../shared/ErrorDisplay'
import { LeftCharacterSection } from './LeftCharacterSection'
import NavigationSection from './NavigationSection'

export const MainLayout = ({ children }: IProps) => {
  return (
    <>
      <LeftCharacterSection />
      <main className='main-container'>
        <>
          <ErrorDisplay />
          <NavigationSection />
          {children}
          {/* <ConnectionFooter /> */}
        </>
      </main>
    </>
  )
}
