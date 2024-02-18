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
    const deepCopyValue = JSON.parse(JSON.stringify(value));
    const stringifiedDeepCopyValue = JSON.stringify(deepCopyValue);
    localStorage.setItem(key, stringifiedDeepCopyValue);
  } catch (error) {
    console.error('Autosave error', error);
    setTimeout(() => {
      saveToLocal(key, value);
    }, 30000);
  }
};

export const retrieveFromLocal = (
  setLoadSample: (T: boolean) => void
): DatabaseSchemaVm => {
  try {
    const value = localStorage.getItem('autoSaveFile');

    if (value) {
      const parsedValue = JSON.parse(value);
      if (parsedValue.canvasSchema.tables.length !== 0) {
        setLoadSample(false);
        return parsedValue.canvasSchema;
      }
    }
    setLoadSample(true);
    return createDefaultDatabaseSchemaVm();
  } catch (error) {
    console.error('File retrieve error', error);
    localStorage.removeItem('autoSaveFile');
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
