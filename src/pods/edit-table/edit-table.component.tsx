import React, { useState } from 'react';
import classes from './edit-table.module.css';
import { FieldVm, TableVm } from './edit-table.vm';
import { NestedFieldGrid } from './components/nested-field-grid';

interface Props {
  table: TableVm;
  updateFieldValue: <K extends keyof FieldVm>(
    field: FieldVm,
    id: K,
    value: FieldVm[K]
  ) => void;
}

export const EditTableComponent: React.FC<Props> = props => {
  const { table, updateFieldValue } = props;
  const [expandedFields, setExpandedFields] = useState<Set<string>>(new Set());

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

  return (
    <div className={classes.tableEditor}>
      <NestedFieldGrid
        fields={table.fields}
        level={0}
        expandedFields={expandedFields}
        toggleExpand={toggleExpand}
        updateFieldValue={updateFieldValue}
      />
    </div>
  );
};
