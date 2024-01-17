import React, { useState, useCallback } from 'react';
import { Coords, Size } from '@/core/model';

export const useDraggable = (
  id: string,
  initialX: number,
  initialY: number,
  updatePosition: (
    id: string,
    position: Coords,
    totalHeight: number,
    canvasSize: Size
  ) => void,
  totalHeight: number,
  canvasSize: Size
) => {
  const [isDragging, setIsDragging] = useState(false);
  const [startDragPosition, setStartDragPosition] = useState({ x: 0, y: 0 });

  const onMouseDown = useCallback(
    (event: React.MouseEvent) => {
      setStartDragPosition({
        x: event.clientX - initialX,
        y: event.clientY - initialY,
      });
      setIsDragging(true);
    },
    [initialX, initialY]
  );

  const onMouseMove = useCallback(
    (event: MouseEvent) => {
      if (isDragging) {
        const newX = event.clientX - startDragPosition.x;
        const newY = event.clientY - startDragPosition.y;
        updatePosition(id, { x: newX, y: newY }, totalHeight, canvasSize);
      }
    },
    [id, isDragging, startDragPosition, updatePosition, totalHeight, canvasSize]
  );

  const onMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  React.useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', onMouseMove);
      window.addEventListener('mouseup', onMouseUp);
    } else {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
    }

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
    };
  }, [isDragging, onMouseMove, onMouseUp]);

  return { onMouseDown };
};
