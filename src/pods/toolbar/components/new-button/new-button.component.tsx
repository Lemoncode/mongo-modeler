import { NewIcon } from '@/common/components/icons/new-icon.component';
import {
  useCanvasSchemaContext,
  useCanvasViewSettingsContext,
} from '@/core/providers';
import { ToolbarButton } from '@/pods/toolbar/components/toolbar-button';
import classes from '@/pods/toolbar/toolbar.pod.module.css';
import { SHORTCUTS } from '../../shortcut/shortcut.const';

export const NewButton = () => {
  const { createEmptySchema, clearClipboard } = useCanvasSchemaContext();
  const { setFilename, setLoadSample } = useCanvasViewSettingsContext();

  const handleNewButtonClick = () => {
    setFilename('');
    createEmptySchema();
    setLoadSample(false);
    clearClipboard();
  };

  return (
    <ToolbarButton
      icon={<NewIcon />}
      label="New"
      onClick={handleNewButtonClick}
      className={`${classes.button} hide-mobile`}
      shortcutOptions={SHORTCUTS.new}
    />
  );
};
