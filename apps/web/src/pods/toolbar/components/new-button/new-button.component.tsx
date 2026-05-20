import { ActionButton } from '@/common/components/action-button';
import { NewIcon } from '@/common/components/icons/new-icon.component';
import { SHORTCUTS } from '@/common/shortcut';
import {
  useCanvasSchemaContext,
  useCanvasViewSettingsContext,
} from '@/core/providers';
import { isVSCodeEnv } from '@/core/vscode/env.helpers';
import { sendToExtension } from '@/core/vscode/vscode-bridge.helpers';
import { APP_MESSAGE_TYPE } from '@lemoncode/mongo-modeler-bridge-protocol';

export const NewButton = () => {
  const { createEmptySchema } = useCanvasSchemaContext();
  const { setFilename, setLoadSample } = useCanvasViewSettingsContext();

  const handleNewButtonClick = () => {
    if (isVSCodeEnv()) {
      sendToExtension({ type: APP_MESSAGE_TYPE.NEW_DIAGRAM });
      return;
    }
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
