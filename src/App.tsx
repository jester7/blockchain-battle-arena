import {
  BrowserRouter as Router,
  Route,
  Routes,
} from 'react-router-dom'
import { AboutView } from './views/AboutView'
import { HomeView } from './views/HomeView'
import { LaunchView } from './views/LaunchView'
import { MintView } from './views/MintView'
import { NotFoundView } from './views/NotFoundView'
import { GameView } from './views/GameView'

import './App.css'


function App() {
  return (
    <div className='App'>
      <div className='container'>
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
      </div>
    </div>
  )
}

export default App
