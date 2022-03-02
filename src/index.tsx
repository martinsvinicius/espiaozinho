import React from 'react'
import ReactDOM from 'react-dom'
import { ChakraProvider } from '@chakra-ui/react'

import App from './pages/App'
import { theme } from './theme'
import { ContextProvider } from './contexts/PlayersContext'

ReactDOM.render(
  <React.StrictMode>
    <ContextProvider>
      <ChakraProvider theme={theme}>
        <App />
      </ChakraProvider>
    </ContextProvider>
  </React.StrictMode>,
  document.getElementById('root')
)
