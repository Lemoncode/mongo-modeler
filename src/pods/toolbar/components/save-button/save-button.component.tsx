import { SaveIcon } from '@/common/components/icons/save-icon.component';
import { downloadFile, saveFileModern } from '@/common/export';
import {
  useCanvasSchemaContext,
  useCanvasViewSettingsContext,
} from '@/core/providers';
import { ToolbarButton } from '@/pods/toolbar/components/toolbar-button';
import classes from '@/pods/toolbar/toolbar.pod.module.css';

const DEFAULT_FILE_NAME = 'diagram';
const DEFAULT_EXTENSION_DESCRIPTION = 'Mongo Modeler';
const DEFAULT_FILE_EXTENSION = 'mml';

export const SaveButton = () => {
  const { canvasSchema } = useCanvasSchemaContext();
  const { filename: openedFilename, setFilename } =
    useCanvasViewSettingsContext();

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
      }
    }
    URL.revokeObjectURL(url);
  };

  return (
    <ToolbarButton
      icon={<SaveIcon />}
      label={'Save'}
      onClick={() => saveFile(openedFilename)}
      className={classes.button}
      disabled={canvasSchema.tables.length < 1}
    />
  );
};
