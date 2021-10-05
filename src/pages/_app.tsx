import type { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'
import { theme } from '../styles/theme'
import { PatientProvider } from '../contexts/PatientContext'

function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <PatientProvider> 
        <Component {...pageProps} />
      </PatientProvider> 
    </ChakraProvider>
  )
}
export default App
