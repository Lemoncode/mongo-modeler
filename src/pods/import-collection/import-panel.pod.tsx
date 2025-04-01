import React from 'react';
import classes from './import-panel.pod.module.css';
import * as canvasVm from '@/core/providers/canvas-schema';
import * as editTableVm from '../edit-table/edit-table.vm';
import { doMapOrCreateTable } from '../edit-table/edit-table.business';
import { mapEditTableVmToTableVm } from '../edit-table/edit-table.mapper';
import {
  parseJsonToFieldVm,
  validateJsonSchema,
} from './import-panel.business';

interface ImportPanelProps {
  table?: canvasVm.TableVm;
  relations: canvasVm.RelationVm[];
  onSave: (table: canvasVm.TableVm) => void;
  onClose: () => void;
}

const defaultJson = JSON.stringify(
  {
    _id: { $oid: '1234567890abcdef12345678' },
    user: {
      name: 'Ada Lovelace',
      age: { $numberInt: '36' },
      premiumUser: true,
      email: 'ada@babbage.com',
      preferences: {
        theme: 'dark',
        notifications: { email: true, sms: false },
      },
    },
    itemsPurchased: [
      { item: 'Mechanical Keyboard', price: { $numberDouble: '99.99' } },
      { item: 'Gaming Mouse', price: { $numberDouble: '49.99' } },
    ],
    createdAt: { $date: { $numberLong: '1740499516555' }, isNN: true },
    version: { $numberInt: '1' },
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

    const validationError = validateJsonSchema(newValue);
    setJsonError(validationError);
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
