import { createContext, useState, useContext } from 'react';
const ColorModeContext = createContext();
export const ColorModeProvider = ({ children }) => {
  const [mode, setMode] = useState('light');
  const toggleColorMode = () => {
    setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
  };
  return (
    <ColorModeContext.Provider value={{ mode, toggleColorMode }}>
      {children}
    </ColorModeContext.Provider>
  );
};
export const useColorMode = () => {
  return useContext(ColorModeContext);
};
