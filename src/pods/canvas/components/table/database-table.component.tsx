// Importaciones necesarias
import React from 'react';
import { Coords, GUID, Size } from '@/core/model';
import { FieldVm, TableVm } from '@/core/providers/canvas-schema';
import classes from './database-table.module.css';
import { useDraggable } from './table-drag.hook';
import {
  FONT_SIZE,
  ROW_PADDING,
  TABLE_WIDTH,
  HEADER_HEIGHT,
} from '@/core/providers/canvas-schema';
import { DatabaseTableRow } from './database-table-row.component';

interface Props {
  tableInfo: TableVm;
  updatePosition: (
    id: string,
    position: Coords,
    totalHeight: number,
    canvasSize: Size
  ) => void;
  onToggleCollapse: (tableId: GUID, fieldId: GUID) => void;
  onEditTable: (tableInfo: TableVm) => void;
}

export const DatabaseTable: React.FC<Props> = ({
  tableInfo,
  onEditTable,
  updatePosition,
  onToggleCollapse,
}) => {
  const rowHeight = FONT_SIZE + ROW_PADDING;

  const renderRows = (
    fields: FieldVm[],
    level: number,
    startY: number
  ): [JSX.Element[], number] => {
    let currentY = startY;
    let rows: JSX.Element[] = [];

    fields.forEach(field => {
      const isExpanded = !field.isCollapsed;

      const row = (
        <DatabaseTableRow
          key={field.id}
          field={field}
          tableInfo={tableInfo}
          level={level}
          currentY={currentY}
          onToggleCollapse={onToggleCollapse}
        />
      );

      rows.push(row);
      currentY += rowHeight;

      if (isExpanded && field.children) {
        const [childRows, newY] = renderRows(
          field.children,
          level + 1,
          currentY
        );
        rows = rows.concat(childRows);
        currentY = newY;
      }
    });

    return [rows, currentY];
  };

  const [renderedRows, totalHeight] = React.useMemo((): [
    JSX.Element[],
    number,
  ] => {
    const [rows, totalY] = renderRows(tableInfo.fields, 0, HEADER_HEIGHT);
    return [rows, totalY + ROW_PADDING]; // Ajuste para el padding final
  }, [tableInfo.fields]);

  const { onMouseDown } = useDraggable(
    tableInfo.id,
    tableInfo.x,
    tableInfo.y,
    updatePosition,
    totalHeight
  );

  const handleDoubleClick = () => {
    onEditTable(tableInfo);
  };
  return (
    <g
      transform={`translate(${tableInfo.x}, ${tableInfo.y})`}
      onMouseDown={onMouseDown}
      className={classes.tableContainer}
    >
      <rect
        x="0"
        y="0"
        width={TABLE_WIDTH}
        height={totalHeight}
        className={classes.tableBackground}
      />
      <rect
        x="0"
        y="0"
        width={TABLE_WIDTH}
        height={HEADER_HEIGHT}
        className={classes.tableHeader}
        onDoubleClick={handleDoubleClick}
      />
      <text x="10" y={FONT_SIZE} className={classes.tableText}>
        {tableInfo.tableName}
      </text>

      {renderedRows}

      <rect
        x="0"
        y="0"
        width={TABLE_WIDTH}
        height={totalHeight}
        className={classes.table}
      />
    </g>
  );
};
