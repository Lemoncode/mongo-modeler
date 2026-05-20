import { useModalDialogContext } from '@/core/providers/modal-dialog-provider';
import { AboutIcon } from '@/common/components/icons';
import { ABOUT_TITLE } from '@/common/components';
import { AboutPod } from '@/pods/about';
import { ActionButton } from '@/common/components/action-button';

export const AboutButton = () => {
  const { openModal } = useModalDialogContext();

  const handleRelationClick = () => {
    openModal(<AboutPod />, ABOUT_TITLE);
  };

  return (
    <ActionButton
      icon={<AboutIcon />}
      label="About us"
      onClick={handleRelationClick}
    />
  );
};
