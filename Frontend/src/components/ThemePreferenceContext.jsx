import React, { createContext, useState, useContext, useEffect } from 'react';

const ThemePreferenceContext = createContext();

export const ThemePreferenceProvider = ({ children, initialMode, onModeChange }) => {
  const [mode, setMode] = useState(initialMode);

  useEffect(() => {
    const savedMode = localStorage.getItem('darkMode');
    if (savedMode === null) {
      const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setMode(prefersDarkMode ? 'dark' : 'light');
      localStorage.setItem('darkMode', prefersDarkMode);
    }
  }, []);

  const toggleColorMode = () => {
    const newMode = mode === 'light' ? 'dark' : 'light';
    setMode(newMode);
    onModeChange(newMode);
  };

  return (
    <ThemePreferenceContext.Provider value={{ mode, toggleColorMode }}>
      {children}
    </ThemePreferenceContext.Provider>
  );
};

export const useThemePreference = () => useContext(ThemePreferenceContext);