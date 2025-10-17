import { ActionButton } from '@/common/components/action-button';
import { SaveIcon } from '@/common/components/icons/save-icon.component';
import { downloadFile, saveFileModern } from '@/common/export';
import { SHORTCUTS } from '@/common/shortcut';
import {
  useCanvasSchemaContext,
  useCanvasViewSettingsContext,
} from '@/core/providers';

const DEFAULT_FILE_NAME = 'diagram';
const DEFAULT_EXTENSION_DESCRIPTION = 'Mongo Modeler';
const DEFAULT_FILE_EXTENSION = 'mml';

export const SaveButton = () => {
  const { canvasSchema, switchIsPristine } = useCanvasSchemaContext();
  const { canvasViewSettings, setFilename } = useCanvasViewSettingsContext();

  const content = JSON.stringify(canvasSchema);

  const saveFile = async (openedFilename: string) => {
    const filename = openedFilename !== '' ? openedFilename : DEFAULT_FILE_NAME;

    const blob = new Blob([content], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    if (window.showDirectoryPicker === undefined) {
      downloadFile(filename, content, 'application/json');
    } else {
      const savedFilename = await saveFileModern(
        {
          filename,
          extension: DEFAULT_FILE_EXTENSION,
          description: DEFAULT_EXTENSION_DESCRIPTION,
        },
        content
      );

      if (savedFilename) {
        setFilename(savedFilename);
        switchIsPristine(true);
      }
    }
    URL.revokeObjectURL(url);
  };

  return (
    <ActionButton
      icon={<SaveIcon />}
      label={'Save'}
      onClick={() => saveFile(canvasViewSettings.filename)}
      className="hide-mobile"
      shortcutOptions={SHORTCUTS.save}
      disabled={canvasSchema.tables.length < 1}
    />
  );
};
