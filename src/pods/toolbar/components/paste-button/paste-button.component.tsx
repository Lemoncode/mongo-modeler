import { useCanvasSchemaContext } from '@/core/providers/canvas-schema';
import { PasteIcon } from '@/common/components/icons';
import { ToolbarButton } from '@/pods/toolbar/components/toolbar-button';
import classes from '@/pods/toolbar/toolbar.pod.module.css';
import { SHORTCUTS } from '../../shortcut/shortcut.const';

export const PasteButton = () => {
  const { pasteTable, hasClipboardContent } = useCanvasSchemaContext();

  return (
    <ToolbarButton
      icon={<PasteIcon />}
      label="Paste"
      onClick={pasteTable}
      className={`${classes.button} hide-mobile`}
      disabled={!hasClipboardContent}
      shortcutOptions={SHORTCUTS.Paste}
    />
  );
};
