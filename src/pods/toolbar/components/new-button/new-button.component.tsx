import { NewIcon } from '@/common/components/icons/new-icon.component';
import { ToolbarButton } from '@/pods/toolbar/components/toolbar-button';
import classes from '@/pods/toolbar/toolbar.pod.module.css';

export const NewButton = () => {
  const handleNewButtonClick = () => {
    console.log('New button clicked');
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
