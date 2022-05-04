import { COLORS } from './styles'
import { Route, Routes } from 'react-router-dom'
import Background from './assets/home-background.jpg'
import styled from 'styled-components'
import {
  AboutView,
  GameView,
  HomeView,
  LaunchView,
  MintView,
  NotFoundView,
} from './views'

const AppContainer = styled.div`
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
    <AppContainer>
      <Routes>
        <Route path="/" element={<HomeView />} />
        <Route path="/about" element={<AboutView />} />
        <Route path="/mint" element={<MintView />} />
        <Route path="/launch-game" element={<LaunchView />} />
        <Route path="/game" element={<GameView />} />{' '}
        <Route path="*" element={<NotFoundView />} />
      </Routes>
    </AppContainer>
  )
}

export default App
