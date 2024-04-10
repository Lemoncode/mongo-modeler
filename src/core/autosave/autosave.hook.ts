import { useEffect, useRef, useState } from 'react';

import {
  useCanvasSchemaContext,
  useCanvasViewSettingsContext,
} from '@/core/providers';

import { saveToLocal, retrieveLocalSchema } from '@/core/autosave';

const useAutosave = () => {
  const AUTOSAVE_INTERVAL = 60000;
  const AUTOSAVE_KEY = 'autoSaveFile';

  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const autoSaveRef = useRef<boolean | null>(null);

  const { canvasSchema, setCanvasSchema } = useCanvasSchemaContext();
  const { filename, setFilename, setLoadSample, autoSave } =
    useCanvasViewSettingsContext();

  const [autosaveError, setAutosaveError] = useState(0);

  const autosaveHandler = () => {
    if (autosaveError > 1) stopAutosave();

    if (canvasSchema.tables.length !== 0 && autoSave) {
      saveToLocal(
        AUTOSAVE_KEY,
        {
          filename: filename ?? undefined,
          canvasSchema,
        },
        autosaveError,
        setAutosaveError
      );
    } else {
      localStorage.removeItem(AUTOSAVE_KEY);
    }
  };

  const retrieveAutosave = () => {
    const getLocalSchema = retrieveLocalSchema(
      AUTOSAVE_KEY,
      setLoadSample,
      setFilename
    );
    setCanvasSchema(getLocalSchema);
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

  const deleteAutosaveStorage = () => {
    localStorage.removeItem(AUTOSAVE_KEY);
  };

  useEffect(() => {
    retrieveAutosave();
  }, [AUTOSAVE_KEY]);

  useEffect(() => {
    autoSaveRef.current = autoSave;
    if (autoSaveRef.current) {
      startAutosave();
    } else {
      stopAutosave();
      deleteAutosaveStorage();
    }
  }, [autoSave]);

  return {
    retrieveAutosave,
    startAutosave,
    stopAutosave,
    deleteAutosaveStorage,
  };
};

export default useAutosave;
