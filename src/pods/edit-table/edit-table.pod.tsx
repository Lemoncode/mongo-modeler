import React from 'react';
import * as canvasVm from '@/core/providers/canvas-schema';
import * as editTableVm from './edit-table.vm';
import {
  mapEditTableVmToTableVm,
  mapTableVmToEditTableVm,
} from './edit-table.mapper';
import { EditTableComponent } from './edit-table.component';
import { produce } from 'immer';
import { GUID } from '@/core/model';
import {
  addFieldLogic,
  moveDownField,
  moveUpField,
  removeField,
} from './edit-table.business';

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
      // TODO: Extract this into a business method and add unit test support
      // #61
      // https://github.com/Lemoncode/mongo-modeler/issues/61
      produce(currentTable, draftTable => {
        // Find and update the field by it's id
        const findAndUpdateField = (fields: editTableVm.FieldVm[]): boolean => {
          const formerField = fields.find(f => f.id === fieldToUpdate.id);
          if (formerField) {
            if (
              key === 'type' &&
              formerField[key] === 'object' &&
              value !== 'object'
            ) {
              formerField.children = undefined;
            }
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

  const onDeleteField = (fieldId: GUID) => {
    setEditTable(currentTable => removeField(currentTable, fieldId));
  };

  const onAddField = (fieldId: GUID, isChildren: boolean) => {
    setEditTable(currentTable =>
      addFieldLogic(currentTable, fieldId, isChildren)
    );
  };

  const updateTableName = (tableName: string) => {
    setEditTable({ ...editTable, tableName });
  };

  const onMoveDownField = (fieldId: GUID) => {
    setEditTable(currentTable => moveDownField(currentTable, fieldId));
  };

  const onMoveUpField = (fieldId: GUID) => {
    setEditTable(currentTable => moveUpField(currentTable, fieldId));
  };
  return (
    <>
      <EditTableComponent
        table={editTable}
        updateFieldValue={updateFieldValue}
        onDeleteField={onDeleteField}
        onAddField={onAddField}
        updateTableName={updateTableName}
        onMoveDownField={onMoveDownField}
        onMoveUpField={onMoveUpField}
      />
      <button
        className="button-secondary"
        onClick={() => handleSubmit(editTable)}
      >
        Apply
      </button>
    </>
  );
};
