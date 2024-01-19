import React from 'react';
import { ThemeContext } from './theme-context';
import { ThemeModel, createInitialTheme } from './theme.model';

interface Props {
  children: React.ReactNode;
}

export const ThemeProvider: React.FC<Props> = props => {
  const { children } = props;
  const [theme, setTheme] = React.useState<ThemeModel>(createInitialTheme());

  const chosenThemeMode = 'themeMode';

  const toggleTheme = () => {
    localStorage.setItem(
      chosenThemeMode,
      theme.themeMode === 'light' ? 'dark' : 'light'
    );

    setTheme(prevTheme => ({
      ...prevTheme,
      themeMode: prevTheme.themeMode === 'light' ? 'dark' : 'light',
    }));
  };

  React.useEffect(() => {
    const themeMode = localStorage.getItem(chosenThemeMode);
    if (themeMode) {
      setTheme(prevTheme => ({
        ...prevTheme,
        themeMode: themeMode as 'dark' | 'light',
      }));
    }
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useThemeContext = () => {
  const context = React.useContext(ThemeContext);
  if (context === null) {
    throw new Error(
      'useThemeContext: Ensure you have wrapped your app with ThemeProvider'
    );
  }

  return context;
};
