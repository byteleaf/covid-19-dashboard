import React from 'react';

export const screenHeight = document.children[0].clientHeight;

export const ScreenHeightContext = React.createContext(screenHeight);
