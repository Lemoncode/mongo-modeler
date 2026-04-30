import { Size } from '@/core/model';
import { CANVAS_MAX_HEIGHT, CANVAS_MAX_WIDTH } from '@/core/providers';

export const setOffSetZoomToCoords = (
  x: number,
  y: number,
  viewBoxSize: Size,
  canvasSize: Size,
  zoomFactor: number
) => {
  const MULTIPLIER_TO_SET_OFFSET_TO_CANVAS_DIMENSION_WIDTH =
    CANVAS_MAX_WIDTH / canvasSize.width;
  const MULTIPLIER_TO_SET_OFFSET_TO_CANVAS_DIMENSION_HEIGHT =
    CANVAS_MAX_WIDTH / canvasSize.height;
  const adjustedWidth = CANVAS_MAX_WIDTH / viewBoxSize.width;
  const adjustedHeight = CANVAS_MAX_HEIGHT / viewBoxSize.height;

  const newX =
    (x / (zoomFactor * adjustedWidth) / adjustedWidth) *
    MULTIPLIER_TO_SET_OFFSET_TO_CANVAS_DIMENSION_WIDTH;
  const newY =
    (y / (zoomFactor * adjustedHeight) / adjustedHeight) *
    MULTIPLIER_TO_SET_OFFSET_TO_CANVAS_DIMENSION_HEIGHT;

  return { x: newX, y: newY };
};
