import { useEffect, useRef, useState } from 'react';

import {
  useCanvasSchemaContext,
  useCanvasViewSettingsContext,
} from '@/core/providers';

import {
  saveToLocal,
  retrieveLocalSchema,
  useRetrieveSchemaKey,
  getSavedKeys,
} from '@/core/autosave';

const useAutosave = () => {
  const AUTOSAVE_INTERVAL = 6000;
  const AUTOSAVE_KEY = 'autoSaveFile';
  const AUTOSAVE_KEY_SELECTION_TABLE = 'Select the auto-saved schema';

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const { canvasSchema, setCanvasSchema } = useCanvasSchemaContext();
  const { filename, setFilename, setLoadSample } =
    useCanvasViewSettingsContext();

  const { retrieveSchemaKey, retrievedKey } = useRetrieveSchemaKey();

  const [autoSaveKeyTimestamp, setAutosaveKeyTimestamp] =
    useState(AUTOSAVE_KEY);

  const [autosaveError, setAutosaveError] = useState(0);
  const [isDeletingAll, setIsDeletingAll] = useState(false);

  useEffect(() => {
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
    }
  };

  const retrieveAutosave = () => {
    retrieveSchemaKey(
      AUTOSAVE_KEY,
      AUTOSAVE_KEY_SELECTION_TABLE,
      setIsDeletingAll
    );
    const getLocalSchema = retrieveLocalSchema(
      retrievedKey,
      setLoadSample,
      setFilename
    );
    setCanvasSchema(getLocalSchema);
  };

  useEffect(() => {
    retrieveAutosave();
  }, [retrievedKey]);

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

  useEffect(() => {
    if (isDeletingAll) {
      const savedKeys = getSavedKeys(AUTOSAVE_KEY);
      savedKeys.forEach(key => {
        localStorage.removeItem(key);
      });
    }
  }, [isDeletingAll]);

  return { retrieveAutosave, startAutosave, stopAutosave };
};

export default useAutosave;
