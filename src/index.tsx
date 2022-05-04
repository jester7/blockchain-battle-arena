import { createRoot } from 'react-dom/client'
import { MoralisProvider } from 'react-moralis'
import { BrowserRouter as Router } from 'react-router-dom'
import App from './App'
import React from 'react'
import {
  ConnectionProvider,
  LoadingProvider,
  NetworkProvider,
  ToastProvider,
  GameProvider,
} from './providers'

import 'react-toastify/dist/ReactToastify.css'
import 'normalize.css'

const root = createRoot(document.getElementById('root') as HTMLElement)

const { REACT_APP_MORALIS_SERVER_URL = '', REACT_APP_MORALIS_APP_ID = '' } =
  process.env

root.render(
  <React.StrictMode>
    <MoralisProvider
      serverUrl={REACT_APP_MORALIS_SERVER_URL}
      appId={REACT_APP_MORALIS_APP_ID}
    >
      <Router>
        <ConnectionProvider>
          <NetworkProvider>
            <LoadingProvider>
              <ToastProvider>
                <GameProvider>
                  <App />
                </GameProvider>
              </ToastProvider>
            </LoadingProvider>
          </NetworkProvider>
        </ConnectionProvider>
      </Router>
    </MoralisProvider>
  </React.StrictMode>
)
