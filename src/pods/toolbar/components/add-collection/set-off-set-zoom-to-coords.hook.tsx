import { useCanvasViewSettingsContext } from '@/core/providers/canvas-view-settings';
import { CANVAS_MAX_HEIGHT, CANVAS_MAX_WIDTH } from '@/core/providers';
import { Coords } from '@/core/model';

export const useOffsetZoomToCoords = ({ x, y }: Coords): Coords => {
  const { canvasViewSettings, viewBoxSize } = useCanvasViewSettingsContext();

  const MULTIPLIER_TO_SET_OFFSET_TO_CANVAS_DIMENSION_WIDTH =
    CANVAS_MAX_WIDTH / canvasViewSettings.canvasSize.width;
  const MULTIPLIER_TO_SET_OFFSET_TO_CANVAS_DIMENSION_HEIGHT =
    CANVAS_MAX_WIDTH / canvasViewSettings.canvasSize.height;
  const adjustedWidth = CANVAS_MAX_WIDTH / viewBoxSize.width;
  const adjustedHeight = CANVAS_MAX_HEIGHT / viewBoxSize.height;

  const newX =
    (x / (canvasViewSettings.zoomFactor * adjustedWidth) / adjustedWidth) *
    MULTIPLIER_TO_SET_OFFSET_TO_CANVAS_DIMENSION_WIDTH;
  const newY =
    (y / (canvasViewSettings.zoomFactor * adjustedHeight) / adjustedHeight) *
    MULTIPLIER_TO_SET_OFFSET_TO_CANVAS_DIMENSION_HEIGHT;

  return { x: newX, y: newY };
};
