import { useCanvasViewSettingsContext } from '@/core/providers';
import { ZoomIn } from '@/common/components/icons';
import { ActionButton } from '@/common/components/action-button';
import { SHORTCUTS } from '@/common/shortcut';

const MINIMUM_ZOOM_FACTOR_ALLOWED = 2.5;

export const ZoomInButton = () => {
  const { zoomIn, canvasViewSettings } = useCanvasViewSettingsContext();

  return (
    <ActionButton
      icon={<ZoomIn />}
      label="Zoom In"
      onClick={zoomIn}
      className="hide-desktop"
      disabled={canvasViewSettings.zoomFactor < MINIMUM_ZOOM_FACTOR_ALLOWED}
      shortcutOptions={SHORTCUTS.zoomIn}
    />
  );
};
