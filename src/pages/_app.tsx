import React from 'react';
import { AppProps } from 'next/app';
import { ThemeProvider } from 'styled-components';
import theme from '../theme';
import '../styles.css';
import { ScreenHeightContext, screenHeight } from '../helpers/hooks/screenHeightContext';

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <ScreenHeightContext.Provider value={screenHeight}>
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </ScreenHeightContext.Provider>
  );
};

export default App;
