import React, { useContext, useState, createContext } from "react";
const ThemeModeContext = createContext();
const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const toggleTheme = () => {
    setIsDarkMode((prevMode) => !prevMode);};
  return (
    <ThemeModeContext.Provider value={{ isDarkMode, toggleTheme }}>
      {children}
    </ThemeModeContext.Provider>
  );
};
const useThemeMode = () => {
  return useContext(ThemeModeContext);
};
export { ThemeProvider, useThemeMode };
