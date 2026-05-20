import { useCallback, useRef } from 'react';
import { GUID, Coords, Size } from '@/core/model';
import { TABLE_CONST } from '@/core/providers/canvas-schema/canvas.const';
import { UpdatePositionFn } from '@/core/providers/canvas-schema/canvas-schema-vlatest.model';

const MAX_TABLE_WIDTH = 800;

export const useTableResize = (
  tableId: GUID,
  currentWidth: number,
  currentPosition: Coords,
  totalHeight: number,
  canvasSize: Size,
  updateTableWidth: (
    tableId: GUID,
    width: number,
    saveToHistory?: boolean
  ) => void,
  updatePosition: UpdatePositionFn
) => {
  const resizeStartX = useRef(0);
  const initialWidth = useRef(currentWidth);
  const initialPosition = useRef(currentPosition);
  const finalWidth = useRef(currentWidth);

  const startResize = useCallback(
    (direction: 'left' | 'right', startX: number) => {
      resizeStartX.current = startX;
      initialWidth.current = currentWidth;
      initialPosition.current = currentPosition;
      finalWidth.current = currentWidth;

      const handleMouseMove = (e: MouseEvent) => {
        const deltaX = e.clientX - resizeStartX.current;
        let newWidth = initialWidth.current;
        let newPosition = { ...initialPosition.current };

        if (direction === 'right') {
          newWidth = initialWidth.current + deltaX;
        } else {
          // When resizing from left, we need to adjust both width and position
          newWidth = initialWidth.current - deltaX;
          const widthDelta = newWidth - initialWidth.current;
          newPosition.x = initialPosition.current.x - widthDelta;
        }

        // Clamp width between min and max (min is DEFAULT_TABLE_WIDTH to avoid tables becoming too small)
        const clampedWidth = Math.max(
          TABLE_CONST.DEFAULT_TABLE_WIDTH,
          Math.min(MAX_TABLE_WIDTH, newWidth)
        );

        // If width was clamped, adjust position accordingly for left resize
        if (direction === 'left' && clampedWidth !== newWidth) {
          const actualWidthDelta = clampedWidth - initialWidth.current;
          newPosition.x = initialPosition.current.x - actualWidthDelta;
        }

        // Store the final width for when drag ends
        finalWidth.current = clampedWidth;

        // Update width without saving to history (real-time update during drag)
        updateTableWidth(tableId, clampedWidth, false);

        // Update position for left resize
        if (direction === 'left') {
          updatePosition(
            {
              id: tableId,
              position: newPosition,
              totalHeight,
              canvasSize,
            },
            false
          ); // false = not finished dragging
        }
      };

      const handleMouseUp = () => {
        // Save final state to history for undo/redo using the stored final width
        updateTableWidth(tableId, finalWidth.current, true); // true = save to history

        // For left resize, also save final position to history
        if (direction === 'left') {
          // Calculate final position based on final width vs initial width
          const widthDelta = finalWidth.current - initialWidth.current;
          const finalPosition = {
            x: initialPosition.current.x - widthDelta,
            y: initialPosition.current.y,
          };

          updatePosition(
            {
              id: tableId,
              position: finalPosition,
              totalHeight,
              canvasSize,
            },
            true
          ); // true = finished dragging, save to history
        }

        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };

      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    },
    [
      tableId,
      currentWidth,
      currentPosition,
      totalHeight,
      canvasSize,
      updateTableWidth,
      updatePosition,
    ]
  );

  const handleLeftBorderMouseDown = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      startResize('left', e.clientX);
    },
    [startResize]
  );

  const handleRightBorderMouseDown = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      startResize('right', e.clientX);
    },
    [startResize]
  );

  return {
    handleLeftBorderMouseDown,
    handleRightBorderMouseDown,
  };
};
