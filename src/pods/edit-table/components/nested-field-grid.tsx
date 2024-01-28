import React from 'react';
import classes from '../edit-table.module.css';
import { FieldType, GUID } from '@/core/model';
import { FieldVm, fieldTypeOptions } from '../edit-table.vm';
import { Commands } from './commands/commands.component';
import { RightArrowIcon, ExpandDown } from '@/common/components';
import { AnimatePresence, Reorder } from 'framer-motion';

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
  const handleAddField = (fieldId: GUID, isChildren: boolean) => {
    if (isChildren) {
      expandField(fieldId);
    }
    onAddField(fieldId, isChildren);
  };

  const renderField = (field: FieldVm): JSX.Element => (
    <React.Fragment key={field.id}>
      <Reorder.Item
        value={field}
        key={field.id}
        style={{ y: 0 }}
        className={`${classes.fieldRow} `}
        initial={{
          opacity: 0,
          x: -200,
          scale: 0.8,
          borderTopWidth: 1,
        }}
        animate={{
          opacity: 1,
          x: 0,
          scale: 1,
          borderTopWidth: 0,
          transition: { duration: 0.3 },
        }}
        exit={{
          opacity: 0,
          x: -200,
          scale: 0.8,
          borderTopWidth: 1,
          transition: { duration: 0.3 },
        }}
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
          <input
            type="checkbox"
            checked={field.PK}
            onChange={() => updateFieldValue(field, 'PK', !field.PK)}
          />
        </div>
        <div className={classes.fieldCell}>
          <input
            type="checkbox"
            checked={field.FK}
            onChange={() => updateFieldValue(field, 'FK', !field.FK)}
          />
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
          <input
            type="checkbox"
            checked={field.isArray}
            onChange={() => updateFieldValue(field, 'isArray', !field.isArray)}
          />
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

  return (
    <Reorder.Group
      values={fields}
      onReorder={fields => onDragField(fields, id)}
      className={classes.nestedGrid}
      key={level}
      initial="collapsed"
      animate="open"
      exit="collapsed"
      variants={{
        open: { opacity: 1, height: 'auto' },
        collapsed: { opacity: 0, height: 0 },
      }}
      transition={{ duration: 0.8 }}
    >
      <AnimatePresence initial={false}>
        {fields.map(field => renderField(field))}
      </AnimatePresence>
    </Reorder.Group>
  );
};
