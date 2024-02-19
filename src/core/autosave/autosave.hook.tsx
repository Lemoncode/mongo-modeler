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

  const INTERVAL = 6000;
  const AUTOSAVE_KEY = 'autoSaveFile';

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const retrieveSchema = retrieveFromLocal(AUTOSAVE_KEY, setLoadSample);
    const retrieveFileName = retrieveValueFromLocalStorage(AUTOSAVE_KEY);

    if (retrieveFileName && retrieveFileName.filename !== '')
      setFilename(retrieveFileName.filename);

    setCanvasSchema(retrieveSchema);
  }, []);

  useEffect(() => {
    const autosaveHandler = () => {
      if (canvasSchema.tables.length !== 0) {
        saveToLocal(AUTOSAVE_KEY, {
          filename: filename ?? undefined,
          canvasSchema,
        });
      }
      if (canvasSchema.tables.length === 0) {
        localStorage.removeItem(AUTOSAVE_KEY);
        setLoadSample(true);
      }
    };
    timerRef.current = setInterval(autosaveHandler, INTERVAL);

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [canvasSchema, filename]);

  const stopAutosave = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  return { stopAutosave };
};

export default useAutosave;
