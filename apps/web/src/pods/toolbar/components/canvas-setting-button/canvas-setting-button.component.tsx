import { useModalDialogContext } from '@/core/providers/modal-dialog-provider';
import { CanvasSettingsComponent } from '@/pods/canvas-settings';
import { CanvasSetting } from '@/common/components/icons';
import { CANVAS_SETTINGS_TITLE } from '@/common/components/modal-dialog';
import { ActionButton } from '@/common/components/action-button';
import { SHORTCUTS } from '@/common/shortcut';

export const CanvasSettingButton = () => {
  const { openModal, closeModal } = useModalDialogContext();

  const handleChangeSettings = () => {
    closeModal();
  };

  const handleCanvasSettings = () => {
    openModal(
      <CanvasSettingsComponent onChangeSettings={handleChangeSettings} />,
      CANVAS_SETTINGS_TITLE
    );
  };

  return (
    <ActionButton
      icon={<CanvasSetting />}
      label="Settings"
      onClick={handleCanvasSettings}
      className="hide-mobile"
      shortcutOptions={SHORTCUTS.settings}
    />
  );
};
