import { OpenIcon } from '@/common/components/icons/open-icon.component';
import { ToolbarButton } from '@/pods/toolbar/components/toolbar-button';
import classes from '@/pods/toolbar/toolbar.pod.module.css';

export const OpenButton = () => {
  const handleOpenButtonClick = () => {
    console.log('Open button clicked');
  };

  return (
    <ToolbarButton
      icon={<OpenIcon />}
      label={'Open'}
      onClick={handleOpenButtonClick}
      className={classes.button}
    />
  );
};
