import React from 'react';
import { produce } from 'immer';
import * as canvasVm from '@/core/providers/canvas-schema';
import * as editTableVm from './edit-table.vm';
import { mapEditTableVmToTableVm } from './edit-table.mapper';
import { EditTableComponent } from './edit-table.component';
import { GUID } from '@/core/model';
import {
  addFieldLogic,
  findFieldRecursively,
  moveDownField,
  moveUpField,
  removeField,
  doMapOrCreateTable,
} from './edit-table.business';
import { updateFieldValueLogic } from './edit-table.business';

interface Props {
  table?: canvasVm.TableVm; // TODO: should we have our own Vm?
  relations: canvasVm.RelationVm[];
  onSave: (table: canvasVm.TableVm) => void;
  onClose: () => void;
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
  const { table, relations, onSave, onClose } = props;

  const [editTable, setEditTable] = React.useState<editTableVm.TableVm>(() =>
    doMapOrCreateTable(relations, table)
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

      updateFieldValueLogic(currentTable, { fieldToUpdate, key, value })
    );
  };

  const onDeleteField = (fieldId: GUID) => {
    setEditTable(currentTable => removeField(currentTable, fieldId));
  };

  const onAddField = (fieldId: GUID, isChildren: boolean, newFieldId: GUID) => {
    setEditTable(currentTable =>
      addFieldLogic(currentTable, fieldId, isChildren, newFieldId)
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

  const onDragField = (fields: editTableVm.FieldVm[], id?: GUID) => {
    if (id) {
      setEditTable(currentTable =>
        produce(currentTable, draftTable => {
          const findField = findFieldRecursively(draftTable.fields, id);
          if (findField && findField.children) {
            findField.children = fields;
          }
        })
      );
    } else {
      setEditTable({ ...editTable, fields });
    }
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
        onDragField={onDragField}
      />
      <div className="two-buttons">
        <button
          className="button-secondary"
          onClick={() => handleSubmit(editTable)}
        >
          Apply
        </button>
        <button className="button-tertiary" onClick={onClose}>
          Cancel
        </button>
      </div>
    </>
  );
};
