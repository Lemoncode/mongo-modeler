import { useEffect, useRef, useState } from 'react';

import {
  useCanvasSchemaContext,
  useCanvasViewSettingsContext,
} from '@/core/providers';

import { saveToLocal, retrieveFromLocal } from './autosave.business';

const useAutosave = () => {
  const { canvasSchema, setCanvasSchema } = useCanvasSchemaContext();
  const { filename, setLoadSample } = useCanvasViewSettingsContext();

  const INTERVAL = 6000;
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const [isSaving, setIsSaving] = useState<boolean>(false);

  useEffect(() => {
    setCanvasSchema(retrieveFromLocal(setLoadSample));
  }, []);

  useEffect(() => {
    const autosaveHandler = () => {
      if (!isSaving && canvasSchema.tables.length !== 0) {
        setIsSaving(true);
        saveToLocal('autoSaveFile', {
          filename: filename ?? undefined,
          canvasSchema,
        });
        setIsSaving(false);
      }
      if (!isSaving && canvasSchema.tables.length === 0) {
        localStorage.removeItem('autoSaveFile');
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
  }, [canvasSchema, filename, isSaving]);

  const stopAutosave = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  return { stopAutosave };
};

export default useAutosave;
