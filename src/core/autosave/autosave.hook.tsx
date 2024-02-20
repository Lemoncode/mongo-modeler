import { useEffect, useRef } from 'react';

import {
  useCanvasSchemaContext,
  useCanvasViewSettingsContext,
} from '@/core/providers';

import { saveToLocal, retrieveFromLocal } from './autosave.business';
import { retrieveValueFromLocalStorage } from '@/common/local-storage';

const useAutosave = () => {
  const { canvasSchema, setCanvasSchema } = useCanvasSchemaContext();
  const { filename, setFilename, setLoadSample } =
    useCanvasViewSettingsContext();

  const INTERVAL = 60000;
  const AUTOSAVE_KEY = 'autoSaveFile';

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const retrieveSchema = retrieveFromLocal(AUTOSAVE_KEY, setLoadSample);
    const retrieveFileName = retrieveValueFromLocalStorage(AUTOSAVE_KEY);

    if (retrieveFileName && retrieveFileName.filename !== '')
      setFilename(retrieveFileName.filename);

    setCanvasSchema(retrieveSchema);
  }, []);

  const autosaveHandler = () => {
    if (canvasSchema.tables.length !== 0) {
      saveToLocal(AUTOSAVE_KEY, {
        filename: filename ?? undefined,
        canvasSchema,
      });
    } else {
      localStorage.removeItem(AUTOSAVE_KEY);
      setLoadSample(true);
    }
  };

  const startAutosave = () => {
    if (!timerRef.current) {
      timerRef.current = setInterval(autosaveHandler, INTERVAL);
    }
  };

  const stopAutosave = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  return { startAutosave, stopAutosave };
};

export default useAutosave;
