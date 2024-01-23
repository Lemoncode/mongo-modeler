import React from 'react';
import classes from '@/pods/toolbar/toolbar.pod.module.css';
import { TrashIcon } from '@/common/components/icons';
import { ToolbarButton } from '../toolbar-button';
import { useCanvasSchemaContext } from '@/core/providers';

export const DeleteButton: React.FC = () => {
  const { canvasSchema, deleteSelectedItem } = useCanvasSchemaContext();
  const handleDeleteSelectedItemClick = () => {
    if (canvasSchema.selectedElementId) {
      console.log(canvasSchema.selectedElementId);
      deleteSelectedItem(canvasSchema.selectedElementId);
    }
  };
  return (
    <ToolbarButton
      icon={<TrashIcon />}
      label="Delete"
      onClick={handleDeleteSelectedItemClick}
      className={classes.button}
      disabled={canvasSchema.selectedElementId ? false : true}
    />
  );
};
