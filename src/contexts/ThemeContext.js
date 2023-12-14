import React, {createContext, useContext, useState} from 'react';
import {lightTheme, darkTheme} from '../themes/themes';
import {FONT_FAMILY} from '../themes/fonts';
const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({children}) => {
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [currentFont, setCurrentFont] = useState(null);

  const toggleTheme = () => {
    setIsDarkTheme((prev) => !prev);
  };

  const fontSelectHandler = (key) => {
    if (key === 'nutino') {
      setCurrentFont(FONT_FAMILY.nutino);
    }
  };

  const currentTheme = isDarkTheme ? darkTheme : lightTheme;

  return (
    <ThemeContext.Provider
      value={{toggleTheme, isDarkTheme, currentTheme, currentFont, fontSelectHandler}}
    >
      {children}
    </ThemeContext.Provider>
  );
};
