import { useCanvasSchemaContext } from '@/core/providers/canvas-schema';
import { CopyIcon } from '@/common/components/icons';
import { ActionButton } from '@/common/components/action-button';
import { SHORTCUTS } from '@/common/shortcut';

export const DuplicateButton = () => {
  const { canvasSchema, duplicateSelectedTable } = useCanvasSchemaContext();

  return (
    <ActionButton
      icon={<CopyIcon />}
      label="Duplicate Table"
      onClick={duplicateSelectedTable}
      className="hide-mobile"
      disabled={!canvasSchema.selectedElementId}
      shortcutOptions={SHORTCUTS.duplicate}
    />
  );
};
