import { MainScene } from '@/scenes';
import {
  CanvasSchemaProvider,
  CanvasViewSettingsProvider,
  ModalDialogProvider,
  useThemeContext,
} from './core/providers';

function App() {
  const { theme } = useThemeContext();

  return (
    <CanvasViewSettingsProvider>
      <CanvasSchemaProvider>
        <ModalDialogProvider>
          <div className={theme.themeMode}>
            <MainScene />
          </div>
        </ModalDialogProvider>
      </CanvasSchemaProvider>
    </CanvasViewSettingsProvider>
  );
}

export default App;
