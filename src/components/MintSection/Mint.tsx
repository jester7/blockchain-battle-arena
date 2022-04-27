import { MintCharacter } from './MintCharacter'
import { MintAcessory } from './MintAcessory'
import { MintButtonSection } from './MintButtonSection'
import { MintProvider } from './MintProvider'

export const Mint = () => {
  return (
    <MintProvider>
      <div className='home section visible'>
        <MintCharacter />
        <MintAcessory />
        <MintButtonSection />
      </div>
    </MintProvider>
  )
}
