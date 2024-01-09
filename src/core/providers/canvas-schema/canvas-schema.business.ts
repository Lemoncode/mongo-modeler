import { produce } from 'immer';
import { TableVm } from './canvas-schema.model';
import { DatabaseSchemaVm } from './canvas-schema.model';

export const updateTable = (
  table: TableVm,
  dbSchema: DatabaseSchemaVm
): DatabaseSchemaVm =>
  produce(dbSchema, draft => {
    const tableIndex = draft.tables.findIndex(t => t.id === table.id);
    if (tableIndex !== -1) {
      draft.tables[tableIndex] = table;
    }
  });
