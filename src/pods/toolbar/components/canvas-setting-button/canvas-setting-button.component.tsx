import { useModalDialogContext } from '@/core/providers/modal-dialog-provider';
import { CanvasSettingsComponent } from '@/pods/canvas-settings';
import { ToolbarButton } from '../toolbar-button';
import { CanvasSetting } from '@/common/components/icons';
import classes from '@/pods/toolbar/toolbar.pod.module.css';
import { CANVAS_SETTINGS_TITLE } from '@/common/components/modal-dialog';
import { SHORTCUTS } from '../../shortcut/shortcut.const';

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
    <ToolbarButton
      icon={<CanvasSetting />}
      label="Settings"
      onClick={handleCanvasSettings}
      className={`${classes.button} hide-mobile`}
      shortcutOptions={SHORTCUTS.settings}
    />
  );
};
