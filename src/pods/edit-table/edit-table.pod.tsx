import React from 'react';
// TODO: we will enhance this, pending promote this values to Model
import * as canvasVm from '@/core/providers/canvas-schema';
import * as editTableVm from './edit-table.vm';
import {
  mapEditTableVmToTableVm,
  mapTableVmToEditTableVm,
} from './edit-table.mapper';
import { EditTableComponent } from './edit-table.component';
import { produce } from 'immer';

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
      // TODO: Extract this into a business method and add unit test support
      produce(currentTable, draftTable => {
        // Find and update the field by it's id
        const findAndUpdateField = (fields: editTableVm.FieldVm[]): boolean => {
          const formerField = fields.find(f => f.id === fieldToUpdate.id);
          if (formerField) {
            formerField[key] = value;
            return true; // Field found and updated
          }
          // Recursively search in nested fields
          for (const field of fields) {
            if (field.children && findAndUpdateField(field.children)) {
              return true; // Field found and updated in nested field
            }
          }

          return false; // Field not found
        };

        findAndUpdateField(draftTable.fields);
      })
    );
  };

  return (
    <div>
      <p>Edit table</p>
      <p>Table name: {editTable?.tableName}</p>
      <EditTableComponent
        table={editTable}
        updateFieldValue={updateFieldValue}
      />
      <button onClick={() => handleSubmit(editTable)}>Apply</button>
    </div>
  );
};
