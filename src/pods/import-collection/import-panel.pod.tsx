import React from 'react';
import classes from './import-panel.pod.module.css';
import * as canvasVm from '@/core/providers/canvas-schema';
import * as editTableVm from '../edit-table/edit-table.vm';
import { doMapOrCreateTable } from '../edit-table/edit-table.business';
import { mapEditTableVmToTableVm } from '../edit-table/edit-table.mapper';
import { parseJsonToFieldVm } from './edit-table.business';

interface ImportPanelProps {
  table?: canvasVm.TableVm;
  relations: canvasVm.RelationVm[];
  onSave: (table: canvasVm.TableVm) => void;
  onClose: () => void;
}

const defaultJson = JSON.stringify(
  {
    _id: { $oid: '67bdea3c01572368ed0b2d81' },
    room: 'ada-36567',
    content: '\nHello\n\nworld\n',
    expireAt: {
      $date: { $numberLong: '1740499516555' },
      isNN: true,
    },
    __v: { $numberInt: '0' },
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

  const handleSubmit = () => {
    try {
      const parsedJson = JSON.parse(jsonContent);
      const parsedFields = parseJsonToFieldVm(parsedJson);
      const newTable: editTableVm.TableVm = {
        ...editTable,
        fields: parsedFields,
      };
      onSave(mapEditTableVmToTableVm(newTable));
    } catch (error) {
      setJsonError('El JSON no es válido');
    }
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
            value={editTable.tableName}
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
          onClick={handleSubmit}
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
