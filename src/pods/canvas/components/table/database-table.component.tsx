// Importaciones necesarias
import React from 'react';
import { GUID, Size } from '@/core/model';
import {
  FieldVm,
  TableVm,
  UpdatePositionFn,
} from '@/core/providers/canvas-schema';
import { useDraggable } from './table-drag.hook';
import { TABLE_CONST } from '@/core/providers/canvas-schema/canvas.const';
import { DatabaseTableRow } from './database-table-row.component';
import { DatabaseTableHeader } from './database-table-header.component';
import classes from './database-table.module.css';
import { DatabaseTableBorder } from './database-table-border.component';
import { DatabaseTableBody } from './database-table-body';

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
    const [rows, totalY] = renderRows(
      tableInfo.fields,
      0,
      TABLE_CONST.HEADER_HEIGHT
    );
    return [rows, totalY + TABLE_CONST.ROW_PADDING]; // Adjust for the last padding
  }, [tableInfo.fields]);

  const { onMouseDown } = useDraggable(
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
      {/* TODO: Check with the team, is this rect neccessary? */}
      {/*<rect
        x="0"
        y="0"
        width={TABLE_CONST.TABLE_WIDTH}
        height={totalHeight + TABLE_CONST.HEADER_TITLE_GAP}
        className={classes.table}
      />*/}
    </g>
  );
};
