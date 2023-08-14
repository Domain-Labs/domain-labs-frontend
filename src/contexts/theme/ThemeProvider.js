import React, { useEffect, useState } from 'react';

import PropTypes from 'prop-types';
import { ThemeContext } from './ThemeContext';

const bgColors = {
  'dark-theme': '#020114',
  'light-theme': '#F8F8F8',
};

const colors = {
  'dark-theme': 'white',
  'light-theme': '#2A2A2A',
};

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light-theme');
  const [bgColor, setBgColor] = useState('#F8F8F8');
  const [color, setColor] = useState('#2A2A2A');

  useEffect(() => {
    setBgColor(bgColors[theme]);
    setColor(colors[theme]);
    var body = document.querySelector('body');
    // Set the background color
    body.style.backgroundColor = bgColors[theme];
  }, [theme]);

  return (
    <ThemeContext.Provider
      value={{
        theme,
        setTheme,
        bgColor,
        color,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

ThemeProvider.propTypes = {
  children: PropTypes.element,
};

export default ThemeProvider;
