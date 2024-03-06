import { useCanvasViewSettingsContext } from '@/core/providers';
import { ToolbarButton } from '../toolbar-button';
import { ZoomOut } from '@/common/components/icons/zoom-out-icon.component';
import classes from '@/pods/toolbar/toolbar.pod.module.css';
import { SHORTCUTS } from '../../shortcut/shortcut.const';

const MAXIMUM_ZOOM_FACTOR_ALLOWED = 15.01;

export const ZoomOutButton = () => {
  const { zoomOut, canvasViewSettings } = useCanvasViewSettingsContext();

  return (
    <ToolbarButton
      icon={<ZoomOut />}
      label="Zoom Out"
      onClick={zoomOut}
      className={classes.button}
      disabled={canvasViewSettings.zoomFactor > MAXIMUM_ZOOM_FACTOR_ALLOWED}
      shortcutOptions={SHORTCUTS.zoomOut}
    />
  );
};
