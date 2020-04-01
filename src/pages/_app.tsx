import React from 'react';
import { AppProps } from 'next/app';
import { ThemeProvider } from 'styled-components';
import theme from '../theme';
import '../styles.css';

const App = ({ Component, pageProps }: AppProps) => (
  <ThemeProvider theme={theme}>
    <Component {...pageProps} />
  </ThemeProvider>
);

export default App;
