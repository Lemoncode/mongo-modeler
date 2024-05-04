import './App.css';
import { MainScene } from '@/scenes';
import { useThemeContext } from './core/providers';

function App() {
  const { theme } = useThemeContext();
  return (
    <div className={theme.themeMode}>
      <MainScene />
    </div>
  );
}

export default App;
