import React from 'react';
import { TrashIcon } from '@/common/components/icons';
import { useCanvasSchemaContext } from '@/core/providers';
import { ActionButton } from '@/common/components/action-button';
import { SHORTCUTS } from '@/common/shortcut';

export const DeleteButton: React.FC = () => {
  const { canvasSchema, deleteSelectedItem } = useCanvasSchemaContext();
  const handleDeleteSelectedItemClick = () => {
    if (canvasSchema.selectedElementId) {
      deleteSelectedItem(canvasSchema.selectedElementId);
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
