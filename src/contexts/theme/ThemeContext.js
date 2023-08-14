import { createContext } from 'react';

const initialState = {
  theme: 'light-theme',
  bgColor: '#F8F8F8',
  color: '#2A2A2A',
  setTheme: () => {},
};

export const ThemeContext = createContext(initialState);
