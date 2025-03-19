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

export const ImportPanel: React.FC<ImportPanelProps> = props => {
  const { onSave, onClose, relations, table } = props;
  const [editTable, setEditTable] = React.useState<editTableVm.TableVm>(() =>
    doMapOrCreateTable(relations, table)
  );

  const handleSubmit = (table: editTableVm.TableVm) => {
    onSave(mapEditTableVmToTableVm(table));
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
      <div className="two-buttons">
        <button
          className="button-secondary"
          onClick={() => handleSubmit(editTable)}
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
