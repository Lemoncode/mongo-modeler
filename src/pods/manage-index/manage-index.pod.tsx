import React from 'react';
import * as canvasVm from '@/core/providers/canvas-schema';
import * as editIndexVm from './manage-index.vm';
import { ManageIndexComponent } from './manage-index.component';
import { GUID } from '@/core/model';
import {
  addIndexLogic,
  moveDown,
  moveUp,
  removeIndex,
  save,
  updateIndexValueLogic,
} from './manage-index.business';

interface Props {
  table: canvasVm.TableVm;
  onSave: (table: canvasVm.TableVm) => void;
  onClose: () => void;
}

export const ManageIndexPod: React.FC<Props> = props => {
  const { table, onSave, onClose } = props;

  const [editTableIndex, setEditTableIndex] =
    React.useState<canvasVm.TableVm>(table);

  const handleSubmit = (table: canvasVm.TableVm) => {
    const saveResult = save(table);
    if (!saveResult.errorHandling.isSuccessful) {
      alert(saveResult.errorHandling.errorMessage);
      return;
    }
    onSave(saveResult.data ?? table);
  };

  const updateValue = <K extends keyof editIndexVm.FieldVm>(
    indexToUpdate: editIndexVm.FieldVm,
    key: K,
    value: editIndexVm.FieldVm[K]
  ) => {
    setEditTableIndex(currentTable =>
      updateIndexValueLogic(currentTable, {
        indexToUpdate: indexToUpdate as editIndexVm.FieldVm,
        key,
        value,
      })
    );
  };

  const onDelete = (indexId: GUID) => {
    setEditTableIndex(currentTable => removeIndex(currentTable, indexId));
  };

  const onAdd = (indexId: GUID, newIndexId: GUID) => {
    setEditTableIndex(currentTable =>
      addIndexLogic(currentTable, indexId, newIndexId)
    );
  };

  const onMoveDown = (id: GUID) => {
    setEditTableIndex(currentTable => moveDown(currentTable, id));
  };

  const onMoveUp = (id: GUID) => {
    setEditTableIndex(currentTable => moveUp(currentTable, id));
  };

  return (
    <>
      <ManageIndexComponent
        table={editTableIndex}
        updateValue={updateValue}
        onDelete={onDelete}
        onAdd={onAdd}
        onMoveDown={onMoveDown}
        onMoveUp={onMoveUp}
      />
      <div className="two-buttons">
        <button
          className="button-secondary"
          onClick={() => handleSubmit(editTableIndex)}
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
