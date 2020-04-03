import React from 'react';
import { ThemeProvider } from 'styled-components';
import { ScreenHeightContext, screenHeight } from '../../helpers/hooks/screenHeightContext';
import { theme } from '../../tailwind.config';
import Router from './Router';

const App = () => {
  return (
    <ScreenHeightContext.Provider value={screenHeight}>
      <ThemeProvider theme={theme}>
        <Router />
      </ThemeProvider>
    </ScreenHeightContext.Provider>
  );
};

export default App;
