import React from 'react';
import { ThemeContext } from './theme-context';
import { ThemeModel, createInitialTheme } from './theme.model';

interface Props {
  children: React.ReactNode;
}
export const ThemeProvider: React.FC<Props> = (props) => {
  const { children } = props;
  const [theme, setTheme] = React.useState<ThemeModel>(createInitialTheme());

  const toggleTheme = () => {
    setTheme((prevTheme) => ({
      ...prevTheme,
      themeMode: prevTheme.themeMode === 'light' ? 'dark' : 'light',
    }));
  };

  return (
    <ThemeContext.Provider value={{theme, toggleTheme}}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useThemeContext = () => {
  const context = React.useContext(ThemeContext);
  if (context === null) {
    throw new Error('useThemeContext: Ensure you have wrapped your app with ThemeProvider');
  }

  return context;
};