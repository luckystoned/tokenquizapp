import {
  useEffect
} from 'react';
import { getLibrary } from '../config/web3'
import { Web3ReactProvider } from '@web3-react/core'
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import theme from '../theme';


import '../styles/globals.css'

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
