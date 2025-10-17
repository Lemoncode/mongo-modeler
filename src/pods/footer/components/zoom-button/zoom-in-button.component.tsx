import { useCanvasViewSettingsContext } from '@/core/providers';
import { ZoomIn } from '@/common/components/icons';
import { ActionButton } from '@/common/components/action-button';
import { SHORTCUTS } from '@/common/shortcut/shortcut.const';
import classes from './zoom-in-button.component.module.css';

const MINIMUM_ZOOM_FACTOR_ALLOWED = 2.5;

export const ZoomInButton = () => {
  const { zoomIn, canvasViewSettings } = useCanvasViewSettingsContext();

  return (
    <ActionButton
      icon={<ZoomIn />}
      label="Zoom In"
      onClick={zoomIn}
      className={`${classes.button} hide-mobile`}
      disabled={canvasViewSettings.zoomFactor < MINIMUM_ZOOM_FACTOR_ALLOWED}
      shortcutOptions={SHORTCUTS.zoomIn}
      showLabel={false}
      tooltipPosition="top"
    />
  );
};
