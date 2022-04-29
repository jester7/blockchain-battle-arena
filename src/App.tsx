import { AboutView } from './views/AboutView'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { GameView } from './views/GameView'
import { HomeView } from './views/HomeView'
import { LaunchView } from './views/LaunchView'
import { MintView } from './views/MintView'
import { NotFoundView } from './views/NotFoundView'
import Background from './assets/home-background.jpg'
import styled from 'styled-components'

import { COLORS } from './styles'

const AppWrapper = styled.div`
  height: 100vh;
  background-color: ${COLORS.greyDark};
  background-image: url('${Background}');
  background-attachment: fixed;
  background-size: cover;
  background-position: center left;
  color: ${COLORS.highlight};
`

function App() {
  return (
    <AppWrapper>
      <Router>
        <Routes>
          <Route path='/' element={<HomeView />} />
          <Route path='/about' element={<AboutView />} />
          <Route path='/mint' element={<MintView />} />
          <Route path='/launch-game' element={<LaunchView />} />
          <Route path='/game' element={<GameView />} />{' '}
          <Route path='*' element={<NotFoundView />} />
        </Routes>
      </Router>
    </AppWrapper>
  )
}

export default App
