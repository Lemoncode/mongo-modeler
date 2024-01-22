import React from 'react';
import { ThemeContext } from './theme-context';
import { ThemeModel, createInitialTheme } from './theme.model';
import {
  retrieveThemeFromLocalStorage,
  saveThemeToLocalStorage,
} from './theme.business';

interface Props {
  children: React.ReactNode;
}

export const ThemeProvider: React.FC<Props> = props => {
  const { children } = props;
  const [theme, setTheme] = React.useState<ThemeModel>(createInitialTheme());

  const chosenThemeModeKey = 'themeMode';
  const chosenThemeModeValue = theme.themeMode === 'light' ? 'dark' : 'light';

  const toggleTheme = () => {
    saveThemeToLocalStorage(chosenThemeModeKey, chosenThemeModeValue);

    setTheme(prevTheme => ({
      ...prevTheme,
      themeMode: prevTheme.themeMode === 'light' ? 'dark' : 'light',
    }));
  };

  React.useEffect(() => {
    const retrieveThemeMode = retrieveThemeFromLocalStorage(chosenThemeModeKey);

    if (retrieveThemeMode) {
      setTheme(prevTheme => ({
        ...prevTheme,
        themeMode: retrieveThemeMode,
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
