import {
  DatabaseSchemaVm,
  createDefaultDatabaseSchemaVm,
} from '@/core/providers';

interface CanvasSchema {
  filename: string;
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

export const useRetrieveFromLocal = (): DatabaseSchemaVm => {
  // const { canvasSchema } = useCanvasSchemaContext();
  try {
    const value = localStorage.getItem('autoSaveFile');

    if (value) {
      const parsedValue = JSON.parse(value);
      return parsedValue.canvasSchema;
    }

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

    return createDefaultDatabaseSchemaVm();
  }
};
