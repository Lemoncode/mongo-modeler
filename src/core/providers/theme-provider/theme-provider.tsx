import React from 'react';
import { ThemeContext } from './theme-context';
import { ThemeModel } from './theme.model';
import {
  retrieveThemePreferenceFromLocalStorage,
  saveThemePreferenceToLocalStorage,
} from './theme.business';

interface Props {
  children: React.ReactNode;
}

export const ThemeProvider: React.FC<Props> = props => {
  const { children } = props;
  const [theme, setTheme] = React.useState<ThemeModel>(
    retrieveThemePreferenceFromLocalStorage
  );

  const toggleTheme = () => {
    setTheme(prevTheme => {
      const newTheme = {
        ...prevTheme,
        themeMode: prevTheme.themeMode === 'light' ? 'dark' : 'light',
      } as ThemeModel;

      try {
        saveThemePreferenceToLocalStorage(newTheme.themeMode);
      } catch (error) {
        throw new Error('Failed to save new theme preference to local storage');
      }

      return newTheme;
    });
  };

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
