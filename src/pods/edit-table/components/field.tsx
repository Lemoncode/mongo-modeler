import React from 'react';
import classes from '../edit-table.module.css';

import { Reorder, motion, useDragControls } from 'framer-motion';
import { Commands } from './commands/commands.component';
import { RightArrowIcon, ExpandDown, DragDropIcon } from '@/common/components';
import { FieldVm, fieldTypeOptions } from '../edit-table.vm';
import { NestedFieldGrid } from './nested-field-grid';
import { FieldType, GUID } from '@/core/model';

interface Props {
  field: FieldVm;
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
  onAddField: (fieldId: GUID, isChildren: boolean) => void;
  onMoveDownField: (fieldId: GUID) => void;
  onMoveUpField: (fieldId: GUID) => void;
  onDragField: (fields: FieldVm[], id?: GUID) => void;
}

export const Field: React.FC<Props> = props => {
  const {
    field,
    fields,
    expandField,
    expandedFields,
    level,
    onAddField,
    onDeleteField,
    onDragField,
    onMoveDownField,
    onMoveUpField,
    toggleExpand,
    updateFieldValue,
  } = props;
  const variantsItem = {
    left: {
      opacity: 0,
      x: -200,
      scale: 0.8,
    },
    stay: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: { duration: 0.3 },
    },
  };
  const dragControls = useDragControls();
  const handleAddField = (fieldId: GUID, isChildren: boolean) => {
    if (isChildren) {
      expandField(fieldId);
    }
    onAddField(fieldId, isChildren);
  };

  const handleDrag = (field: FieldVm) => {
    if (expandedFields.has(field.id)) {
      toggleExpand(field.id);
    }
  };

  return (
    <React.Fragment key={field.id}>
      <Reorder.Item
        value={field}
        key={field.id}
        style={{ y: 0 }}
        className={`${classes.fieldRow} `}
        initial="left"
        animate="stay"
        exit="left"
        variants={variantsItem}
        transition={{ duration: 0.3 }}
        dragListener={false}
        dragControls={dragControls}
      >
        <div
          className={`${classes.fieldCell} ${classes.expandCell} ${classes[`indent${level}`]}`}
        >
          <motion.button
            className={classes.dragButton}
            onPointerDown={(e: React.PointerEvent<HTMLButtonElement>) => {
              dragControls.start(e);
              handleDrag(field);
              e.currentTarget.style.cursor = 'grabbing';
            }}
            onPointerUp={e => (e.currentTarget.style.cursor = 'grab')}
          >
            <DragDropIcon />
          </motion.button>
          {field.type === 'object' ? (
            <button onClick={() => toggleExpand(field.id)}>
              {expandedFields.has(field.id) ? (
                <ExpandDown />
              ) : (
                <RightArrowIcon />
              )}
            </button>
          ) : (
            <div className={classes.buttonSpace} /> // Empty div just to keep constant width
          )}
          <div className={classes.inputName}>
            <input
              value={field.name}
              onChange={e => {
                updateFieldValue(field, 'name', e.target.value);
              }}
            />
          </div>
        </div>
        <div className={classes.fieldCell}>
          <div className="checkbox">
            <input
              type="checkbox"
              id="check1"
              checked={field.PK}
              onChange={() => updateFieldValue(field, 'PK', !field.PK)}
            />
            <label htmlFor="check1">
              <svg viewBox="0,0,50,50">
                <path d="M5 30 L 20 45 L 45 5"></path>
              </svg>
            </label>
          </div>
        </div>
        <div className={classes.fieldCell}>
          <div className="checkbox">
            <input
              type="checkbox"
              id="check2"
              checked={field.FK}
              onChange={() => updateFieldValue(field, 'FK', !field.FK)}
            />
            <label htmlFor="check2">
              <svg viewBox="0,0,50,50">
                <path d="M5 30 L 20 45 L 45 5"></path>
              </svg>
            </label>
          </div>
        </div>
        <div className={classes.fieldCell}>
          <select
            value={field.type}
            onChange={e =>
              updateFieldValue(field, 'type', e.target.value as FieldType)
            }
          >
            {fieldTypeOptions.map(entry => (
              <option key={entry.value} value={entry.value}>
                {entry.label}
              </option>
            ))}
          </select>
        </div>
        <div className={classes.fieldCell}>
          <div className="checkbox">
            <input
              id="check3"
              type="checkbox"
              checked={field.isArray}
              onChange={() =>
                updateFieldValue(field, 'isArray', !field.isArray)
              }
            />
            <label htmlFor="check3">
              <svg viewBox="0,0,50,50">
                <path d="M5 30 L 20 45 L 45 5"></path>
              </svg>
            </label>
          </div>
        </div>
        <div className={`${classes.fieldCell} ${classes.commandsContainer}`}>
          <Commands
            field={field}
            fields={fields}
            onDeleteField={onDeleteField}
            onAddField={handleAddField}
            onMoveDownField={onMoveDownField}
            onMoveUpField={onMoveUpField}
          />
        </div>
      </Reorder.Item>
      {field.children && expandedFields.has(field.id) && (
        <NestedFieldGrid
          id={field.id}
          fields={field.children}
          level={level + 1}
          expandedFields={expandedFields}
          toggleExpand={toggleExpand}
          expandField={expandField}
          updateFieldValue={updateFieldValue}
          onDeleteField={onDeleteField}
          onAddField={onAddField}
          onMoveDownField={onMoveDownField}
          onMoveUpField={onMoveUpField}
          onDragField={onDragField}
        />
      )}
    </React.Fragment>
  );
};
