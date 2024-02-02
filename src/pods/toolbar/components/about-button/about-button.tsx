import { useModalDialogContext } from '@/core/providers/modal-dialog-provider';
import { AboutIcon } from '@/common/components/icons';
import { ToolbarButton } from '@/pods/toolbar/components/toolbar-button';
import classes from '@/pods/toolbar/toolbar.pod.module.css';
import { ABOUT_TITLE } from '@/common/components';
import { AboutPod } from '@/pods/about';

export const AboutButton = () => {
  const { openModal } = useModalDialogContext();

  const handleRelationClick = () => {
    openModal(<AboutPod />, ABOUT_TITLE);
  };

  return (
    <ToolbarButton
      icon={<AboutIcon />}
      label="About us"
      onClick={handleRelationClick}
      className={classes.button}
    />
  );
};
