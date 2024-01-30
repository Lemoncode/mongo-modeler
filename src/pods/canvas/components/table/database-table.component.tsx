// Importaciones necesarias
import React from 'react';
import { GUID, Size } from '@/core/model';
import {
  FieldVm,
  TableVm,
  UpdatePositionFn,
} from '@/core/providers/canvas-schema';
import classes from './database-table.module.css';
import { useDraggable } from './table-drag.hook';
import { TABLE_CONST } from '@/core/providers/canvas-schema/canvas.const';
import { DatabaseTableRow } from './database-table-row.component';
import { TruncatedText } from './truncated-text.component';
import { Edit } from '@/common/components';

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

const TITLE_MARGIN_LEFT = 10;
const PENCIL_ICON_WIDTH = 30;
const PENCIL_MARGIN_RIGHT = 5;
const TABLE_BORDER_RADIUS = 8;

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
    return [rows, totalY + TABLE_CONST.ROW_PADDING]; // Ajuste para el padding final
  }, [tableInfo.fields]);

  const { onMouseDown } = useDraggable(
    tableInfo.id,
    tableInfo.x,
    tableInfo.y,
    updatePosition,
    totalHeight,
    canvasSize
  );

  const rectStyle = {
    filter: isSelected ? 'url(#table_component_selected)' : 'none', // Aplica el filtro si está seleccionado
  };

  const handleClick = (e: React.MouseEvent<SVGGElement, MouseEvent>) => {
    if (!isSelected) {
      selectTable(tableInfo.id);
    }
    e.stopPropagation();
  };

  const handleDoubleClick = () => {
    onEditTable(tableInfo);
  };
  const pencilIconClick = (e: React.MouseEvent<SVGGElement, MouseEvent>) => {
    onEditTable(tableInfo);
    e.stopPropagation();
  };

  return (
    <g
      transform={`translate(${tableInfo.x}, ${tableInfo.y})`}
      onMouseDown={onMouseDown}
      className={classes.tableContainer}
    >
      <defs>
        <filter id="table_component_selected" x="0" y="0">
          <feDropShadow
            dx="3"
            dy="3"
            stdDeviation="4"
            flood-color="var(--shadow-filter)"
          />
        </filter>
      </defs>
      <rect
        x="0"
        y="0"
        rx={TABLE_BORDER_RADIUS}
        width={TABLE_CONST.TABLE_WIDTH}
        height={totalHeight + TABLE_CONST.HEADER_TITLE_GAP}
        className={classes.tableBackground}
        style={rectStyle}
      />
      <rect
        rx={TABLE_BORDER_RADIUS}
        x="0"
        y="0"
        width={TABLE_CONST.TABLE_WIDTH}
        height={TABLE_CONST.HEADER_HEIGHT}
        className={classes.tableHeader}
        onClick={e => {
          e.stopPropagation();
        }}
        onDoubleClick={handleDoubleClick}
      />
      <TruncatedText
        text={tableInfo.tableName}
        x={TITLE_MARGIN_LEFT}
        y={4}
        width={TABLE_CONST.TABLE_WIDTH - TITLE_MARGIN_LEFT}
        height={TABLE_CONST.FONT_SIZE}
        textClass={classes.tableText}
      />
      {isSelected && (
        <g
          transform={`translate(${TABLE_CONST.TABLE_WIDTH - (PENCIL_ICON_WIDTH - PENCIL_MARGIN_RIGHT)}, 2)`}
          onClick={pencilIconClick}
        >
          <rect
            x="0"
            y="0"
            width={PENCIL_ICON_WIDTH + PENCIL_MARGIN_RIGHT}
            fill="transparent"
            height="25"
            onClick={pencilIconClick}
            style={{ cursor: 'pointer' }}
          />
          <Edit />
        </g>
      )}
      ;
      <g transform={`translate(0, ${TABLE_CONST.HEADER_TITLE_GAP})`}>
        {renderedRows}
      </g>
      <rect
        x="0"
        y="0"
        width={TABLE_CONST.TABLE_WIDTH}
        height={totalHeight + TABLE_CONST.HEADER_TITLE_GAP}
        className={classes.table}
      />
      <rect
        x="0"
        y="0"
        width={
          isSelected
            ? TABLE_CONST.TABLE_WIDTH - PENCIL_ICON_WIDTH
            : TABLE_CONST.TABLE_WIDTH
        }
        height={TABLE_CONST.HEADER_HEIGHT}
        fill="transparent"
        onClick={handleClick}
        onDoubleClick={handleDoubleClick}
        style={{ cursor: 'pointer' }}
      />
    </g>
  );
};
