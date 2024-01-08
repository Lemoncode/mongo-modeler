import { useModalDialogContext } from '@/core/providers';
import { useCanvasViewSettingsContext } from '@/core/providers/canvas-view-settings';
import { CanvasSettingsComponent } from '@/pods/canvas-settings';
import { Size } from '@/core/model';
import { ToolbarButton } from '../toolbar-button';
import { CanvasSetting } from '@/common/components/icons';
import classes from '@/pods/toolbar/toolbar.pod.module.css';

export const CanvasSettingButton = () => {
  const { openModal, closeModal } = useModalDialogContext();

  const { canvasViewSettings, setCanvasSize } = useCanvasViewSettingsContext();

  const handleChangeSettings = (size: Size) => {
    setCanvasSize(size);
    closeModal();
  };

  const handleCanvasSettings = () => {
    openModal(
      <CanvasSettingsComponent
        size={canvasViewSettings.canvasSize}
        onChangeSize={handleChangeSettings}
      />
    );
  };

  return (
    <ToolbarButton
      icon={<CanvasSetting />}
      label="Settings"
      onClick={handleCanvasSettings}
      className={classes.button}
    />
  );
};
