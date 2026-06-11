import React from 'react';
import { TrashIcon } from '@/common/components/icons';
import { useCanvasSchemaContext } from '@/core/providers';
import { ActionButton } from '@/common/components/action-button';
import { SHORTCUTS } from '@/common/shortcut';
import { useModalDialogContext } from '@/core/providers';
import { REMOVE_TABLE_CONFIRMATION_TABLE } from '@/common/components';
import { DeleteTableDialog } from './delete-table-dialog.component';


export const DeleteButton: React.FC = () => {
  const { canvasSchema, deleteSelectedItem } = useCanvasSchemaContext();
  const { openModal, closeModal } = useModalDialogContext();

  const handleDeleteSelectedItemClick = () => {
    if (!canvasSchema.selectedElementId) return;

    const selectedTable = canvasSchema.tables.find(t => t.id === canvasSchema.selectedElementId);
    const hasChildren = (selectedTable?.fields.length ?? 0) > 1 ||
      canvasSchema.relations.some(r => r.fromTableId === canvasSchema.selectedElementId ||
      r.toTableId === canvasSchema.selectedElementId);

    const doDeleteSelectedItem = () => {
      if (!canvasSchema.selectedElementId) return;
      deleteSelectedItem(canvasSchema.selectedElementId);
      closeModal();
    }

    if (hasChildren) {
      openModal(
        <DeleteTableDialog onConfirm={doDeleteSelectedItem} onCancel={closeModal} />,
        REMOVE_TABLE_CONFIRMATION_TABLE
      )
    } else {
      doDeleteSelectedItem();
    }
  };
  return (
    <ActionButton
      icon={<TrashIcon />}
      label="Delete"
      onClick={handleDeleteSelectedItemClick}
      className="hide-mobile"
      disabled={canvasSchema.selectedElementId ? false : true}
      shortcutOptions={SHORTCUTS.delete}
    />
  );
};
