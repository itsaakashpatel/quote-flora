// ThemeContext.js

import React, { createContext, useContext, useState } from 'react';
import { lightTheme, darkTheme } from '../themes/themes'; // Adjust the import path

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  const toggleTheme = () => {
    setIsDarkTheme((prev) => !prev);
  };

  const currentTheme = isDarkTheme ? darkTheme : lightTheme;

  return (
    <ThemeContext.Provider value={{ toggleTheme, isDarkTheme, currentTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
