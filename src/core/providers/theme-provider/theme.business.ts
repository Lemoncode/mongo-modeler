import { ThemeModel, createInitialTheme } from './theme.model';
import {
  saveValueToLocalStorage,
  retrieveValueFromLocalStorage,
} from '@/common/local-storage';

export const saveThemePreferenceToLocalStorage = (themeValue: string): void => {
  saveValueToLocalStorage('themeMode', themeValue);
};

export const retrieveThemePreferenceFromLocalStorage = (): ThemeModel => {
  const themeMode = retrieveValueFromLocalStorage<'dark' | 'light'>(
    'themeMode'
  );

  if (themeMode !== null) {
    return { themeMode };
  } else {
    return createInitialTheme();
  }
};
