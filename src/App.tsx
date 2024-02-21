import { MainScene } from '@/scenes';
import { useThemeContext } from './core/providers';
import './App.css';

function App() {
  const { theme } = useThemeContext();
  return <div className={theme.themeMode}>{<MainScene />}</div>;
}

export default App;
