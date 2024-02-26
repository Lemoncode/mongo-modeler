import { Size } from '@/core/model';
import { TableVm, UpdatePositionFn } from '@/core/providers';
import React from 'react';

export const useDraggable = (
  updateTablePosition: UpdatePositionFn,
  canvasSize: Size,
  totalHeight: number,
  table: TableVm,
  id: string
) => {
  const [node, setNode] = React.useState<SVGElement | null>(null);
  const [{ dx, dy }, setOffset] = React.useState({
    dx: table.x,
    dy: table.y,
  });

  const ref = React.useCallback((nodeEle: SVGElement): void => {
    setNode(nodeEle);
  }, []);

  const handleMouseDown = React.useCallback(
    (e: React.MouseEvent<SVGGElement, MouseEvent>): void => {
      e.preventDefault();
      const startPos: { x: number; y: number } = {
        x: e.clientX - dx,
        y: e.clientY - dy,
      };

      const handleMouseMove = (e: MouseEvent): void => {
        e.preventDefault();
        const dx: number = e.clientX - startPos.x;
        const dy: number = e.clientY - startPos.y;
        const currentItemInfo = {
          id,
          position: { x: dx, y: dy },
          totalHeight,
          canvasSize,
        };
        updateTablePosition(currentItemInfo, false);
        setOffset({ dx, dy });
      };

      const handleMouseUp = (): void => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };

      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    },
    [dx, dy]
  );

  const handleTouchStart = React.useCallback(
    (e: React.TouchEvent<SVGGElement>): void => {
      e.preventDefault();
      const touch = e.touches[0];

      const startPos: { x: number; y: number } = {
        x: touch.clientX - dx,
        y: touch.clientY - dy,
      };

      const handleTouchMove = (e: TouchEvent): void => {
        e.preventDefault();

        const touch: Touch = e.touches[0];
        const dx: number = touch.clientX - startPos.x;
        const dy: number = touch.clientY - startPos.y;
        const currentItemInfo = {
          id,
          position: { x: dx, y: dy },
          totalHeight,
          canvasSize,
        };
        updateTablePosition(currentItemInfo, false);
        setOffset({ dx, dy });
      };

      const handleTouchEnd = (): void => {
        document.removeEventListener('touchmove', handleTouchMove);
        document.removeEventListener('touchend', handleTouchEnd);
      };

      document.addEventListener('touchmove', handleTouchMove);
      document.addEventListener('touchend', handleTouchEnd);
    },
    [dx, dy]
  );

  React.useEffect(() => {
    if (node) {
      node.addEventListener('mousedown', handleMouseDown as any);
      node.addEventListener('touchstart', handleTouchStart as any);
    }
    return () => {
      if (node) {
        node.removeEventListener('mousedown', handleMouseDown as any);
        node.removeEventListener('touchstart', handleTouchStart as any);
      }
    };
  }, [node, dx, dy]);
  return [ref];
};
