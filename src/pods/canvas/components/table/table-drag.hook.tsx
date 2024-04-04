import React, { useCallback, useState } from 'react';
import { Size } from '@/core/model';
import { UpdatePositionFn, UpdatePositionItemInfo } from '@/core/providers';
import { useCanvasViewSettingsContext } from '@/core/providers/canvas-view-settings';
import {
  CANVAS_MAX_HEIGHT,
  CANVAS_MAX_WIDTH,
} from '../../canvas-svg.component';
export const useDraggable = (
  id: string,
  initialX: number,
  initialY: number,
  updatePosition: UpdatePositionFn,
  totalHeight: number,
  canvasSize: Size
) => {
  const [isDragging, setIsDragging] = useState(false);
  const [startDragPosition, setStartDragPosition] = useState({ x: 0, y: 0 });
  const [finalInfoAfterDrag, setFinalInfoAfterDrag] =
    useState<UpdatePositionItemInfo | null>(null);
  const [node, setNode] = React.useState<SVGElement | null>(null);
  const { canvasViewSettings, viewBoxSize } = useCanvasViewSettingsContext();

  const ref = React.useCallback((nodeEle: SVGElement): void => {
    setNode(nodeEle);
  }, []);

  const setOffSetZoomToCoords = (x: number, y: number) => {
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

  console.log('ZOOM DONE', viewBoxSize.width, viewBoxSize.height);

  const startDrag = (x: number, y: number) => {
    setStartDragPosition({
      x: setOffSetZoomToCoords(x, y).x - initialX,
      y: setOffSetZoomToCoords(x, y).y - initialY,
    });
    setIsDragging(true);
  };

  const onMouseDown = useCallback(
    (event: React.MouseEvent) => {
      startDrag(event.clientX, event.clientY);
    },
    [initialX, initialY, viewBoxSize]
  );

  const onTouchStart = useCallback(
    (event: React.TouchEvent) => {
      event.preventDefault();
      const touch = event.touches[0];
      startDrag(touch.clientX, touch.clientY);
    },
    [initialX, initialY, viewBoxSize]
  );

  const updateDrag = (x: number, y: number) => {
    if (isDragging) {
      const newX = setOffSetZoomToCoords(x, y).x - startDragPosition.x;
      const newY = setOffSetZoomToCoords(x, y).y - startDragPosition.y;

      const currentItemInfo = {
        id,
        position: { x: newX, y: newY },
        totalHeight,
        canvasSize,
      };

      updatePosition(currentItemInfo, false);
      setFinalInfoAfterDrag(currentItemInfo);
    }
  };

  const onMouseMove = useCallback(
    (event: MouseEvent) => {
      updateDrag(event.clientX, event.clientY);
    },
    [id, isDragging, startDragPosition, updatePosition, totalHeight, canvasSize]
  );

  const onTouchMove = useCallback(
    (event: TouchEvent) => {
      event.preventDefault();
      const touch = event.touches[0];
      updateDrag(touch.clientX, touch.clientY);
    },
    [id, isDragging, startDragPosition, updatePosition, totalHeight, canvasSize]
  );

  const endDrag = useCallback(() => {
    setIsDragging(false);
    if (finalInfoAfterDrag) {
      updatePosition(finalInfoAfterDrag, true);
    }
  }, [finalInfoAfterDrag, updatePosition]);

  React.useEffect(() => {
    if (!node) return;
    if (isDragging) {
      window.addEventListener('mousemove', onMouseMove);
      window.addEventListener('mouseup', endDrag);
      node.addEventListener('touchmove', onTouchMove);
      node.addEventListener('touchend', endDrag);
    } else {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', endDrag);
      node.removeEventListener('touchmove', onTouchMove);
      node.removeEventListener('touchend', endDrag);
    }

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', endDrag);
      node.removeEventListener('touchmove', onTouchMove);
      node.removeEventListener('touchend', endDrag);
    };
  }, [isDragging, onMouseMove, onTouchMove, endDrag]);

  return { onMouseDown, onTouchStart, ref };
};
