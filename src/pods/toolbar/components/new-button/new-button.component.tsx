import { NewIcon } from '@/common/components/icons/new-icon.component';
import { useCanvasSchemaContext } from '@/core/providers';
import { ToolbarButton } from '@/pods/toolbar/components/toolbar-button';
import classes from '@/pods/toolbar/toolbar.pod.module.css';

export const NewButton = () => {
  const { createEmptySchema } = useCanvasSchemaContext();

  const handleNewButtonClick = () => {
    createEmptySchema();
  };

  return (
    <ToolbarButton
      icon={<NewIcon />}
      label="New"
      onClick={handleNewButtonClick}
      className={classes.button}
    />
  );
};
