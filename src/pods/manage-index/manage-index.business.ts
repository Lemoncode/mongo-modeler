import { produce } from 'immer';
import { FieldVm } from './manage-index.vm';
import { GUID } from '@/core/model';
import * as editIndexVm from './manage-index.vm';
import * as canvasVm from '@/core/providers/canvas-schema';
import {
  clonify,
  isEqual,
  isNullOrWhiteSpace,
  parseManageIndexFields,
} from '@/core/functions';
import { Output } from '@/core/model/errorHandling';

export interface UpdateIndexValueParams<K extends keyof editIndexVm.FieldVm> {
  indexToUpdate: editIndexVm.FieldVm;
  key: K;
  value: editIndexVm.FieldVm[K];
}

export const updateIndexValueLogic = <K extends keyof editIndexVm.FieldVm>(
  table: canvasVm.TableVm,
  params: UpdateIndexValueParams<K>
) => {
  return produce(table, draftTable => {
    const findAndUpdateIndex = (currentTable: canvasVm.TableVm): boolean => {
      const formerIndex = currentTable.indexes?.find(
        f => f.id === params.indexToUpdate.id
      );
      if (formerIndex) {
        formerIndex[params.key] = params.value;
        return true;
      }
      if (!currentTable.indexes) currentTable.indexes = [];
      params.indexToUpdate[params.key] = params.value;
      currentTable.indexes.push(params.indexToUpdate);
      return true;
    };

    findAndUpdateIndex(draftTable);
  });
};

export const removeIndex = (
  table: canvasVm.TableVm,
  indexId: GUID
): canvasVm.TableVm => {
  return produce(table, draftTable => {
    const remove = (indexes: FieldVm[]): void => {
      for (let i = 0; i < indexes.length; i++) {
        if (indexes[i].id === indexId) {
          indexes.splice(i, 1);
          return;
        }
      }
    };
    if (table.indexes) remove(draftTable.indexes as editIndexVm.FieldVm[]);
  });
};

export const addIndexLogic = (
  currentTable: canvasVm.TableVm,
  indexId: GUID,
  newFieldId: GUID
) => {
  return produce(currentTable, draftTable => {
    const findAndAddIndex = (indexes: editIndexVm.FieldVm[]): boolean => {
      const foundIndex = indexes.findIndex(f => f.id === indexId);
      if (foundIndex != -1) {
        indexes.splice(
          foundIndex + 1,
          0,
          editIndexVm.createDefaultIndex(newFieldId)
        );
        return true;
      }
      return false;
    };
    if (currentTable.indexes)
      findAndAddIndex(draftTable.indexes as editIndexVm.FieldVm[]);
  });
};

export const moveDown = (
  table: canvasVm.TableVm,
  indexId: GUID
): canvasVm.TableVm => {
  return produce(table, draftTable => {
    const _moveDown = (indexes: FieldVm[]): void => {
      for (let i = 0; i < indexes.length; i++) {
        const field = indexes[i];
        if (field.id === indexId && i < indexes.length - 1) {
          const temp = indexes[i];
          indexes[i] = indexes[i + 1];
          indexes[i + 1] = temp;
          return;
        }
      }
    };

    _moveDown(draftTable.indexes as editIndexVm.FieldVm[]);
  });
};

export const moveUp = (
  table: canvasVm.TableVm,
  indexId: GUID
): canvasVm.TableVm => {
  return produce(table, draftTable => {
    const _moveUp = (indexes: FieldVm[]): void => {
      for (let i = 0; i < indexes.length; i++) {
        const field = indexes[i];
        if (field.id === indexId && i > 0) {
          const temp = indexes[i];
          indexes[i] = indexes[i - 1];
          indexes[i - 1] = temp;
          return;
        }
      }
    };

    _moveUp(draftTable.indexes as editIndexVm.FieldVm[]);
  });
};

export const findIndex = (
  indexes: editIndexVm.FieldVm[],
  id: GUID
): editIndexVm.FieldVm | undefined => {
  for (const item of indexes) {
    if (item.id === id) return item;
  }
  return undefined;
};

//of course this needs unit test
export const save = (table: canvasVm.TableVm): Output<canvasVm.TableVm> => {
  const result: Output<canvasVm.TableVm> = {
    errorHandling: {
      isSuccessful: true,
    },
  };

  const _table = clonify<canvasVm.TableVm>(table);

  const errorFound = _table.indexes?.find(
    x => isNullOrWhiteSpace(x.name) || isNullOrWhiteSpace(x.fieldsString)
  );
  if (!_table.indexes || errorFound) {
    const error = 'Please make sure that you provided the correct info';
    result.errorHandling.errorMessage = error;
    result.errorHandling.isSuccessful = false;
    return result;
  }

  if (_table.indexes?.length > 0) {
    for (let i = 0; i < _table.indexes.length; i++) {
      const item = _table.indexes[i];
      const fields = parseManageIndexFields(item.fieldsString);
      _table.indexes[i].fields.push(...fields);
    }

    let error: string = '';
    _table.indexes.forEach(elem => {
      elem.fields.forEach(fld => {
        const found = _table.fields.find(x => isEqual(x.name, fld.name));
        if (!found)
          error = `Field name provided(${fld.name}) does not exist in the table schema.`;
      });
    });

    if (!isNullOrWhiteSpace(error)) {
      result.errorHandling.isSuccessful = false;
      result.errorHandling.errorMessage = error;
      return result;
    }
  }

  result.data = _table;

  return result;
};
