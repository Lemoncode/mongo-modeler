import React from 'react';
import { MainScene, MobileTabletScene } from '@/scenes';
import { useThemeContext } from './core/providers';
import './App.css';

function App() {
  const { theme } = useThemeContext();
  const [width, setWidth] = React.useState(true);

  const handleResize = () => {
    window.innerWidth < 1080 ? setWidth(false) : setWidth(true);
  };

  React.useEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className={theme.themeMode}>
      {width ? <MainScene /> : <MobileTabletScene />}
    </div>
  );
}

export default App;
