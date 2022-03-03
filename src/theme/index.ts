import { extendTheme } from '@chakra-ui/react'

export const theme = extendTheme({
  colors: {
    black: {
      300: '#01161E',
    },
    purple: {
      500: '#7067CF',
      50: '#B7C0EE',
    },
  },
  styles: {
    global: {
      body: {
        bgColor: 'black.300',
        fontFamily: 'Roboto, sans-serif',
      },
    },
  },
})
