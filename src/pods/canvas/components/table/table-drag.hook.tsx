import React, { useState, useCallback } from 'react';
import { Size } from '@/core/model';
import { UpdatePositionFn, UpdatePositionItemInfo } from '@/core/providers';
import { setOffSetZoomToCoords } from '@/common/helpers/set-off-set-zoom-to-coords.helper';
export const useDraggable = (
  id: string,
  initialX: number,
  initialY: number,
  updatePosition: UpdatePositionFn,
  totalHeight: number,
  canvasSize: Size,
  viewBoxSize: Size,
  zoomFactor: number
) => {
  const [isDragging, setIsDragging] = useState(false);
  const [startDragPosition, setStartDragPosition] = useState({ x: 0, y: 0 });
  const [finalInfoAfterDrag, setFinalInfoAfterDrag] =
    useState<UpdatePositionItemInfo | null>(null);
  const [node, setNode] = React.useState<SVGElement | null>(null);
  const ref = React.useCallback((nodeEle: SVGElement): void => {
    setNode(nodeEle);
  }, []);

  const startDrag = (x: number, y: number) => {
    const { x: offsetX, y: offsetY } = setOffSetZoomToCoords(
      x,
      y,
      viewBoxSize,
      canvasSize,
      zoomFactor
    );
    setStartDragPosition({
      x: offsetX - initialX,
      y: offsetY - initialY,
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
      const { x: offsetX, y: offsetY } = setOffSetZoomToCoords(
        x,
        y,
        viewBoxSize,
        canvasSize,
        zoomFactor
      );
      const newPosition = {
        id,
        position: {
          x: offsetX - startDragPosition.x,
          y: offsetY - startDragPosition.y,
        },
        totalHeight,
        canvasSize,
      };

      updatePosition(newPosition, false);
      setFinalInfoAfterDrag(newPosition);
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
