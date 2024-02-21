// Importaciones necesarias
import React from 'react';
import { GUID, Size } from '@/core/model';
import { TableVm, UpdatePositionFn } from '@/core/providers/canvas-schema';
import { useDraggable } from './table-drag.hook';
import { TABLE_CONST } from '@/core/providers/canvas-schema/canvas.const';
import {
  DatabaseTableHeader,
  DatabaseTableBorder,
  DatabaseTableBody,
} from './components';
import { renderRows } from './database-table-render-rows.helper';
import classes from './database-table.module.css';

// TODO: We should add an optional field to indicate FONT_SIZE in case we override the standard class
// TODO: There's is a solution more elaborated (using JS) to show elipsis ... if text is too long
interface Props {
  tableInfo: TableVm;
  updatePosition: UpdatePositionFn;
  onToggleCollapse: (tableId: GUID, fieldId: GUID) => void;
  onEditTable: (tableInfo: TableVm) => void;
  canvasSize: Size;
  isSelected: boolean;
  selectTable: (tableId: GUID) => void;
}

export const DatabaseTable: React.FC<Props> = ({
  tableInfo,
  onEditTable,
  updatePosition,
  onToggleCollapse,
  canvasSize,
  isSelected,
  selectTable,
}) => {
  const rowHeight = TABLE_CONST.FONT_SIZE + TABLE_CONST.ROW_PADDING;

  const [renderedRows, totalHeight] = React.useMemo((): [
    JSX.Element[],
    number,
  ] => {
    const [rows, totalY] = renderRows(
      {
        tableInfo,
        fields: tableInfo.fields,
        level: 0,
        startY: TABLE_CONST.HEADER_HEIGHT,
        rowHeight,
      },
      {
        onToggleCollapse,
      }
    );
    return [rows, totalY + TABLE_CONST.ROW_PADDING]; // Adjust for the last padding
  }, [tableInfo.fields]);

  const { onMouseDown, onTouchStart } = useDraggable(
    tableInfo.id,
    tableInfo.x,
    tableInfo.y,
    updatePosition,
    totalHeight,
    canvasSize
  );

  const handleSelectTable = () => {
    if (!isSelected) {
      selectTable(tableInfo.id);
    }
  };

  const handleDoubleClick = () => {
    onEditTable(tableInfo);
  };

  return (
    <g
      transform={`translate(${tableInfo.x}, ${tableInfo.y})`}
      onMouseDown={onMouseDown}
      onTouchStart={onTouchStart}
      className={classes.tableContainer}
    >
      <DatabaseTableBorder totalHeight={totalHeight} isSelected={isSelected} />
      <DatabaseTableHeader
        onEditTable={handleDoubleClick}
        onSelectTable={handleSelectTable}
        isSelected={isSelected}
        tableName={tableInfo.tableName}
      />
      <DatabaseTableBody renderedRows={renderedRows} />
    </g>
  );
};
