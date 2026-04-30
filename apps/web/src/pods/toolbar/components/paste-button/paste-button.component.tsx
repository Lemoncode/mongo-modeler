import { useCanvasSchemaContext } from '@/core/providers/canvas-schema';
import { PasteIcon } from '@/common/components/icons';
import { ActionButton } from '@/common/components/action-button';
import { SHORTCUTS } from '@/common/shortcut';

export const PasteButton = () => {
  const { pasteTable, hasClipboardContent } = useCanvasSchemaContext();

  return (
    <ActionButton
      icon={<PasteIcon />}
      label="Paste"
      onClick={pasteTable}
      className="hide-mobile"
      disabled={!hasClipboardContent}
      shortcutOptions={SHORTCUTS.paste}
    />
  );
};
