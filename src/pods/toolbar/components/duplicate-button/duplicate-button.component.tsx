import { useCanvasSchemaContext } from '@/core/providers/canvas-schema';
import { CopyIcon } from '@/common/components/icons';
import { ToolbarButton } from '@/pods/toolbar/components/toolbar-button';
import classes from '@/pods/toolbar/toolbar.pod.module.css';
import { SHORTCUTS } from '../../shortcut/shortcut.const';

export const DuplicateButton = () => {
  const { canvasSchema, duplicateSelectedTable } = useCanvasSchemaContext();

  return (
    <ToolbarButton
      icon={<CopyIcon />}
      label="Duplicate Table"
      onClick={duplicateSelectedTable}
      className={`${classes.button} hide-mobile`}
      disabled={!canvasSchema.selectedElementId}
      shortcutOptions={SHORTCUTS.duplicate}
    />
  );
};
