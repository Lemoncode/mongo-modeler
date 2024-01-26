import React from 'react';
import classes from '../edit-table.module.css';
import { FieldType, GUID } from '@/core/model';
import { FieldVm, fieldTypeOptions } from '../edit-table.vm';
import { Commands } from './commands/commands.component';
import { RightArrowIcon, ExpandDown } from '@/common/components';

interface NestedFieldGridProps {
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
}

export const NestedFieldGrid: React.FC<NestedFieldGridProps> = ({
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
}) => {
  const handleAddField = (fieldId: GUID, isChildren: boolean) => {
    if (isChildren) {
      expandField(fieldId);
    }
    onAddField(fieldId, isChildren);
  };

  const renderField = (field: FieldVm): JSX.Element => (
    <React.Fragment key={field.id}>
      <div className={`${classes.fieldRow} `}>
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
          <div className={classes.checkbox}>
            <input
              type="checkbox"
              id="check-21"
              checked={field.PK}
              onChange={() => updateFieldValue(field, 'PK', !field.PK)}
            />
            <label htmlFor="check-21">
              <svg viewBox="0,0,50,50">
                <path d="M5 30 L 20 45 L 45 5"></path>
              </svg>
            </label>
          </div>
        </div>
        <div className={classes.fieldCell}>
          <div className={classes.checkbox}>
            <input
              type="checkbox"
              id="check-2"
              checked={field.FK}
              onChange={() => updateFieldValue(field, 'FK', !field.FK)}
            />
            <label htmlFor="check-2">
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
          <div className={classes.checkbox}>
            <input
              id="check-3"
              type="checkbox"
              checked={field.isArray}
              onChange={() =>
                updateFieldValue(field, 'isArray', !field.isArray)
              }
            />
            <label htmlFor="check-3">
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
      </div>
      {field.children && expandedFields.has(field.id) && (
        <NestedFieldGrid
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
        />
      )}
    </React.Fragment>
  );

  return (
    <div className={classes.nestedGrid}>
      {fields.map(field => renderField(field))}
    </div>
  );
};
