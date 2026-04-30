import React from 'react';
import classes from '../database-table.module.css';

interface Props {
  tableHeight: number;
  tableWidth: number;
  onLeftBorderMouseDown: (e: React.MouseEvent) => void;
  onRightBorderMouseDown: (e: React.MouseEvent) => void;
}

const RESIZE_HANDLE_WIDTH = 8;

export const TableResizeHandles: React.FC<Props> = ({
  tableHeight,
  tableWidth,
  onLeftBorderMouseDown,
  onRightBorderMouseDown,
}) => {
  return (
    <>
      {/* Left resize handle */}
      <rect
        x={-RESIZE_HANDLE_WIDTH / 2}
        y={0}
        width={RESIZE_HANDLE_WIDTH}
        height={tableHeight}
        fill="transparent"
        style={{
          cursor: 'ew-resize',
          opacity: 0,
        }}
        className={classes.resizeHandle}
        onMouseDown={onLeftBorderMouseDown}
      />

      {/* Right resize handle */}
      <rect
        x={tableWidth - RESIZE_HANDLE_WIDTH / 2}
        y={0}
        width={RESIZE_HANDLE_WIDTH}
        height={tableHeight}
        fill="transparent"
        style={{
          cursor: 'ew-resize',
          opacity: 0,
        }}
        className={classes.resizeHandle}
        onMouseDown={onRightBorderMouseDown}
      />
    </>
  );
};
