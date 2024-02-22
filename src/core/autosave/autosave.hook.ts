import { useEffect, useRef, useState } from 'react';

import {
  useCanvasSchemaContext,
  useCanvasViewSettingsContext,
} from '@/core/providers';

import { saveToLocal } from '@/core/autosave';
import { getKeyToRetrieveSchema } from './components/getKeyToRetrieveSchema';
import { retrieveLocalSchema } from './components/retrieveLocalSchema';

const useAutosave = () => {
  const AUTOSAVE_INTERVAL = 6000;
  const AUTOSAVE_KEY = 'autoSaveFile';

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const { canvasSchema, setCanvasSchema } = useCanvasSchemaContext();
  const { filename, setFilename, setLoadSample } =
    useCanvasViewSettingsContext();

  const [autoSaveKeyTimestamp, setAutosaveKeyTimestamp] =
    useState(AUTOSAVE_KEY);

  const [autosaveError, setAutosaveError] = useState(0);

  useEffect(() => {
    const loadKey = getKeyToRetrieveSchema(AUTOSAVE_KEY);
    retrieveLocalSchema(loadKey, setLoadSample, setFilename, setCanvasSchema);

    const timestamp = Date.now();
    setAutosaveKeyTimestamp(`${AUTOSAVE_KEY}_${timestamp}`);
  }, []);

  const autosaveHandler = () => {
    if (autosaveError > 1) stopAutosave();
    if (canvasSchema.tables.length !== 0) {
      saveToLocal(
        autoSaveKeyTimestamp,
        {
          filename: filename ?? undefined,
          canvasSchema,
        },
        autosaveError,
        setAutosaveError
      );
    } else {
      localStorage.removeItem(autoSaveKeyTimestamp);
      setLoadSample(true);
    }
  };

  const startAutosave = () => {
    if (!timerRef.current) {
      timerRef.current = setInterval(autosaveHandler, AUTOSAVE_INTERVAL);
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
