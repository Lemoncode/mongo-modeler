import { SaveIcon } from '@/common/components/icons/save-icon.component';
import { downloadFile, saveFileModern } from '@/common/export';
import { useCanvasSchemaContext } from '@/core/providers';
import { ToolbarButton } from '@/pods/toolbar/components/toolbar-button';
import classes from '@/pods/toolbar/toolbar.pod.module.css';

const defaultFileName = 'diagram.mml';

export const SaveButton = () => {
  const { canvasSchema } = useCanvasSchemaContext();
  const content = JSON.stringify(canvasSchema);

  const saveFile = async (filename: string) => {
    const blob = new Blob([content], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    if (window.showDirectoryPicker === undefined) {
      downloadFile(filename, content, 'application/json');
    } else {
      saveFileModern(filename, content);
    }
    URL.revokeObjectURL(url);
  };

  return (
    <ToolbarButton
      icon={<SaveIcon />}
      label={'Save'}
      onClick={() => saveFile(defaultFileName)}
      className={classes.button}
    />
  );
};
