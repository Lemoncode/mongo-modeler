import React from 'react';
import { RedoIcon } from '@/common/components/icons';
import { useCanvasSchemaContext } from '@/core/providers';
import { ActionButton } from '@/common/components/action-button';
import { SHORTCUTS } from '@/common/shortcut';

export const RedoButton: React.FC = () => {
  const { canRedo, doRedo } = useCanvasSchemaContext();

  return (
    <ActionButton
      icon={<RedoIcon />}
      label={'Redo'}
      onClick={() => doRedo()}
      className="hide-mobile"
      disabled={!canRedo()}
      shortcutOptions={SHORTCUTS.redo}
    />
  );
};
