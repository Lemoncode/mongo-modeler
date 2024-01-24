import React from 'react';
import classes from '../edit-table.module.css';
import { FieldType, GUID } from '@/core/model';
import { FieldVm, fieldTypeOptions } from '../edit-table.vm';
import { Commands } from './commands/commands.component';

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
  const INDENT_LEVEL_MARGIN = 20;

  const renderFieldHeaders = () => (
    <div
      className={classes.headerRow}
      style={{ marginLeft: `${INDENT_LEVEL_MARGIN * level}px` }}
    >
      <div className={`${classes.headerCell} ${classes.expandCell}`}>
        Expand
      </div>
      <div className={classes.headerCell}>PK</div>
      <div className={classes.headerCell}>FK</div>
      <div className={classes.headerCell}>Name</div>
      <div className={classes.headerCell}>Type</div>
      <div className={classes.headerCell}>isArray</div>
      <div className={classes.headerCell}>Actions</div>
    </div>
  );

  const handleAddField = (fieldId: GUID, isChildren: boolean) => {
    if (isChildren) {
      expandField(fieldId);
    }
    onAddField(fieldId, isChildren);
  };

  const renderField = (field: FieldVm): JSX.Element => (
    <React.Fragment key={field.id}>
      <div
        className={classes.fieldRow}
        style={{ marginLeft: `${INDENT_LEVEL_MARGIN * level}}px` }}
      >
        <div className={`${classes.fieldCell} ${classes.expandCell}`}>
          {field.type === 'object' ? (
            <button onClick={() => toggleExpand(field.id)}>
              {expandedFields.has(field.id) ? '▼' : '▶'}
            </button>
          ) : (
            <div /> // Empty div just to keep constant width
          )}
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
          <input
            value={field.name}
            onChange={e => {
              updateFieldValue(field, 'name', e.target.value);
            }}
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
      {renderFieldHeaders()}
      {fields.map(field => renderField(field))}
    </div>
  );
};
