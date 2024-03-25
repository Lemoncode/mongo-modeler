import {
  retrieveValueFromLocalStorage,
  saveValueToLocalStorage,
} from '@/common/local-storage';
import {
  DatabaseSchemaVm,
  createDefaultDatabaseSchemaVm,
} from '@/core/providers';

export interface AutosaveCanvasSchema {
  filename: string | undefined;
  canvasSchema: DatabaseSchemaVm;
}

export const saveToLocal = (
  key: string,
  value: AutosaveCanvasSchema,
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

const defaultSchema = (
  setLoadSample: (sample: boolean) => void,
  setFilename: (filename: string) => void
) => {
  //All necesary for the default schema
  setLoadSample(true);
  setFilename('');
  return createDefaultDatabaseSchemaVm();
};

export const retrieveLocalSchema = (
  retrievedKey: string,
  setLoadSample: (sample: boolean) => void,
  setFilename: (filename: string) => void
): DatabaseSchemaVm => {
  try {
    const retrievedValue = retrieveValueFromLocalStorage(retrievedKey);

    if (retrievedValue && retrievedValue.canvasSchema.tables.length !== 0) {
      setLoadSample(false);
      setFilename(retrievedValue.filename);
      return retrievedValue.canvasSchema;
    } else {
      return defaultSchema(setLoadSample, setFilename);
    }
  } catch (error) {
    console.error('Fail trying to retrieve schema from localStorage', error);
    // If there is an error, return the default schema, an the users don't notice the error
    return defaultSchema(setLoadSample, setFilename);
  }
};
