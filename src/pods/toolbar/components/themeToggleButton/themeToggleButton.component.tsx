import { useThemeContext } from '@/core/providers';
import classes from './themeToggleButton.module.css';

export const ThemeToggleButton = () => {
  const { theme, toggleTheme } = useThemeContext();

  return (
    <button className={classes.switchTheme} onClick={toggleTheme}>
      {theme.themeMode === 'dark' ? (
        <svg xmlns="http://www.w3.org/2000/svg" width="1.2em" height="1.2em" viewBox="0 0 256 256"><path d="M238 96a6 6 0 0 1-6 6h-18v18a6 6 0 0 1-12 0v-18h-18a6 6 0 0 1 0-12h18V72a6 6 0 0 1 12 0v18h18a6 6 0 0 1 6 6m-94-42h10v10a6 6 0 0 0 12 0V54h10a6 6 0 0 0 0-12h-10V32a6 6 0 0 0-12 0v10h-10a6 6 0 0 0 0 12m71.25 100.28a6 6 0 0 1 1.07 6A94 94 0 1 1 95.76 39.68a6 6 0 0 1 7.94 6.79A90.11 90.11 0 0 0 192 154a90.9 90.9 0 0 0 17.53-1.7a6 6 0 0 1 5.72 1.98m-14.37 11.34q-4.42.38-8.88.38A102.12 102.12 0 0 1 90 64q0-4.45.38-8.88a82 82 0 1 0 110.5 110.5" /></svg>
      ) : (
        <svg xmlns="http://www.w3.org/2000/svg" width="1.2em" height="1.2em" viewBox="0 0 256 256"><path d="M122 40V16a6 6 0 0 1 12 0v24a6 6 0 0 1-12 0m68 88a62 62 0 1 1-62-62a62.07 62.07 0 0 1 62 62m-12 0a50 50 0 1 0-50 50a50.06 50.06 0 0 0 50-50M59.76 68.24a6 6 0 1 0 8.48-8.48l-16-16a6 6 0 0 0-8.48 8.48Zm0 119.52l-16 16a6 6 0 1 0 8.48 8.48l16-16a6 6 0 1 0-8.48-8.48M192 70a6 6 0 0 0 4.24-1.76l16-16a6 6 0 0 0-8.48-8.48l-16 16A6 6 0 0 0 192 70m4.24 117.76a6 6 0 0 0-8.48 8.48l16 16a6 6 0 0 0 8.48-8.48ZM46 128a6 6 0 0 0-6-6H16a6 6 0 0 0 0 12h24a6 6 0 0 0 6-6m82 82a6 6 0 0 0-6 6v24a6 6 0 0 0 12 0v-24a6 6 0 0 0-6-6m112-88h-24a6 6 0 0 0 0 12h24a6 6 0 0 0 0-12"/></svg>
      )}
    </button>
  )
}