import { createContext } from 'react';
import { ThemeModel } from './theme.model';


export const ThemeContext = createContext<{theme: ThemeModel; toggleTheme: () => void} | null>(null);

