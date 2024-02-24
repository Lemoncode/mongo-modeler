import React, { useState } from 'react';
import classes from './edit-table.module.css';
import { FieldVm, TableVm } from './edit-table.vm';
import { NestedFieldGrid } from './components/nested-field-grid';
import { GUID } from '@/core/model';
import { useInputRefFocus } from './use-input-focus.hook';

interface Props {
  table: TableVm;
  updateFieldValue: <K extends keyof FieldVm>(
    field: FieldVm,
    id: K,
    value: FieldVm[K]
  ) => void;
  onDeleteField: (fieldId: GUID) => void;
  onAddField: (fieldId: GUID, isChildren: boolean, newFieldId: GUID) => void;
  updateTableName: (value: string) => void;
  onMoveDownField: (fieldId: GUID) => void;
  onMoveUpField: (fieldId: GUID) => void;
  onDragField: (fields: FieldVm[], id?: GUID) => void;
}

export const EditTableComponent: React.FC<Props> = props => {
  const {
    table,
    updateFieldValue,
    onDeleteField,
    onAddField,
    updateTableName,
    onMoveDownField,
    onMoveUpField,
    onDragField,
  } = props;

  const { handleAddField, nameInputRefRecord } = useInputRefFocus(onAddField);

  const [expandedFields, setExpandedFields] = useState<Set<string>>(new Set());

  const expandField = (fieldId: string) => {
    setExpandedFields(prev => {
      const newExpanded = new Set(prev);
      if (!newExpanded.has(fieldId)) {
        newExpanded.add(fieldId);
      }
      return newExpanded;
    });
  };

  const toggleExpand = (fieldId: string) => {
    setExpandedFields(prev => {
      const newExpanded = new Set(prev);
      if (newExpanded.has(fieldId)) {
        newExpanded.delete(fieldId);
      } else {
        newExpanded.add(fieldId);
      }
      return newExpanded;
    });
  };

  const handleChangeTableName = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateTableName(e.currentTarget.value);
  };

  return (
    <>
      <div className={classes.tableName}>
        <label>
          Collection:
          <input
            type="text"
            value={table.tableName}
            onChange={handleChangeTableName}
          />
        </label>
      </div>

      <div className={classes.tableEditor}>
        <div className={classes.headerRow}>
          <div className={classes.headerCell}>Name</div>
          <div className={classes.headerCell}>PK</div>
          <div className={classes.headerCell}>FK</div>
          <div className={classes.headerCell}>Type</div>
          <div className={classes.headerCell}>isArray</div>
          <div className={classes.headerCell}>NN</div>
          <div className={classes.headerCell}>Actions</div>
        </div>

        <NestedFieldGrid
          fields={table.fields}
          level={0}
          expandedFields={expandedFields}
          toggleExpand={toggleExpand}
          expandField={expandField}
          updateFieldValue={updateFieldValue}
          onDeleteField={onDeleteField}
          onAddField={handleAddField}
          onMoveDownField={onMoveDownField}
          onMoveUpField={onMoveUpField}
          onDragField={onDragField}
          nameInputRefRecord={nameInputRefRecord}
          isDeleteVisible={table.fields?.length !== 1}
        />
      </div>
    </>
  );
};
