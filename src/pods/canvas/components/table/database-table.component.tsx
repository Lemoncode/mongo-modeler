// Importaciones necesarias
import React from 'react';
import { GUID, Size } from '@/core/model';
import { TableVm, UpdatePositionFn } from '@/core/providers/canvas-schema';
import { TABLE_CONST } from '@/core/providers/canvas-schema/canvas.const';
import {
  DatabaseTableHeader,
  DatabaseTableBorder,
  DatabaseTableBody,
} from './components';
import { renderRows } from './database-table-render-rows.helper';
import { useDraggable } from './table-drag.hook';

// TODO: We should add an optional field to indicate FONT_SIZE in case we override the standard class
// TODO: There's is a solution more elaborated (using JS) to show elipsis ... if text is too long
interface Props {
  tableInfo: TableVm;
  onToggleCollapse: (tableId: GUID, fieldId: GUID) => void;
  onEditTable: (tableInfo: TableVm) => void;
  isSelected: boolean;
  selectTable: (tableId: GUID) => void;
  updateTablePosition: UpdatePositionFn;
  canvasSize: Size;
}

export const DatabaseTable: React.FC<Props> = ({
  tableInfo,
  onEditTable,
  onToggleCollapse,
  isSelected,
  selectTable,
  updateTablePosition,
  canvasSize,
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

  const handleSelectTable = () => {
    if (!isSelected) {
      selectTable(tableInfo.id);
    }
  };

  const handleDoubleClick = () => {
    onEditTable(tableInfo);
  };

  const [ref] = useDraggable(
    updateTablePosition,
    canvasSize,
    totalHeight,
    tableInfo,
    tableInfo.id
  );

  return (
    <g
      transform={`translate(${tableInfo.x}, ${tableInfo.y})`}
      // onMouseDown={onMouseDown}
      // onTouchStart={onTouchStart}
      // className={classes.tableContainer}
      ref={ref}
    >
      <>
        <DatabaseTableBorder
          totalHeight={totalHeight}
          isSelected={isSelected}
        />
        <DatabaseTableHeader
          onEditTable={handleDoubleClick}
          onSelectTable={handleSelectTable}
          isSelected={isSelected}
          tableName={tableInfo.tableName}
        />
        <DatabaseTableBody renderedRows={renderedRows} />
      </>
    </g>
  );
};
