import React from 'react';
import classes from './import-panel.pod.module.css';
import * as canvasVm from '@/core/providers/canvas-schema';
import * as editTableVm from '../edit-table/edit-table.vm';
import { doMapOrCreateTable } from '../edit-table/edit-table.business';
import { mapEditTableVmToTableVm } from '../edit-table/edit-table.mapper';

interface ImportPanelProps {
  table?: canvasVm.TableVm;
  relations: canvasVm.RelationVm[];
  onSave: (table: canvasVm.TableVm) => void;
  onClose: () => void;
}

const defaultJson = JSON.stringify(
  {
    _id: { $oid: '5f5f9b3b4b4b1f001f1b1f1b' },
    age: '30',
    name: 'John Doe',
  },
  null,
  2
);

export const ImportPanel: React.FC<ImportPanelProps> = props => {
  const { onSave, onClose, relations, table } = props;
  const [jsonContent, setJsonContent] = React.useState<string>(defaultJson);
  const [jsonError, setJsonError] = React.useState<string | null>(null);

  const [editTable, setEditTable] = React.useState<editTableVm.TableVm>(() =>
    doMapOrCreateTable(relations, table)
  );

  const handleSubmit = (table: editTableVm.TableVm) => {
    console.log(jsonContent);
    onSave(mapEditTableVmToTableVm(table));
  };

  const handleJsonContentChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const newValue = e.currentTarget.value;
    setJsonContent(newValue);

    try {
      JSON.parse(newValue);
      setJsonError(null);
    } catch (error) {
      setJsonError('El JSON no es válido');
    }
  };

  const handleChangeTableName = (e: React.ChangeEvent<HTMLInputElement>) => {
    const tableName: string = e.currentTarget.value;
    setEditTable({ ...editTable, tableName });
  };

  return (
    <>
      <div className={classes.tableName}>
        <label>
          Collection:
          <input
            type="text"
            value={table?.tableName}
            onChange={handleChangeTableName}
            onFocus={e => e.currentTarget.select()}
          />
        </label>
      </div>
      <div className={classes.jsonTextarea}>
        <label>
          JSON Schema:
          <textarea
            value={jsonContent}
            onChange={handleJsonContentChange}
            onFocus={e => e.currentTarget.select()}
          />
        </label>
      </div>
      <div className={classes.errorMessage} style={{ minHeight: '20px' }}>
        {jsonError && <p style={{ color: 'red', margin: 0 }}>{jsonError}</p>}
      </div>
      <div className="two-buttons">
        <button
          className="button-secondary"
          onClick={() => handleSubmit(editTable)}
          disabled={jsonError !== null}
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
