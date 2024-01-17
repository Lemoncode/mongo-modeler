import { SaveIcon } from '@/common/components/icons/save-icon.component';
import { ToolbarButton } from '@/pods/toolbar/components/toolbar-button';
import classes from '@/pods/toolbar/toolbar.pod.module.css';

export const SaveButton = () => {
  const handleSaveButtonClick = () => {
    console.log('Save button clicked');
  };

  return (
    <ToolbarButton
      icon={<SaveIcon />}
      label={'Save'}
      onClick={handleSaveButtonClick}
      className={classes.button}
    />
  );
};
