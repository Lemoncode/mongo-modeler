import { retrieveValueFromLocalStorage } from '@/common/local-storage';
import { retrieveFromLocal } from '@/core/autosave';
import { DatabaseSchemaVm } from '@/core/providers';

export const retrieveLocalSchema = (
  key: string,
  setLoadSample: (sample: boolean) => void,
  setFilename: (filename: string) => void,
  setCanvasSchema: (schema: DatabaseSchemaVm) => void
) => {
  try {
    const retrieveSchema = retrieveFromLocal(key, setLoadSample);
    const retrieveFileName = retrieveValueFromLocalStorage(key);

    if (retrieveFileName && retrieveFileName.filename !== undefined)
      setFilename(retrieveFileName.filename);

    setCanvasSchema(retrieveSchema);
  } catch (error) {
    console.error('Fail trying to retrieve schema from localStorage', error);
  }
};
