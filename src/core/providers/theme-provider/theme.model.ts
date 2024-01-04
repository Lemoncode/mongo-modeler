export interface ThemeModel {
  themeMode: 'dark' | 'light';
}

export const createInitialTheme = (): ThemeModel => ({
  themeMode: 'light',
})