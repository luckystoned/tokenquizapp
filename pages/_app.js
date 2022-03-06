import {
  useEffect
} from 'react';
import { Web3ReactProvider } from '@web3-react/core'
import { ThemeProvider } from '@material-ui/core/styles';
import Web3 from 'web3'
import CssBaseline from '@material-ui/core/CssBaseline';
import theme from '../theme';


import '../styles/globals.css'


function getLibrary(provider) {
  return new Web3(provider)
}

function MyApp({ Component, pageProps }) {

  useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Component {...pageProps} />
      </ThemeProvider>
    </Web3ReactProvider>
  )
}

export default MyApp
