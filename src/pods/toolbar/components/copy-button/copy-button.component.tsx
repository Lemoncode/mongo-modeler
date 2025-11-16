import { useCanvasSchemaContext } from '@/core/providers/canvas-schema';
import { CopyIcon } from '@/common/components/icons';
import { ActionButton } from '@/common/components/action-button';
import { SHORTCUTS } from '@/common/shortcut';

export const CopyButton = () => {
  const { canvasSchema, copySelectedTable } = useCanvasSchemaContext();

  return (
    <ActionButton
      icon={<CopyIcon />}
      label="Copy"
      onClick={copySelectedTable}
      className="hide-mobile"
      disabled={!canvasSchema.selectedElementId}
      shortcutOptions={SHORTCUTS.copy}
    />
  );
};
