import React from 'react';
// TODO: we will enhance this, pending promote this values to Model
import * as canvasVm from '@/core/providers/canvas-schema';
import * as editTableVm from './edit-table.vm';
import {
  mapEditTableVmToTableVm,
  mapTableVmToEditTableVm,
} from './edit-table.mapper';

interface Props {
  table?: canvasVm.TableVm; // TODO: should we have our own Vm?
  relations: canvasVm.RelationVm[];
  onSave: (table: canvasVm.TableVm) => void;
}

// Approach:
// We will create a copy of the table
// if that table is empty we will create a new one
// Then once all is ok return in onSave
// Is send the parent component will be responsible
// to update it in the schema
// IMPORTANT: we have to check for relation that has origin or
// destination in the table and check if the fields already exists
// if they doesn't exist we have to remove them
// If it's a new table we will have to update X,Y coords to
// something visible to the user
export const EditTable: React.FC<Props> = props => {
  const { table, relations, onSave } = props;
  const [editTable, _] = React.useState<editTableVm.TableVm>(
    table
      ? mapTableVmToEditTableVm(table, relations)
      : editTableVm.createDefaultTable()
  );

  const handleSubmit = (table: editTableVm.TableVm) => {
    onSave(mapEditTableVmToTableVm(table));
  };

  return (
    <div>
      <p>Edit table</p>
      <p>Table name: {editTable?.tableName}</p>
      <button onClick={() => handleSubmit(editTable)}>Apply</button>
    </div>
  );
};
