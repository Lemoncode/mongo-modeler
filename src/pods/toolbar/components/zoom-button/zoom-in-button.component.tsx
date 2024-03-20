import { useCanvasViewSettingsContext } from '@/core/providers';
import { ToolbarButton } from '../toolbar-button';
import { ZoomIn } from '@/common/components/icons';
import classes from '@/pods/toolbar/toolbar.pod.module.css';
import { SHORTCUTS } from '../../shortcut/shortcut.const';

const MINIMUM_ZOOM_FACTOR_ALLOWED = 2.5;

export const ZoomInButton = () => {
  const { zoomIn, canvasViewSettings } = useCanvasViewSettingsContext();

  return (
    <ToolbarButton
      icon={<ZoomIn />}
      label="Zoom In"
      onClick={zoomIn}
      className={classes.button}
      disabled={canvasViewSettings.zoomFactor < MINIMUM_ZOOM_FACTOR_ALLOWED}
      shortcutOptions={SHORTCUTS.zoomIn}
    />
  );
};
