import React, { useState, useCallback } from 'react';
import { Size } from '@/core/model';
import { UpdatePositionFn, UpdatePositionItemInfo } from '@/core/providers';

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

  const startDrag = (x: number, y: number) => {
    setStartDragPosition({
      x: x - initialX,
      y: y - initialY,
    });
    setIsDragging(true);
  };

  const onMouseDown = useCallback(
    (event: React.MouseEvent) => {
      startDrag(event.clientX, event.clientY);
    },
    [initialX, initialY]
  );

  const onTouchStart = useCallback(
    (event: React.TouchEvent) => {
      const touch = event.touches[0];
      startDrag(touch.clientX, touch.clientY);
    },
    [initialX, initialY]
  );

  const updateDrag = (x: number, y: number) => {
    if (isDragging) {
      const newX = x - startDragPosition.x;
      const newY = y - startDragPosition.y;

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
    if (isDragging) {
      window.addEventListener('mousemove', onMouseMove);
      window.addEventListener('mouseup', endDrag);
      window.addEventListener('touchmove', onTouchMove);
      window.addEventListener('touchend', endDrag);
    } else {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', endDrag);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', endDrag);
    }

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', endDrag);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', endDrag);
    };
  }, [isDragging, onMouseMove, onTouchMove, endDrag]);

  return { onMouseDown, onTouchStart };
};
