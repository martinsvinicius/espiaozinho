import React from 'react'
import ReactDOM from 'react-dom'
import { ChakraProvider } from '@chakra-ui/react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import App from './pages/App'
import Game from './pages/Game'
import { theme } from './theme'
import { ContextProvider } from './contexts/PlayersContext'

ReactDOM.render(
  <React.StrictMode>
    <ContextProvider>
      <ChakraProvider theme={theme}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<App />} />
            <Route path="game" element={<Game />} />
          </Routes>
        </BrowserRouter>
      </ChakraProvider>
    </ContextProvider>
  </React.StrictMode>,
  document.getElementById('root')
)
