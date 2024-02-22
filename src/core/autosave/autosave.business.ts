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

export const retrieveFromLocal = (
  key: string,
  setLoadSample: (T: boolean) => void
): DatabaseSchemaVm => {
  try {
    const retrievedValue = retrieveValueFromLocalStorage(key);

    if (retrievedValue && retrievedValue.canvasSchema.tables.length !== 0) {
      setLoadSample(false);
      return retrievedValue.canvasSchema;
    }

    setLoadSample(true);
    return createDefaultDatabaseSchemaVm();
  } catch (error) {
    localStorage.removeItem(key);

    setLoadSample(true);
    return createDefaultDatabaseSchemaVm();
  }
};
