import { GUID, GenerateGUID } from '@/core/model';
import { IndexField } from '@/core/providers';

export interface FieldVm {
  id: GUID;
  name: string;
  isUnique: boolean;
  sparse: boolean;
  fields: IndexField[];
  fieldsString?: string;
  partialFilterExpression?: string;
}

export const createDefaultIndex = (
  tableName: string,
  guid?: GUID
): FieldVm => ({
  id: guid ? guid : GenerateGUID(),
  name: `${tableName}_idx_newIndex`,
  isUnique: false,
  sparse: false,
  fields: [],
  fieldsString: '',
});
