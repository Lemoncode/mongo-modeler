import { NewIcon } from '@/common/components/icons/new-icon.component';
import {
  useCanvasSchemaContext,
  useCanvasViewSettingsContext,
} from '@/core/providers';
import { ActionButton } from '@/common/components/action-button';
import { SHORTCUTS } from '@/common/shortcut';

export const NewButton = () => {
  const { createEmptySchema } = useCanvasSchemaContext();
  const { setFilename, setLoadSample } = useCanvasViewSettingsContext();

  const handleNewButtonClick = () => {
    setFilename('');
    createEmptySchema();
    setLoadSample(false);
  };

  return (
    <ActionButton
      icon={<NewIcon />}
      label="New"
      onClick={handleNewButtonClick}
      className="hide-mobile"
      shortcutOptions={SHORTCUTS.new}
    />
  );
};
