import { useCanvasViewSettingsContext } from '@/core/providers';
import { ToolbarButton } from '../toolbar-button';
import { ZoomIn } from '@/common/components/icons';
import classes from '@/pods/toolbar/toolbar.pod.module.css';
import { SHORTCUTS } from '../../shortcut/shortcut.const';

export const ZoomInButton = () => {
  const { zoomIn } = useCanvasViewSettingsContext();

  return (
    <ToolbarButton
      icon={<ZoomIn />}
      label="Zoom In"
      onClick={zoomIn}
      className={classes.button}
      shortcutOptions={SHORTCUTS.zoomIn}
    />
  );
};
