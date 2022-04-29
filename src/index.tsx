import { createRoot } from 'react-dom/client'
import { MoralisProvider } from 'react-moralis'
import App from './App'
import React from 'react'
import {
  AuthenticationProvider,
  LoadingProvider,
  NetworkProvider,
  ErrorProvider,
} from './providers'
import 'normalize.css'

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
      <AuthenticationProvider>
        <NetworkProvider>
          <LoadingProvider>
            <ErrorProvider>
              <App />
            </ErrorProvider>
          </LoadingProvider>
        </NetworkProvider>
      </AuthenticationProvider>
    </MoralisProvider>
  </React.StrictMode>
)
