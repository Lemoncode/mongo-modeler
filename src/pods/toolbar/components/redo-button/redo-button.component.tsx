import React from 'react';
import { RedoIcon } from '@/common/components/icons';
import { ToolbarButton } from '@/pods/toolbar/components/toolbar-button';
import { useCanvasSchemaContext } from '@/core/providers';
import classes from '@/pods/toolbar/toolbar.pod.module.css';

export const RedoButton: React.FC = () => {
  const { canRedo, doRedo } = useCanvasSchemaContext();

  return (
    <ToolbarButton
      icon={<RedoIcon />}
      label={'Redo'}
      onClick={() => doRedo()}
      className={classes.button}
      disabled={!canRedo()}
    />
  );
};
