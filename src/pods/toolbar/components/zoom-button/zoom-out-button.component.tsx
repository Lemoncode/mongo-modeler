import { useCanvasViewSettingsContext } from '@/core/providers';
import { ZoomOut } from '@/common/components/icons/zoom-out-icon.component';
import { ActionButton } from '@/common/components/action-button';
import { SHORTCUTS } from '@/common/shortcut';

const MAXIMUM_ZOOM_FACTOR_ALLOWED = 7.8;

export const ZoomOutButton = () => {
  const { zoomOut, canvasViewSettings } = useCanvasViewSettingsContext();

  return (
    <ActionButton
      icon={<ZoomOut />}
      label="Zoom Out"
      onClick={zoomOut}
      className="hide-desktop"
      disabled={canvasViewSettings.zoomFactor > MAXIMUM_ZOOM_FACTOR_ALLOWED}
      shortcutOptions={SHORTCUTS.zoomOut}
    />
  );
};
