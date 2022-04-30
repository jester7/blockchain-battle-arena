import { createRoot } from 'react-dom/client'
import { MoralisProvider } from 'react-moralis'
import App from './App'
import React from 'react'
import {
  ConnectionProvider,
  LoadingProvider,
  NetworkProvider,
  ErrorProvider,
  GameProvider
} from './providers'

import 'normalize.css'
import 'react-toastify/dist/ReactToastify.css'

const root = createRoot(document.getElementById('root') as HTMLElement)

const {
  REACT_APP_MORALIS_SERVER_URL = '',
  REACT_APP_MORALIS_APP_ID = ''
} = process.env

root.render(
  <React.StrictMode>
    <MoralisProvider
      serverUrl={REACT_APP_MORALIS_SERVER_URL}
      appId={REACT_APP_MORALIS_APP_ID}
    >
      <ConnectionProvider>
        <NetworkProvider>
          <LoadingProvider>
            <ErrorProvider>
              <GameProvider>
                <App />
              </GameProvider>
            </ErrorProvider>
          </LoadingProvider>
        </NetworkProvider>
      </ConnectionProvider>
    </MoralisProvider>
  </React.StrictMode>
)
