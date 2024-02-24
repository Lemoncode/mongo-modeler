import {
  retrieveValueFromLocalStorage,
  saveValueToLocalStorage,
} from '@/common/local-storage';
import {
  DatabaseSchemaVm,
  createDefaultDatabaseSchemaVm,
} from '@/core/providers';

export interface CanvasSchema {
  filename: string | undefined;
  canvasSchema: DatabaseSchemaVm;
}

export const saveToLocal = (
  key: string,
  value: CanvasSchema,
  autosaveError: number,
  setAutosaveError: React.Dispatch<React.SetStateAction<number>>
) => {
  try {
    saveValueToLocalStorage(key, value);
  } catch (error) {
    if (autosaveError <= 1) setAutosaveError(prev => ++prev);
    console.error(`${autosaveError} Autosave error`, error);
  }
};

export const retrieveLocalSchema = (
  retrievedKey: string,
  setLoadSample: (sample: boolean) => void,
  setFilename: (filename: string) => void
): DatabaseSchemaVm => {
  try {
    const retrievedValue = retrieveValueFromLocalStorage(retrievedKey); //// nothing to retrieve after DeleteAll

    if (retrievedValue && retrievedValue.canvasSchema.tables.length !== 0) {
      setLoadSample(false);
      setFilename(retrievedValue.filename);
      return retrievedValue.canvasSchema;
    } else {
      setLoadSample(true);
      setFilename('');
      return createDefaultDatabaseSchemaVm();
    }
  } catch (error) {
    console.error('Fail trying to retrieve schema from localStorage', error);
    setLoadSample(true);
    setFilename('');
    return createDefaultDatabaseSchemaVm();
  }
};

export const getSavedKeys = (AUTOSAVE_KEY: string): string[] => {
  const savedKeys = Object.keys(localStorage).filter(key =>
    key.startsWith(AUTOSAVE_KEY)
  );
  return savedKeys;
};
