import React, { useState } from 'react';
import classes from './edit-table.module.css';
import { FieldVm, TableVm } from './edit-table.vm';
import { NestedFieldGrid } from './components/nested-field-grid';
import { GUID } from '@/core/model';

interface Props {
  table: TableVm;
  updateFieldValue: <K extends keyof FieldVm>(
    field: FieldVm,
    id: K,
    value: FieldVm[K]
  ) => void;
  onDeleteField: (fieldId: GUID) => void;
  onAddField: (fieldId: GUID, isChildren: boolean) => void;
  updateTableName: (value: string) => void;
}

export const EditTableComponent: React.FC<Props> = props => {
  const {
    table,
    updateFieldValue,
    onDeleteField,
    onAddField,
    updateTableName,
  } = props;
  const [expandedFields, setExpandedFields] = useState<Set<string>>(new Set());
  const [valueTableName, setValueTableName] = useState(table.tableName);

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
    setValueTableName(e.currentTarget.value);
  };

  return (
    <>
      <div className={classes.tableName}>
        <label>
          Table:
          <input
            type="text"
            value={valueTableName}
            onChange={handleChangeTableName}
          />
        </label>
      </div>
      <div className={classes.tableEditor}>
        <NestedFieldGrid
          fields={table.fields}
          level={0}
          expandedFields={expandedFields}
          toggleExpand={toggleExpand}
          expandField={expandField}
          updateFieldValue={updateFieldValue}
          onDeleteField={onDeleteField}
          onAddField={onAddField}
        />
      </div>
    </>
  );
};
