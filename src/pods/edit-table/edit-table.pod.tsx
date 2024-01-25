import React from 'react';
import * as canvasVm from '@/core/providers/canvas-schema';
import * as editTableVm from './edit-table.vm';
import {
  mapEditTableVmToTableVm,
  mapTableVmToEditTableVm,
} from './edit-table.mapper';
import { EditTableComponent } from './edit-table.component';
import { updateFieldValueLogic } from './edit-table.business';

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
export const EditTablePod: React.FC<Props> = props => {
  const { table, relations, onSave } = props;
  // TODO:
  // #60
  // https://github.com/Lemoncode/mongo-modeler/issues/60
  const [editTable, setEditTable] = React.useState<editTableVm.TableVm>(
    table
      ? mapTableVmToEditTableVm(table, relations)
      : editTableVm.createDefaultTable()
  );

  const handleSubmit = (table: editTableVm.TableVm) => {
    onSave(mapEditTableVmToTableVm(table));
  };

  const updateFieldValue = <K extends keyof editTableVm.FieldVm>(
    fieldToUpdate: editTableVm.FieldVm,
    key: K,
    value: editTableVm.FieldVm[K]
  ) => {
    setEditTable(currentTable =>
      updateFieldValueLogic(currentTable, { fieldToUpdate, key, value })
    );
  };

  return (
    <div>
      <h2>Edit table</h2>
      <p>Table name: {editTable?.tableName}</p>
      <EditTableComponent
        table={editTable}
        updateFieldValue={updateFieldValue}
      />
      <button onClick={() => handleSubmit(editTable)}>Apply</button>
    </div>
  );
};
