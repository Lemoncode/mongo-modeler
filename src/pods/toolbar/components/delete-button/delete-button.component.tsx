import React from 'react';
import classes from '@/pods/toolbar/toolbar.pod.module.css';
import { TrashIcon } from '@/common/components/icons';
import { ToolbarButton } from '../toolbar-button';
import { useCanvasSchemaContext } from '@/core/providers';
import { SHORTCUTS } from '../../shortcut/shortcut.const';

export const DeleteButton: React.FC = () => {
  const { canvasSchema, deleteSelectedItem } = useCanvasSchemaContext();
  const handleDeleteSelectedItemClick = () => {
    if (canvasSchema.selectedElementId) {
      deleteSelectedItem(canvasSchema.selectedElementId);
    }
  };
  return (
    <ToolbarButton
      icon={<TrashIcon />}
      label="Delete"
      onClick={handleDeleteSelectedItemClick}
      className={`${classes.button} hide-mobile`}
      disabled={canvasSchema.selectedElementId ? false : true}
      shortcutOptions={SHORTCUTS.delete}
    />
  );
};
