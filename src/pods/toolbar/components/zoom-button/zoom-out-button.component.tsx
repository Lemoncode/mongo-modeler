import { useCanvasViewSettingsContext } from '@/core/providers';
import { ToolbarButton } from '../toolbar-button';
import { ZoomOut } from '@/common/components/icons/zoom-out-icon.component';
import classes from '@/pods/toolbar/toolbar.pod.module.css';
import { SHORTCUTS } from '../../shortcut/shortcut.const';

export const ZoomOutButton = () => {
  const { zoomOut } = useCanvasViewSettingsContext();

  return (
    <ToolbarButton
      icon={<ZoomOut />}
      label="Zoom Out"
      onClick={zoomOut}
      className={classes.button}
      shortcutOptions={SHORTCUTS.zoomOut}
    />
  );
};
