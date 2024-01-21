import React from 'react';
import { UndoIcon } from '@/common/components/icons';
import { ToolbarButton } from '@/pods/toolbar/components/toolbar-button';
import { useCanvasSchemaContext } from '@/core/providers';
import classes from '@/pods/toolbar/toolbar.pod.module.css';

export const UndoButton: React.FC = () => {
  const { doUndo } = useCanvasSchemaContext();

  return (
    <ToolbarButton
      icon={<UndoIcon />}
      label={'Undo'}
      onClick={() => doUndo()}
      className={classes.button}
      disabled={false}
    />
  );
};
