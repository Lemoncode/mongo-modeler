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

export const saveToLocal = (key: string, value: CanvasSchema) => {
  try {
    saveValueToLocalStorage(key, value);
  } catch (error) {
    console.error('Autosave error', error);
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
    console.error('File retrieve error', error);
    localStorage.removeItem(key);
    localStorage.setItem(
      'autoSaveFile',
      JSON.stringify({
        filename: '',
        canvasSchema: createDefaultDatabaseSchemaVm(),
      })
    );
    setLoadSample(true);
    return createDefaultDatabaseSchemaVm();
  }
};
