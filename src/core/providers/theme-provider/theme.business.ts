import {
  saveValueToLocalStorage,
  retrieveValueFromLocalStorage,
} from '@/common/local-storage';

export const saveThemeToLocalStorage = (
  themeKey: string,
  themeValue: string
): void => {
  saveValueToLocalStorage(themeKey, themeValue);
};

export const retrieveThemeFromLocalStorage = (
  themeKey: string
): void | null => {
  return retrieveValueFromLocalStorage(themeKey);
};
