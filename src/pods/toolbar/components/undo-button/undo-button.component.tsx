import React from 'react';
import { UndoIcon } from '@/common/components/icons';
import { useCanvasSchemaContext } from '@/core/providers';
import { ActionButton } from '@/common/components/action-button';
import { SHORTCUTS } from '@/common/shortcut';

export const UndoButton: React.FC = () => {
  const { doUndo } = useCanvasSchemaContext();

  return (
    <ActionButton
      icon={<UndoIcon />}
      label={'Undo'}
      onClick={() => doUndo()}
      className="hide-mobile"
      disabled={false}
      shortcutOptions={SHORTCUTS.undo}
    />
  );
};
