import { SaveIcon } from '@/common/components/icons/save-icon.component';
import { useCanvasSchemaContext } from '@/core/providers';
import { ToolbarButton } from '@/pods/toolbar/components/toolbar-button';
import classes from '@/pods/toolbar/toolbar.pod.module.css';

export const SaveButton = () => {
  const { canvasSchema } = useCanvasSchemaContext();
  const content = JSON.stringify(canvasSchema);

  const saveFile = async () => {
    const blob = new Blob([content], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    if (window.showDirectoryPicker === undefined) {
      const a = document.createElement('a');
      a.href = url;
      a.download = 'filename.txt';
      a.click();
    } else {
      try {
        const newFileHandle = await window.showSaveFilePicker({
          suggestedName: 'nuevo_nombre.txt',
        });
        const writableStream = await newFileHandle.createWritable();
        await writableStream.write(content);
        await writableStream.close();
      } catch (error) {
        console.log('Error save file: ' + error);
      }
    }
    URL.revokeObjectURL(url);
  };

  return (
    <ToolbarButton
      icon={<SaveIcon />}
      label={'Save'}
      onClick={saveFile}
      className={classes.button}
    />
  );
};
