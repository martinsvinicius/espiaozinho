import { BrowserRouter } from 'react-router-dom'
import { ChakraProvider } from '@chakra-ui/react'
import { ToastContainer } from 'react-toastify'

import 'react-toastify/dist/ReactToastify.css'

import { ContextProvider } from '../contexts/PlayersContext'
import { AppRoutes } from '../routes/index.routes'
import { theme } from '../theme'

export default function App() {
  return (
    <BrowserRouter>
      <ContextProvider>
        <ChakraProvider theme={theme}>
          <AppRoutes />
          <ToastContainer theme="colored" />
        </ChakraProvider>
      </ContextProvider>
    </BrowserRouter>
  )
}
