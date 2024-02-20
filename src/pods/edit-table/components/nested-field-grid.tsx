import React from 'react';
import classes from '../edit-table.module.css';
import { GUID } from '@/core/model';
import { FieldVm } from '../edit-table.vm';

import { AnimatePresence, Reorder } from 'framer-motion';
import { Field } from './field';

interface NestedFieldGridProps {
  id?: GUID;
  fields: FieldVm[];
  level: number;
  expandedFields: Set<string>;
  toggleExpand: (fieldId: string) => void;
  expandField: (fieldId: string) => void;
  updateFieldValue: <K extends keyof FieldVm>(
    field: FieldVm,
    id: K,
    value: FieldVm[K]
  ) => void;
  onDeleteField: (fieldId: GUID) => void;
  onAddField: (fieldId: GUID, isChildren: boolean, newFieldId: GUID) => void;
  nameInputRefRecord: React.RefObject<Record<string, HTMLInputElement | null>>;
  onMoveDownField: (fieldId: GUID) => void;
  onMoveUpField: (fieldId: GUID) => void;
  onDragField: (fields: FieldVm[], id?: GUID) => void;
  isDeleteVisible: boolean;
}

export const NestedFieldGrid: React.FC<NestedFieldGridProps> = ({
  id,
  fields,
  level,
  expandedFields,
  toggleExpand,
  expandField,
  updateFieldValue,
  onDeleteField,
  onAddField,
  nameInputRefRecord,
  onMoveDownField,
  onMoveUpField,
  onDragField,
  isDeleteVisible,
}) => {
  const variantsGroup = {
    open: { opacity: 1, height: 'auto' },
    collapsed: { opacity: 0, height: 0 },
  };

  return (
    <Reorder.Group
      values={fields}
      onReorder={fields => onDragField(fields, id)}
      className={classes.nestedGrid}
      key={level}
      initial="collapsed"
      animate="open"
      exit="collapsed"
      variants={variantsGroup}
      transition={{ duration: 0.8 }}
    >
      <AnimatePresence initial={false}>
        {fields.map(item => (
          <Field
            key={item.id}
            field={item}
            fields={fields}
            expandField={expandField}
            expandedFields={expandedFields}
            level={level}
            onAddField={onAddField}
            onDeleteField={onDeleteField}
            onDragField={onDragField}
            onMoveDownField={onMoveDownField}
            onMoveUpField={onMoveUpField}
            toggleExpand={toggleExpand}
            updateFieldValue={updateFieldValue}
            nameInputRefRecord={nameInputRefRecord}
            isDeleteVisible={isDeleteVisible}
          />
        ))}
      </AnimatePresence>
    </Reorder.Group>
  );
};
