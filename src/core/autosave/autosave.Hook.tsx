import { useEffect, useRef, useState } from 'react';

import {
  useCanvasSchemaContext,
  useCanvasViewSettingsContext,
} from '@/core/providers';

import { saveToLocal } from './autosave.business';

const useAutosave = () => {
  const { canvasSchema } = useCanvasSchemaContext();
  const { filename } = useCanvasViewSettingsContext();

  const INTERVAL = 6000;
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const [isSaving, setIsSaving] = useState<boolean>(false);

  useEffect(() => {
    const autosaveHandler = () => {
      if (!isSaving) {
        setIsSaving(true);

        saveToLocal('autoSaveFile', {
          filename: filename ? filename : 'undefined',
          canvasSchema: canvasSchema,
        });

        setIsSaving(false);
        console.log(`saveToLocal`);
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

  return stopAutosave;
};

export default useAutosave;
