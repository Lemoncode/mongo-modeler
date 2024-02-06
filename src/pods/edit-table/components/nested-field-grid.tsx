import React from 'react';
import classes from '../edit-table.module.css';
import { FieldType, GUID } from '@/core/model';
import { FieldVm, fieldTypeOptions } from '../edit-table.vm';
import { Commands } from './commands/commands.component';
import { RightArrowIcon, ExpandDown } from '@/common/components';
import { AnimatePresence, Reorder, useDragControls } from 'framer-motion';

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
  onAddField: (fieldId: GUID, isChildren: boolean) => void;
  onMoveDownField: (fieldId: GUID) => void;
  onMoveUpField: (fieldId: GUID) => void;
  onDragField: (fields: FieldVm[], id?: GUID) => void;
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
  onMoveDownField,
  onMoveUpField,
  onDragField,
}) => {
  const dragControls = useDragControls();
  const handleAddField = (fieldId: GUID, isChildren: boolean) => {
    if (isChildren) {
      expandField(fieldId);
    }
    onAddField(fieldId, isChildren);
  };
  const variantsGroup = {
    open: { opacity: 1, height: 'auto' },
    collapsed: { opacity: 0, height: 0 },
  };
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
  const handleDrag = (
    e: React.PointerEvent<HTMLButtonElement>,
    field: FieldVm
  ) => {
    console.log(dragControls);
    dragControls.start(e);
    if (expandedFields.has(field.id)) {
      toggleExpand(field.id);
    }
  };
  const renderField = (field: FieldVm): JSX.Element => (
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
        // onDragStart={() => handleDrag(field)}
        // whileDrag={{
        //   cursor: 'grabbing',
        // }}
        dragListener={false}
        dragControls={dragControls}
      >
        <div
          className={`${classes.fieldCell} ${classes.expandCell} ${classes[`indent${level}`]}`}
        >
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
            onDrag={handleDrag}
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
        {fields.map(field => renderField(field))}
      </AnimatePresence>
    </Reorder.Group>
  );
};
