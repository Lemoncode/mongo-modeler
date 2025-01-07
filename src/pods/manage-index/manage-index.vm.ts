import { GUID, GenerateGUID } from '@/core/model';
import { IndexField } from '@/core/providers';

export interface FieldVm {
  id: GUID;
  name: string;
  isUnique: boolean;
  fields: IndexField[];
  fieldsString?: string;
}

export const createDefaultIndex = (guid?: GUID): FieldVm => ({
  id: guid ? guid : GenerateGUID(),
  name: 'newIndex',
  isUnique: false,
  fields: [],
  fieldsString: '',
});
