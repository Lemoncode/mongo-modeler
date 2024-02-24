import React from 'react';
import { MainScene } from '@/scenes';

import { useCanvasSchemaContext, useThemeContext } from '@/core/providers';
import useAutosave from '@/core/autosave/autosave.hook';

function App() {
  const { theme } = useThemeContext();
  const { canvasSchema } = useCanvasSchemaContext();
  const { retrieveAutosave, startAutosave, stopAutosave } = useAutosave();
  const [retrieveAutosaveHasInitialized, setRetrieveAutosaveHasInitialized] =
    React.useState(false);

  React.useEffect(() => {
    if (!retrieveAutosaveHasInitialized) {
      retrieveAutosave();
      setRetrieveAutosaveHasInitialized(true);
    }

    startAutosave();
    return stopAutosave;
  }, [canvasSchema]);

  return (
    <div className={theme.themeMode}>
      <MainScene />
    </div>
  );
}

export default App;
